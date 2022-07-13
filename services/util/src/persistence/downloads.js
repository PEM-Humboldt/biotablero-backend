module.exports = (db, { downloads }, logger) => {
  const DownloadsPersistence = {
    /**
     * Return the file url and expire date for the given reference
     *
     * @param {String} referenceId file reference
     *
     * @returns {String} File url
     * @returns {String} Expire date
     */
    findByReference: (referenceId) =>
      downloads
        .query()
        .select('file_url', 'expires')
        .where({ reference_id: referenceId })
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new Error('Error getting data');
        }),
  };
  return DownloadsPersistence;
};
