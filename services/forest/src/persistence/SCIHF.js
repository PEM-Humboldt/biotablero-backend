/* const config = require('config'); */

module.exports = (
  db,
  {
    geoIntegrity,
  },
) => {
  console.log('geoIntegrity', geoIntegrity);
  /* const geometriesConfig = config.geometries; */

  return {
    /**
     * Find the SCI HF values in the given environmental authority
     *
     * @param {String} areaId environmental authority id
     * @param {Number} year optional year to filter data, 2018 by default
     */
    findSCIHFInEA: async (areaId, year = 2018) => (
      geoIntegrity.query()
        .where({ id_ea: areaId, sci_year: year })
        .select('hf_pers', 'sci_cat', 'binary_protected')
        .sum('area_ha as area')
        .groupBy('binary_protected', 'sci_cat', 'hf_pers')
        .orderBy('binary_protected', 'sci_cat', 'hf_pers')
    ),

    /**
     * Find the SCI HF values in the given state
     *
     * @param {String} areaId state id
     * @param {Number} year optional year to filter data, 2018 by default
     */
    findSCIHFInState: async (areaId, year = 2018) => (
      geoIntegrity.query()
        .where({ id_state: areaId, sci_year: year })
        .select('hf_pers', 'sci_cat', 'binary_protected')
        .sum('area_ha as area')
        .groupBy('binary_protected', 'sci_cat', 'hf_pers')
        .orderBy('binary_protected', 'sci_cat', 'hf_pers')
    ),

    /**
     * Find the SCI HF values in the given basin subzone
     *
     * @param {Number} areaId basin subzone id
     * @param {Number} year optional year to filter data, 2018 by default
     */
    findSCIHFInBasinSubzone: async (areaId, year = 2018) => (
      geoIntegrity.query()
        .where({ id_subzone: areaId, sci_year: year })
        .select('hf_pers', 'sci_cat', 'binary_protected')
        .sum('area_ha as area')
        .groupBy('binary_protected', 'sci_cat', 'hf_pers')
        .orderBy('binary_protected', 'sci_cat', 'hf_pers')
    ),

    /**
     * Find the SCI HF values in the given protected area
     *
     * @param {String} areaId protected area id
     * @param {Number} year optional year to filter data, 2018 by default
     */
    findSCIHFInPA: async (areaId, year = 2018) => (
      geoIntegrity.query()
        .where({ binary_protected: areaId, sci_year: year })
        .select('hf_pers', 'sci_cat', 'binary_protected')
        .sum('area_ha as area')
        .groupBy('binary_protected', 'sci_cat', 'hf_pers')
        .orderBy('binary_protected', 'sci_cat', 'hf_pers')
    ),
  };
};
