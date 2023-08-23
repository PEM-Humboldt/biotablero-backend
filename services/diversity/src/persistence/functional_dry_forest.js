const RestifyErrors = require('restify-errors');
const { areaTypeKeys } = require('../util/appropriate_keys');

module.exports = (db, logger) => ({
  /**
   * Find functional diversity in the dry forest values in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} functional diversity in the dry forest values.
   */
  findDryForestValues: async (areaType, areaId) =>
    db('functional_dry_forest_values as fv')
      .select(
        'fv.fric as richness',
        'fv.feve as uniformity',
        'fv.fdiv as divergence',
        'fv.fric_nal as richness_nal',
        'fv.feve_nal as uniformity_nal',
        'fv.fdiv_nal as divergence_nal',
      )
      .distinct()
      .where({ 'fv.geofence_type': areaTypeKeys(areaType), 'fv.geofence_id': areaId })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError(
          'Error getting data of functional values in the dry forest',
        );
      }),
  /**
   * Find functional diversity in the dry forest features in the given area
   *
   * @param {String} areaType area type
   * @param {String | Number} areaId area id
   *
   * @returns {Object[]} functional diversity in the dry forest features.
   */
  findDryForestFeatures: async (areaType, areaId) =>
    db('functional_dry_forest_features as ff')
      .select(
        'ff.la as leaf_area_value',
        db('functional_dry_forest_features').min('la').as('leaf_area_min'),
        db('functional_dry_forest_features').max('la').as('leaf_area_max'),
        'ff.ln as leaf_nitrogen_value',
        db('functional_dry_forest_features').min('ln').as('leaf_nitrogen_min'),
        db('functional_dry_forest_features').max('ln').as('leaf_nitrogen_max'),
        'ff.ph as maximun_height_value',
        db('functional_dry_forest_features').min('ph').as('maximun_height_min'),
        db('functional_dry_forest_features').max('ph').as('maximun_height_max'),
        'ff.sla as specific_leaf_area_value',
        db('functional_dry_forest_features').min('sla').as('specific_leaf_area_min'),
        db('functional_dry_forest_features').max('sla').as('specific_leaf_area_max'),
        'ff.ssd as wood_density_value',
        db('functional_dry_forest_features').min('ssd').as('wood_density_min'),
        db('functional_dry_forest_features').max('ssd').as('wood_density_max'),
        'ff.sm as seed_mass_value',
        db('functional_dry_forest_features').min('sm').as('seed_mass_min'),
        db('functional_dry_forest_features').max('sm').as('seed_mass_max'),
      )
      .distinct()
      .where({ 'ff.geofence_type': areaTypeKeys(areaType), 'ff.geofence_id': areaId })
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError(
          'Error getting data of functional features in the dry forest',
        );
      }),
});
