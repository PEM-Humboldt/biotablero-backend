const RestifyErrors = require('restify-errors');

module.exports = (db, { texts }, logger) => {
  const TextsPersistence = {
    /**
     * Find texts that describe one section in the frontend
     *
     * @param {String} key text key
     *
     * @returns {Object} Texts of info, methodology, considerations and quote
     */
    findTexts: (key) =>
      texts
        .query()
        .select('type', 'text')
        .where({ key })
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        }),
  };
  return TextsPersistence;
};
