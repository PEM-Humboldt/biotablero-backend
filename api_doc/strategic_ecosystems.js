/**
 * @apiDefine s_strategic_ecosystems Search > Strategic Ecosystems
 * Information related explicitly to strategic ecosystems like total area or percentage in a
 * geofence or in relation with the national total (not coverages or protected areas)
 */

/**
 * @apiDefine SEInGeofenceDetailExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "national_percentage": 0.1523
 *  }
 */

/**
 * @apiDefine SEInGeofenceExample
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
