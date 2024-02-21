import { Logger, ErrorFunction } from '../types/util';

/**
 * Wrapper to catch errors from every endpoint. When an error occurs in a lower layer,
 * depending on the error it is caught and organized to be thrown again an then log it here,
 * or it's just handled here.
 *
 * @param logger - logger instance.
 * @param callback - the function to execute.
 *
 * @returns router function to continue restify workflow
 */
export default (logger: Logger): ErrorFunction =>
  (_req, res, err, next) => {
    logger.error(err.stack || err.message || err);
    const code = err.statusCode || 500;
    res.send(code, {
      code,
      userMsg: err.message || err.userMsg || 'There was an internal error',
    });
    next();
  };
