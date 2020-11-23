/**
 * @apiDefine geofence_states Geofence > States
 * Information about states and municipalities: details, list all options, national layer
 */

/**
 * @apiDefine getAllStatesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id": "44",
 *      "name": "La Guajira"
 *    },
 *    {
 *      "id": "97",
 *      "name": "Vaupés"
 *    }...
 *  ]
 */

/**
 * @apiDefine MunicipalitiesInStateExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_municipality": "90",
 *      "municipality": "Dibulla"
 *    },
 *    {
 *      "id_municipality": "560",
 *      "municipality": "Manaure"
 *    }...
 *  ]
 */

/**
 * @apiDefine getAllMunicipalitiesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_municipality": "560",
 *      "municipality": "Potosí"
 *    },
 *    {
 *      "id_municipality": "569",
 *      "municipality": "Puerto Caicedo"
 *    }...
 *  ]
 */
