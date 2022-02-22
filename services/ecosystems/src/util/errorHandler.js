module.exports = (logger) => (callback) => async (req, res, next) => {
  logger.info(`[${req.id()}] received - ${req.href()}`);
  try {
    await callback(req, res, next);
    logger.info(`[${req.id()}] finished - ${req.href()}`);
  } catch (e) {
    const code = typeof e.code === 'number' ? e.code : 500;
    logger.error(e.stack || e.Error || e.message || e);
    res.send(code, {
      code,
      userMsg: e.message || e.userMsg || 'There was an internal error',
    });
  }
};
