module.exports = (DownloadsPersistence) => {
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
  };

  return Downloads;
};
