const RestifyErrors = require('restify-errors');

module.exports = (db, { downloads, downloads_config: downloadsConfig }, logger) => {
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
        .select('id', 'file_url', 'expires')
        .where({ reference_id: referenceId })
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        }),

    /**
     * Return the storage service used for a given microservice
     *
     * @param {String} serviceName microservice to search for
     *
     * @returns {String} cloud service name
     */
    findCloudService: (serviceName) =>
      downloadsConfig
        .query()
        .select('storage_service')
        .where({ bt_service_name: serviceName })
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        }),

    /**
     * Creates or updates a download record
     *
     * @param {Number} id id of the download to update
     * @param {String} referenceId reference id of the download
     * @param {String} fileUrl file url
     * @param {String} expires expiration date
     *
     * @returns {Object} Updated download object
     */
    upsertDownload: async (id = null, referenceId, fileUrl, expires) => {
      let downloadObj = null;
      if (id === null) {
        downloadObj = {};
      } else {
        downloadObj = { id };
      }

      return downloads
        .forge(downloadObj)
        .save({ reference_id: referenceId, file_url: fileUrl, expires })
        .then((obj) => obj.attributes)
        .catch((e) => {
          logger.error(e.stack || e.Error || e.message || e);
          throw new RestifyErrors.InternalServerError('Error getting data');
        });
    },
  };
  return DownloadsPersistence;
};
