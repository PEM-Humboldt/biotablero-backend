/**
 * @apiDefine GeofenceBySEExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "area": 284538.960066167,
 *      "percentage": 0.4318134185,
 *      "type": "Humedal"
 *    },
 *    {
 *      "area": 166148.838843223,
 *      "percentage": 0.2521457802,
 *      "type": "Páramo"
 *    },
 *    {
 *      "area": 208251.798376851,
 *      "percentage": 0.3160408014,
 *      "type": "Bosque Seco Tropical"
 *    }
 *  ]
 */

/**
 * @apiDefine SEInsideGeofenceDetailExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "national_percentage": 0.1523
 *  }
 */

/**
 * @apiDefine GeofenceByPAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.4437728527,
 *      "type": "Santuario de Fauna y Flora"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "type": "Parques Naturales Regionales"
 *    }...
 *  ]
 */

/**
 * @apiDefine GeofenceByCoverageExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.4437728527,
 *      "type": "Natural"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "type": "Transformado"
 *    }
 *  ]
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
