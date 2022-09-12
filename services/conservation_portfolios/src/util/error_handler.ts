import { Logger, EHFunction } from './types';

/**
 * Wrapper to catch errors from every endpoint. When an error occurs in a lower layer,
 * depending on the error it is caught and organized to be thrown again an then log it here,
 * or it's just handled here.
 *
 * @param {Object} logger logger instance.
 * @param {Function} callback the function to execute.
 *
 * @returns {Function} router function to continue restify workflow
 */
export default (logger: Logger): EHFunction =>
  (callback) =>
  async (req, res, next) => {
    logger.info(`[${req.id()}] received - ${req.href()}`);
    try {
      await callback(req, res, next);
      logger.info(`[${req.id()}] finished - ${req.href()}`);
    } catch (e: any) {
      const code = typeof e.code === 'number' ? e.code : 500;
      logger.error(e.stack || e.Error || e.message || e);
      res.send(code, {
        code,
        userMsg: e.userMsg || e.message || 'There was an internal error',
      });
    }
  };
