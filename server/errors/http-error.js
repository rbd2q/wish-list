import { InvalidPriceError } from '../utils/normalize-price.js';
import { ExchangeRateError } from './exchange-rate-error.js';

export class HttpError extends Error {
  constructor(status, message, errors) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}

export const handleApiError = (error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }
  if (error instanceof InvalidPriceError) {
    return res.status(400).json({ message: error.message });
  }
  if (error instanceof ExchangeRateError) {
    return res.status(503).json({ message: error.message });
  }
  if (error.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body is too large' });
  }
  if (error.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid request data' });
  }
  console.error('API request failed', error);
  return res.status(500).json({ message: 'Something went wrong. Try again' });
};
