module.exports = logger => callback => (
  async (req, res, next) => {
    try {
      await callback(req, res, next);
    } catch (e) {
      logger.error(e.stack || e.Error || e.message || e);
      res.send({
        code: 500 || e.code,
        userMsg: 'There was an internal error' || e.userMsg,
      });
    }
  }
);
