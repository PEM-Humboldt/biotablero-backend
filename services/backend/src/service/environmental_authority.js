const RestifyErrors = require('restify-errors');

const {
  persistenceKeysOrder,
  HFCategoriesKeysOrder,
  SEKeys,
  HFCategoriesRangeKeys,
} = require('../util/appropriate_keys');

module.exports = (eaPersistence, seService) => {
  const envAuth = {
    /**
     * Get total area grouped by compensation factor for a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total area for each compensation factor
     */
    getAreaByCF: async (envAuthorityId) => {
      const areas = await eaPersistence.findAreaByCF(envAuthorityId);
      const keys = [];
      const values = [];
      areas.forEach((area) => {
        let fc = parseFloat(area.fc_valor);
        const fcDiff = fc - parseInt(fc, 10);
        if (fcDiff !== 0 && fcDiff !== 0.5) fc += 0.25;
        const key = keys.findIndex((e) => e === fc);
        if (key === -1) {
          keys.push(fc);
          values.push(area.sum);
        } else {
          values[key] += area.sum;
        }
      });
      const areaAdd = values.reduce((prev, nex) => prev + nex, 0);

      return keys.map((fc, idx) => ({
        key: fc,
        area: values[idx],
        percentage: values[idx] / areaAdd,
      }));
    },

    /**
     * Get total area grouped by biotic unit for a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total area for each biotic unit
     */
    getAreaByBioticUnit: async (envAuthorityId) => {
      const data = await eaPersistence.findAreaByBioticUnit(envAuthorityId);
      const dataToNumber = data.map((e) => Number(e.area));
      const areaAdd = dataToNumber.reduce((prev, nex) => prev + nex);
      return data.map((datum) => ({
        ...datum,
        area: Number(datum.area),
        percentage: Number(datum.area) / areaAdd,
      }));
    },

    /**
     * Get total area grouped by biome for a given environmental authority
     *
     * @param {String} envAuthorityId environmental authority id
     *
     * @returns {Object[]} total area for each biome
     */
    getAreaByBiome: async (envAuthorityId) => {
      const data = await eaPersistence.findAreaByBiome(envAuthorityId);
      data.forEach((e) => console.log('A', e.area, ' K', e.key));
      const areaAdd = data.reduce((pre, nex) => pre + nex.area, 0);
      return data.map((e) => ({ area: e.area, key: e.key, percentage: e.area / areaAdd }));
    },

    /**
     * Get total area grouped by sub-basin given environmental authority filtered by a biome
     *
     * @param {String} envAuthorityId environmental authority id
     * @param {String} biomeName biome name
     *
     * @returns {Object[]} total area for each sub-basin
     */
    getBiomeAreaBySubzone: async (envAuthorityId, biomeName) =>
      eaPersistence.findBiomeAreaBySubzone(envAuthorityId, biomeName),

    /**
     * Get a list with all environmental authorities information
     */
    getAll: async () => eaPersistence.findAll(),

    /**
     * Get information about an strategic ecosystem in an environmental authority. Includes:
     * - percentage of the given strategic ecosystem respect the national area
     *
     * @param {String} envAuthorityId environmental authority id
     * @param {String} seType strategic ecosystem type
     */
    getSEDetails: async (envAuthorityId, seType) => {
      // create another function if this one gets too much unnecessary information
      const seNationalArea = await seService.getEcosystemNatInfo(seType);
      const seArea = await seService.getSEAreaInEA(envAuthorityId, seType);
      return {
        national_percentage: seArea.area / seNationalArea.area,
        total_area: seArea.area,
      };
    },

    /**
     * Get the total area for the given environmental authority
     *
     * @param {Number} enAuthorityId environmental authority id
     *
     * @returns {Object} One attribute object with the total area for the environmental authority
     */
    getTotalArea: async (enAuthorityId) => {
      const eaArea = await eaPersistence.getTotalAreaByEA(enAuthorityId);
      if (eaArea[0].area === null) {
        throw new RestifyErrors.NotFoundError("environmental authority doesn't exists");
      }
      return { total_area: eaArea[0].area };
    },

    /**
     * Get the information the current area distribution for each human footprint category in the
     * given environmental authority
     * @param {String} eaId environmental authority id
     *
     * @returns {Object[]} Array of areas by human footprint category with their respective
     * percentage
     */
    getAreaByHFCategory: async (eaId) => {
      let eaArea = await envAuth.getTotalArea(eaId);
      eaArea = eaArea.total_area;
      const values = await eaPersistence.findAreaByHFCategory(eaId);
      return values
        .sort((a, b) => HFCategoriesKeysOrder(a.key) - HFCategoriesKeysOrder(b.key))
        .map((value) => ({
          area: Number(value.area),
          key: value.key,
          percentage: value.area / eaArea,
        }));
    },

    /**
     * Get the current value and category of human footprint for the given environmental authority
     * @param {String} eaId environmental authority id
     *
     * @returns {Object} Object with the current human footprint value and category.
     */
    getCurrentHFValue: async (eaId) => {
      const value = await eaPersistence.findCurrentHFValue(eaId);
      if (value[0].CurrentHFValue === null) {
        throw new RestifyErrors.NotFoundError("environmental authority doesn't exists");
      }
      return {
        value: value[0].CurrentHFValue,
        category: HFCategoriesRangeKeys(value[0].CurrentHFValue),
      };
    },

    /**
     * Get the information about the persistence of human footprint in the given environmental
     * authority
     * @param {String} eaId environmental authority id
     *
     * @returns {Object[]} Array of persistence values with their respective percentage.
     */
    getAreaByHFPersistence: async (eaId) => {
      let eaArea = await envAuth.getTotalArea(eaId);
      eaArea = eaArea.total_area;
      const values = await eaPersistence.findHFPersistenceAreas(eaId);
      return values
        .sort((a, b) => persistenceKeysOrder(a.key) - persistenceKeysOrder(b.key))
        .map((value) => ({
          area: Number(value.area),
          key: value.key,
          percentage: value.area / eaArea,
        }));
    },

    /**
     * Get the human footprint value through time in the given environmental authority
     * @param {String} eaId environmental authority id
     *
     * @returns {Object} Object of HF values through time
     */
    getTotalHFTimeLine: async (eaId) => {
      const values = await eaPersistence.findTotalHFTimeLine(eaId);
      return {
        key: 'aTotal',
        data: values.map((value) => ({
          x: String(value.year),
          y: Number(value.avg),
        })),
      };
    },

    /**
     * Request a given strategic ecosystem HF timeline data inside an environmental authority
     * @param {String} eaId environmental authority id
     * @param {String} seType strategic ecosystem type
     *
     * @return {Object} Object of HF values through time
     */

    getSEHFTimeline: async (eaId, seType) => {
      const values = await seService.getSEHFTimelineInGeofence('ea', eaId, seType);
      return {
        key: SEKeys(seType),
        data: values.map((value) => ({
          x: String(value.year),
          y: Number(value.avg),
        })),
      };
    },

    /**
     * Get the national layer divided by environmental authority
     */
    getNationalLayer: async () => eaPersistence.findNationalLayer(),

    /**
     * Get the geometry for a given environmental authority
     * @param {String} eaId environmental authority id
     *
     * @return {Object} Geojson object with the geometry
     */
    getLayer: async (eaId) => {
      const geom = await eaPersistence.findLayerById(eaId);
      if (geom && geom.features) return geom;
      return {};
    },

    /**
     * Request a given strategic ecosystem layer inside an environmental authority
     * @param {String} eaId environmental authority id
     * @param {String} seType strategic ecosystem type.
     *
     * @return {Object} Geojson object with the geometry
     */
    getSELayer: async (eaId, seType) => seService.getSELayerInGeofence('ea', eaId, seType),

    /**
     * Get the current human footprint layer divided by categories in a given
     * environmental authority
     * @param {String} eaId environmental authority id
     *
     * @return {Object} Geojson object with the geometry
     */
    getHFCategoriesLayerById: async (eaId) => {
      const geom = await eaPersistence.findHFCategoriesLayerById(eaId);
      if (geom && geom.features) {
        geom.features = geom.features.map((feature) => ({
          ...feature,
          properties: {
            ...feature.properties,
            key: feature.properties.key,
          },
        }));
        return geom;
      }
      return {};
    },

    /**
     * Get the persistence human footprint layer divided by categories in a given
     * environmental authority
     * @param {String} eaId environmental authority id
     *
     * @return {Object} Geojson object with the geometry
     */
    getHFPersistenceLayerById: async (eaId) => {
      const geom = await eaPersistence.findHFPersistenceLayerById(eaId);
      if (geom && geom.features) {
        geom.features = geom.features.map((feature) => ({
          ...feature,
          properties: {
            ...feature.properties,
            key: feature.properties.key,
          },
        }));
        return geom;
      }
      return {};
    },

    /**
     * Get biomes by a given environmental authority.
     *
     * @param {String} envAuthority environmental authority name to filter by
     *
     * @return {Object} TopoJson Object with biomes as geometries from a GeometryCollection
     */
    getBiomesLayer: async (envAuthority) => {
      let geometry = await eaPersistence.findBiomesLayerById(envAuthority);
      if (geometry === null || geometry.features === null) geometry = null;
      return geometry;
    },
  };

  return envAuth;
};
