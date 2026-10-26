import { lookup } from 'node:dns';
import { isIP } from 'node:net';
import ipaddr from 'ipaddr.js';
import { Agent, fetch } from 'undici';

import { HttpError } from '../errors/http-error.js';

const IPV6_GLOBAL_UNICAST = ipaddr.parseCIDR('2000::/3');
const MAX_REDIRECTS = 5;
const REQUEST_TIMEOUT_MS = 15000;
const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

const requirePublicAddress = (address) => {
  if (!ipaddr.isValid(address)) throw new HttpError(400, 'URL must point to a public internet address');

  const parsed = ipaddr.process(address);
  const isGlobalIpv6 = parsed.kind() !== 'ipv6' || parsed.match(IPV6_GLOBAL_UNICAST);

  if (parsed.range() !== 'unicast' || !isGlobalIpv6) {
    throw new HttpError(400, 'URL must point to a public internet address');
  }
};

const parsePublicUrl = (value, base) => {
  let url;

  try {
    if (typeof value !== 'string') throw new Error('Invalid URL');
    
    url = new URL(value, base);
  } catch {
    throw new HttpError(400, 'A valid HTTP or HTTPS URL is required');
  }

  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) {
    throw new HttpError(400, 'Use an HTTP or HTTPS URL without credentials');
  }

  const hostname = url.hostname.replace(/^\[|\]$/g, '');

  if (isIP(hostname)) requirePublicAddress(hostname);

  return url;
};

// Validate the DNS answers used by the socket itself, preventing a second DNS lookup and rebinding.
const lookupPublicAddress = (hostname, options, callback) => {
  lookup(hostname, { all: true, verbatim: true }, (error, addresses) => {
    if (error) return callback(error);

    try {
      if (!addresses.length) throw new HttpError(400, 'URL has no public internet address');
      addresses.forEach(({ address }) => requirePublicAddress(address));
    } catch (error) {
      return callback(error);
    }

    if (options.all) return callback(null, addresses);

    return callback(null, addresses[0].address, addresses[0].family);
  });
};

export const fetchPublicUrl = async (value) => {
  let url = parsePublicUrl(value);
  const dispatcher = new Agent({ connect: { lookup: lookupPublicAddress } });
  const signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);

  try {
    for (let redirects = 0; redirects <= MAX_REDIRECTS; redirects += 1) {
      const response = await fetch(url, {
        dispatcher,
        redirect: 'manual',
        signal,
        headers: { 'User-Agent': USER_AGENT },
      });
      const location = response.headers.get('location');

      if (!REDIRECT_STATUSES.has(response.status) || !location) {
        return {
          ok: response.ok,
          status: response.status,
          url: url.href,
          body: response.ok ? Buffer.from(await response.arrayBuffer()) : Buffer.alloc(0),
        };
      }

      await response.body?.cancel();
      if (redirects === MAX_REDIRECTS) throw new HttpError(400, 'URL has too many redirects');

      url = parsePublicUrl(location, url);
    }
  } catch (error) {
    // Fetch wraps connection errors, including a rejected DNS answer, in a TypeError.
    if (error.cause instanceof HttpError) throw error.cause;

    throw error;
  } finally {
    await dispatcher.destroy();
  }
};
