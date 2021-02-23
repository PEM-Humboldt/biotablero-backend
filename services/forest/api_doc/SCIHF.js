/**
 * @apiDefine sci Search > Forest Structural Condition Index
 * Information related to the forest structural condition index in a given geofence.
 */

/**
 * @apiDefine SCIHFExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     "hf_pers": "estable_alta",
 *     "sci_cat": "alta",
 *     "pa": "PNN",
 *     "area": 101834
 *   },
 *   {
 *     "hf_pers": "estable_alta",
 *     "sci_cat": "alta",
 *     "pa": "PNR",
 *     "area": 134886
 *   },
 *   ...
 * ]
 */

/**
 * @apiDefine SCIHFLayerExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "properties": {
 *         "sci_cat": "moderada",
 *         "hf_pers": "estable_alta"
 *       },
 *       "geometry": {
 *         "geometries": [
 *           {
 *             "type": "MultiPolygon",
 *             "coordinates": [
 *               [
 *                 [
 *                   [
 *                     -75.9355268362944,
 *                     4.80674184545984
 *                   ],
 *                   ...
 *                 ]
 *               ]
 *             ]
 *           }
 *         ]
 *       }
 *     },
 *     ...
 *   ]
 * }
 */

/**
 * @apiDefine SCIHFPALayerExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "properties": {
 *         "pa_label": "Distritos Regionales de Manejo Integrado"
 *       },
 *       "geometry": {
 *         "type": "MultiPolygon",
 *         "coordinates": [
 *           [
 *             [
 *               [
 *                 -76.0875466650366,
 *                 5.04537111840702
 *               ],
 *               [
 *                 -76.0804526759551,
 *                 5.04806343034337
 *               ]...
 *             ]
 *           ]
 *         ]
 *       }
 *     },
 *     ...
 *   ]
 * }
 */
