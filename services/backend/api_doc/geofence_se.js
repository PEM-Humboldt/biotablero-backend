/**
 * @apiDefine geofence_se Geofence > Strategic Ecosystems
 * Information exclusively about strategic ecosystems as a geofence: details, list all options,
 * national layer
 */

/**
 * @apiDefine listAllExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_ecosystem": "203",
 *      "name": "Páramo",
 *      "second_class": "test"
 *    },
 *    {
 *      "id_ecosystem": "2000",
 *      "name": "Bosque Seco Tropical",
 *      "second_class": "Sin información"
 *    }...
 *  ]
 */

/**
 * @apiDefine listPrimarySEExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "name": "Páramo"
 *    },
 *    {
 *      "name": "Humedal"
 *    },
 *    {
 *      "name": "Bosque Seco Tropical"
 *    }
 *  ]
 */

/**
 * @apiDefine SEDetailExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "area": 123456789,
 *    "percentage": 0.45,
 *    "type": "Páramo"
 *  }
 */
