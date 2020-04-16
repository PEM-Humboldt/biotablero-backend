/**
 * @apiDefine GeofenceDetailsExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "total_area": 319877.03
 *  }
 */

/**
 * @apiDefine GeofenceBySEExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *     {
 *      "area": 134079.17569578788,
 *      "percentage": 0.4191585381124241,
 *      "type": "Total"
 *    },
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
 *      "area": 68695,
 *      "percentage": 0.11579025436941971,
 *      "type": "Total"
 *    },
 *    {
 *      "percentage": 0.4437728527,
 *      "area": "1493.945506792712753",
 *      "type": "Santuario de Fauna y Flora"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "area": "158.998859058673413",
 *      "type": "Parques Naturales Regionales"
 *    },
 *    {
 *      "area": "241.9864414835",
 *      "type": "No Protegida",
 *      "percentage": 0.33981634981401826
 *    }...
 *  ]
 */

/**
 * @apiDefine GeofenceByCoverageExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "area": "319877.0000000",
 *      "percentage": 1,
 *      "type": "Total"
 *    },
 *    {
 *      "percentage": 0.4437728527,
 *      "area": "1493.945506792712753",
 *      "type": "N"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "area": "158.998859058673413",
 *      "type": "T"
 *    }
 *  ]
 */

/**
 * @apiDefine SECoverageInGeofenceExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 0.4437728527,
 *      "area": "1493.945506792712753",
 *      "type": "N"
 *    },
 *    {
 *      "percentage": 0.5562271473,
 *      "area": "158.998859058673413",
 *      "type": "T"
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
