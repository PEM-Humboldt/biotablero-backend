const RestifyErrors = require('restify-errors');

module.exports = (db, { geoIntegrity }, logger) => ({
  /**
   * Find the area grouped by SCI, HF persistence and PA categories
   * in the given environmental authority
   *
   * @param {String} areaId environmental authority id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @returns {Object[]} Array of areas grouped by SCI, HF persistence and PA categories
   */
  findSCIHFInEA: (areaId, year = 2018) =>
    geoIntegrity
      .query()
      .where({ id_ea: areaId, sci_year: year })
      .select('hf_pers', 'sci_cat', 'binary_protected')
      .sum('area_ha as area')
      .groupBy('binary_protected', 'sci_cat', 'hf_pers')
      .orderBy(['binary_protected', 'sci_cat', 'hf_pers'])
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the area grouped by SCI, HF persistence and PA categories
   * in the given state
   *
   * @param {Number} areaId state id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object[]} Array of areas grouped by SCI, HF persistence and PA categories
   */
  findSCIHFInState: (areaId, year = 2018) =>
    geoIntegrity
      .query()
      .where({ id_state: areaId, sci_year: year })
      .select('hf_pers', 'sci_cat', 'binary_protected')
      .sum('area_ha as area')
      .groupBy('binary_protected', 'sci_cat', 'hf_pers')
      .orderBy(['binary_protected', 'sci_cat', 'hf_pers'])
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the area grouped by SCI, HF persistence and PA categories
   * in the given basin subzone
   *
   * @param {Number} areaId basin subzone id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object[]} Array of areas grouped by SCI, HF persistence and PA categories
   */
  findSCIHFInBasinSubzone: (areaId, year = 2018) =>
    geoIntegrity
      .query()
      .where({ id_subzone: areaId, sci_year: year })
      .select('hf_pers', 'sci_cat', 'binary_protected')
      .sum('area_ha as area')
      .groupBy('binary_protected', 'sci_cat', 'hf_pers')
      .orderBy(['binary_protected', 'sci_cat', 'hf_pers'])
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the area grouped by SCI, HF persistence and PA categories
   * in the given protected area category(ies)
   *
   * @param {String} paCode code that represents one or many protected area categories
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object[]} Array of areas grouped by SCI, HF persistence and PA categories
   */
  findSCIHFInPA: (paCode, year = 2018) =>
    geoIntegrity
      .query()
      .where({ binary_protected: paCode, sci_year: year })
      .select('hf_pers', 'sci_cat', 'binary_protected')
      .sum('area_ha as area')
      .groupBy('binary_protected', 'sci_cat', 'hf_pers')
      .orderBy(['binary_protected', 'sci_cat', 'hf_pers'])
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of the forest structural condition index crossed with human footprint
   * in the given environmental authority
   *
   * @param {String} areaId environmental authority id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFLayerInEA: (areaId, year = 2018) =>
    db
      .raw(
        `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                sci_cat,
                hf_pers
              FROM geo_integrity
              WHERE id_ea = ?
                AND sci_year = ?
              GROUP BY sci_cat, hf_pers
              ) AS geo
              INNER JOIN (
                SELECT
                  sci_cat,
                  hf_pers
                FROM geo_integrity
                WHERE id_ea = ?
                  AND sci_year = ?
                  GROUP BY sci_cat, hf_pers
              ) AS prop
              ON geo.sci_cat = prop.sci_cat AND geo.hf_pers = prop.hf_pers
          ) as f
        ) as fc;
        `,
        [areaId, year, areaId, year],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of the forest structural condition index crossed with human footprint
   * in the given state
   *
   * @param {Number} areaId state id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFLayerInState: (areaId, year = 2018) =>
    db
      .raw(
        `
      SELECT row_to_json(fc) AS collection
      FROM (
        SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
        FROM (
          SELECT
            'Feature' AS TYPE,
            row_to_json(prop) AS properties,
            ST_AsGeoJSON(geom)::json AS geometry
          FROM (
            SELECT
              ST_Collect(geom) AS geom,
              sci_cat,
              hf_pers
            FROM geo_integrity
            WHERE id_state = ?
              AND sci_year = ?
            GROUP BY sci_cat, hf_pers
            ) AS geo
            INNER JOIN (
              SELECT
                sci_cat,
                hf_pers
              FROM geo_integrity
              WHERE id_state = ?
                AND sci_year = ?
                GROUP BY sci_cat, hf_pers
            ) AS prop
            ON geo.sci_cat = prop.sci_cat AND geo.hf_pers = prop.hf_pers
        ) as f
      ) as fc;
      `,
        [areaId, year, areaId, year],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of the forest structural condition index crossed with human footprint
   * in the given basin subzone
   *
   * @param {Number} areaId basin subzone id
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFLayerInBasinSubzone: (areaId, year = 2018) =>
    db
      .raw(
        `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                sci_cat,
                hf_pers
              FROM geo_integrity
              WHERE id_subzone = ?
                AND sci_year = ?
              GROUP BY sci_cat, hf_pers
              ) AS geo
              INNER JOIN (
                SELECT
                  sci_cat,
                  hf_pers
                FROM geo_integrity
                WHERE id_subzone = ?
                  AND sci_year = ?
                  GROUP BY sci_cat, hf_pers
              ) AS prop
              ON geo.sci_cat = prop.sci_cat AND geo.hf_pers = prop.hf_pers
          ) as f
        ) as fc;
        `,
        [areaId, year, areaId, year],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of the forest structural condition index crossed with human footprint
   * in the given protected area category(ies)
   *
   * @param {String} paCode code that represents one or many protected area categories
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFLayerInPA: (paCode, year = 2018) =>
    db
      .raw(
        `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                sci_cat,
                hf_pers
              FROM geo_integrity
              WHERE (binary_protected & ?) = ?
                AND sci_year = ?
              GROUP BY sci_cat, hf_pers
              ) AS geo
              INNER JOIN (
                SELECT
                  sci_cat,
                  hf_pers
                FROM geo_integrity
                WHERE (binary_protected & ?) = ?
                  AND sci_year = ?
                  GROUP BY sci_cat, hf_pers
              ) AS prop
              ON geo.sci_cat = prop.sci_cat AND geo.hf_pers = prop.hf_pers
          ) as f
        ) as fc;
        `,
        [paCode, paCode, year, paCode, paCode, year],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of one combination of forest structural condition index category and a human
   * footprint persistence category, divided by protected areas in the given environmental
   * authority
   *
   * @param {String} areaId environmental authority id
   * @param {String} sciCat sci category
   * @param {String} hfPers human footprint persistence category
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFPALayerInEA: (areaId, sciCat, hfPers, year = 2018) =>
    db
      .raw(
        `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                binary_protected
              FROM geo_integrity
              WHERE id_ea = ?
                AND sci_year = ?
                AND sci_cat = ?
                AND hf_pers = ?
              GROUP BY binary_protected
              ) AS geo
              INNER JOIN (
                SELECT
                  binary_protected
                FROM geo_integrity
                WHERE id_ea = ?
                  AND sci_year = ?
                  AND sci_cat = ?
                  AND hf_pers = ?
                  AND binary_protected != B'000000000000000'
                  GROUP BY binary_protected
              ) AS prop
              ON geo.binary_protected = prop.binary_protected
          ) as f
        ) as fc;
        `,
        [areaId, year, sciCat, hfPers, areaId, year, sciCat, hfPers],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of one combination of forest structural condition index category and a human
   * footprint persistence category, divided by protected areas in the given state
   *
   * @param {Number} areaId state id
   * @param {String} sciCat sci category
   * @param {String} hfPers human footprint persistence category
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFPALayerInState: (areaId, sciCat, hfPers, year = 2018) =>
    db
      .raw(
        `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                binary_protected
              FROM geo_integrity
              WHERE id_state = ?
                AND sci_year = ?
                AND sci_cat = ?
                AND hf_pers = ?
              GROUP BY binary_protected
              ) AS geo
              INNER JOIN (
                SELECT
                  binary_protected
                FROM geo_integrity
                WHERE id_state = ?
                  AND sci_year = ?
                  AND sci_cat = ?
                  AND hf_pers = ?
                  AND binary_protected != B'000000000000000'
                  GROUP BY binary_protected
              ) AS prop
              ON geo.binary_protected = prop.binary_protected
          ) as f
        ) as fc;
        `,
        [areaId, year, sciCat, hfPers, areaId, year, sciCat, hfPers],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of one combination of forest structural condition index category and a human
   * footprint persistence category, divided by protected areas in the given basin subzone
   *
   * @param {Number} areaId basin subzone id
   * @param {String} sciCat sci category
   * @param {String} hfPers human footprint persistence category
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFPALayerInBasinSubzone: (areaId, sciCat, hfPers, year = 2018) =>
    db
      .raw(
        `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                binary_protected
              FROM geo_integrity
              WHERE id_subzone = ?
                AND sci_year = ?
                AND sci_cat = ?
                AND hf_pers = ?
              GROUP BY binary_protected
              ) AS geo
              INNER JOIN (
                SELECT
                  binary_protected
                FROM geo_integrity
                WHERE id_subzone = ?
                  AND sci_year = ?
                  AND sci_cat = ?
                  AND hf_pers = ?
                  AND binary_protected != B'000000000000000'
                  GROUP BY binary_protected
              ) AS prop
              ON geo.binary_protected = prop.binary_protected
          ) as f
        ) as fc;
        `,
        [areaId, year, sciCat, hfPers, areaId, year, sciCat, hfPers],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),

  /**
   * Find the layer of one combination of forest structural condition index category and a human
   * footprint persistence category in the given protected area category(ies)
   *
   * @param {String} paCode code that represents one or many protected area categories
   * @param {String} sciCat sci category
   * @param {String} hfPers human footprint persistence category
   * @param {Number} year optional year to filter data, 2018 by default
   *
   * @return {Object} Geojson object with the geometry
   */
  findSCIHFPALayerInPA: (paCode, sciCat, hfPers, year = 2018) =>
    db
      .raw(
        `
        SELECT row_to_json(fc) AS collection
        FROM (
          SELECT 'FeatureCollection' AS type, array_to_json(array_agg(f)) AS features
          FROM (
            SELECT
              'Feature' AS TYPE,
              row_to_json(prop) AS properties,
              ST_AsGeoJSON(geom)::json AS geometry
            FROM (
              SELECT
                ST_Collect(geom) AS geom,
                binary_protected
              FROM geo_integrity
              WHERE (binary_protected & ?) = ?
                AND sci_year = ?
                AND sci_cat = ?
                AND hf_pers = ?
              GROUP BY binary_protected
              ) AS geo
              INNER JOIN (
                SELECT
                  binary_protected
                FROM geo_integrity
                WHERE (binary_protected & ?) = ?
                  AND sci_year = ?
                  AND sci_cat = ?
                  AND hf_pers = ?
                  AND binary_protected != B'000000000000000'
                  GROUP BY binary_protected
              ) AS prop
              ON geo.binary_protected = prop.binary_protected
          ) as f
        ) as fc;
        `,
        [paCode, paCode, year, sciCat, hfPers, paCode, paCode, year, sciCat, hfPers],
      )
      .then((layers) => layers.rows[0].collection)
      .catch((e) => {
        logger.error(e.stack || e.Error || e.message || e);
        throw new RestifyErrors.InternalServerError('Error getting data');
      }),
});
