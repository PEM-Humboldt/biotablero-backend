module.exports = (db, { geoMunicipalities }) => ({
  /**
   * Get all municipalities id and name
   */
  findAll: () => (
    geoMunicipalities
      .fetchAll({ columns: ['id_municipality', 'municipality'] })
      .then(municipalities => municipalities.toJSON())
  ),
});
