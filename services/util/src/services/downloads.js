const fs = require('fs');

module.exports = (DownloadsPersistence, CloudServices) => {
  const Downloads = {
    /**
     * Return the file url if there is a unexpired one for the given reference.
     * "Unavailable" in other case
     *
     * @param {String} reference file reference to search for
     *
     * @returns {Object} status and url if it applies
     */
    getFile: async (reference) => {
      const download = await DownloadsPersistence.findByReference(reference);

      if (!download || download.length === 0) {
        return { status: 'Unavailable' };
      }

      const expireDate = new Date(download[0].expires);
      if (expireDate - new Date() > 300000) {
        return { status: 'Ok', url: download[0].file_url };
      }

      return { status: 'Unavailable' };
    },

    /**
     * Upload a file to the corresponding cloud service, save the relevant information in database
     * and return the url for it
     *
     * @param {Object} file File information object
     * @param {String} serviceName service sending the file
     * @param {String} reference reference id to associate to the uploaded file
     *
     * @returns {String} file url to be downloaded
     */
    uploadFile: async (file, serviceName, reference) => {
      const cloud = await DownloadsPersistence.findCloudService(serviceName);

      let uploadFunction = null;
      if (cloud[0].storage_service === 'aws') {
        uploadFunction = CloudServices.AWS.uploadFile;
      } else {
        const Error = { message: 'Service not configured' };
        throw Error;
      }

      const uploaded = await uploadFunction(file);
      const previous = await DownloadsPersistence.findByReference(reference);
      const saved = await DownloadsPersistence.upsertDownload(
        previous.length > 0 ? previous[0].id : null,
        reference,
        uploaded.Location,
        uploaded.exp_date,
      );

      fs.unlink(file.path, (err) => {
        if (err) {
          const Error = { message: 'Error by deleting temp file' };
          throw Error;
        }
      });

      return { url: saved.file_url };
    },
  };

  return Downloads;
};
