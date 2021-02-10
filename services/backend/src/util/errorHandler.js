/**
 * Wrapper to catch errors from every endpoint. When an error occurs in a lower layer,
 * depending on the error it is caught and organized to be thrown again an then log it here,
 * or it's just handled here.
 *
 * @param {Object} logger logger instance.
 * @param {Function} callback the function to execute.
 */
module.exports = logger => callback => (
  async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (e) {
      const code = typeof e.code === 'number' ? e.code : 500;
      logger.error(e.stack || e.Error || e.message || e);
      res.send(code, {
        code,
        userMsg: e.message || e.userMsg || 'There was an internal error',
      });
    }
  }
);
