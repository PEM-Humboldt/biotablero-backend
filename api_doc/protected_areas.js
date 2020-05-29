/**
 * @apiDefine s_protected_areas Search > Protected Areas
 * Information related to protected areas inside geofences and in strategic ecosystems inside
 * geofences
 */

/**
 * @apiDefine PAInGeofenceExample
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

// PAInPA and SEPAInPA are special cases
/**
 * @apiDefine PAInPAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "area": 108607,
 *      "percentage": 1,
 *      "type": "Total"
 *    },
 *    {
 *      "percentage": 0,
 *      "type": "Santuario de Fauna y Flora"
 *    },
 *    {
 *      "percentage": 1,
 *      "type": "Parques Naturales Regionales"
 *    }...
 *  ]
 */

/**
 * @apiDefine SEPAInPAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "percentage": 1,
 *      "area": "305237.610769660272561",
 *      "type": Parques Naturales Regionales
 *    }
 *  ]
 */
