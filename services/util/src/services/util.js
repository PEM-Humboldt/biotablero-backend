module.exports = (TextsPersistence) => {
  const Util = {
    /**
     * Texts that describe one section in the frontend
     *
     * @param {String} key text key
     *
     * @returns {Object} Object with texts of info, methodology, considerations and quote
     */
    getTexts: async (key) => {
      const rawData = await TextsPersistence.findTexts(key);
      let data = {};

      if (!rawData || rawData.length === 0) {
        throw new Error('There is not data of texts asociated to the given key');
      }

      rawData.forEach((element) => {
        data = {
          ...data,
          [element.type]: element.text,
        };
      });

      return data;
    },
  };

  return Util;
};
