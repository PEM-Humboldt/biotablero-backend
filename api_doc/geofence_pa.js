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
 * @apiDefine PALayerExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
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
