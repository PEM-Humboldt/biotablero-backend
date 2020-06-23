// Common responses in geofence requests

/**
 * @apiDefine GeofenceDetailsExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "total_area": 319877.03
 *  }
 */

/**
 * @apiDefine GeofenceNationalLayerExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *    type: 'FeatureCollection',
 *    totalFeatures: 1,
 *    features: [
 *      type: 'Feature',
 *      id: 'jurisdicciones_low.1',
 *      geometry: {
 *        type: 'MultiPolygon',
 *        coordinates: [
 *          [
 *            [
 *              [-79.2778, 16.1152],
 *              [-79.2778, 16.0708],
 *              [-79.1453, 16.0708]
 *            ]
 *          ]
 *        ]
 *      }
 *      geometry_name: 'the_geom',
 *      properties: {
 *        AREA: 180336000000,
 *        IDCAR: 'CORALINA'
 *      }
 *    ]
 *    crs: {
 *      type: 'name',
 *      properties: {
 *        name: 'urn:ogc:def:crs:EPSG::4326'
 *      }
 *    }
 * }
 */

/**
 * @apiDefine SpecificLayerExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "type":"Polygon",
 *    "coordinates": [[
 *      [-75.6678114265845,4.70182070670868],[-75.6582659435968,4.69977574259262],...
 *    ]]
 *  }
 */
