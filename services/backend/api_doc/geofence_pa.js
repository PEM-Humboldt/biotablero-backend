/**
 * @apiDefine geofence_pa Geofence > Protected Areas
 * Information exclusively about protected areas: details, list all options, national layer
 */

/**
 * @apiDefine PACategoriesExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "name": "Reserva Natural de la Sociedad Civil"
 *    },
 *    {
 *      "name": "Distritos Nacionales de Manejo Integrado"
 *    }...
 *  ]
 */

/**
 * @apiDefine PACategoriesByBinaryProtectedExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "binary_protected": "000001000000000",
 *      "label": "Parques Naturales Regionales"
 *    },
 *    {
 *      "binary_protected": "010100000000000",
 *      "label": "Distritos de Conservacion de Suelos y Distritos Regionales de Manejo Integrado"
 *    }...
 *  ]
 */

/**
 * @apiDefine BinaryProtectedByCategoryExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *    binary_protected:"000001000000000"
 * }
 *
 */

/**
 * @apiDefine PALayerExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "id": 3,
 *          "key": "Yaigoje Apaporis"
 *        },
 *        "geometry": {
 *          "type": "Polygon",
 *          "coordinates": [
 *            [
 *              [-71.0454314, -0.01861671],
 *              ...
 *            ]
 *          ]
 *        }
 *      },
 *      ...
 *    ]
 *  }
 */
