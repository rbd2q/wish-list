import ogs from 'open-graph-scraper';

const CURRENCY_MAP = { USD: 'USD', BYN: 'BYN', RUB: 'RUB', BYR: 'BYN', RUR: 'RUB' };

const resolveUrl = (href, base) => {
  if (!href || href.startsWith('data:')) return href;
  try {
    return new URL(href, base).href;
  } catch {
    return href;
  }
};

const toImageUrls = (img, baseUrl) => {
  if (!img) return [];
  const arr = Array.isArray(img) ? img : [img];
  return arr.map((x) => resolveUrl(typeof x === 'string' ? x : x?.url, baseUrl)).filter(Boolean);
};

function findProduct(jsonLD) {
  if (!Array.isArray(jsonLD)) return null;
  for (const item of jsonLD) {
    if (!item) continue;
    const type = [].concat(item['@type']).filter(Boolean);
    if (type.includes('Product')) return item;
    const inGraph = item['@graph'] && findProduct(item['@graph']);
    if (inGraph) return inGraph;
  }
  return null;
}

const parsePrice = (p) => {
  if (p == null) return null;
  const n = typeof p === 'string' ? parseFloat(p.replace(/[^\d.,]/g, '').replace(',', '.')) : Number(p);
  return Number.isFinite(n) ? n : null;
};

export async function parseProduct(html, baseUrl) {
  const { result, error } = await ogs({ html, jsonLDOptions: { logOnJSONParseError: true } });
  if (error || !result) {
    return { title: null, description: null, price: null, primaryCurrency: null, imageUrl: null, images: [] };
  }

  const product = findProduct(result.jsonLD ?? []);
  const offer = product?.offers;
  const singleOffer = Array.isArray(offer) ? offer[0] : offer;
  const price = parsePrice(singleOffer?.price ?? singleOffer?.lowPrice);
  const currency = singleOffer?.priceCurrency ? (CURRENCY_MAP[singleOffer.priceCurrency] ?? singleOffer.priceCurrency) : 'USD';

  const productImages = product?.image ? toImageUrls(product.image, baseUrl) : [];
  const ogImages = toImageUrls(result.ogImage, baseUrl);

  return {
    title: (product?.name ?? result.ogTitle)?.trim() || null,
    description: (product?.description ?? result.ogDescription)?.trim() || null,
    price,
    primaryCurrency: currency,
    imageUrl: productImages[0] ?? ogImages[0] ?? null,
    images: productImages.length ? productImages : ogImages,
  };
}
