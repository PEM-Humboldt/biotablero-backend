/**
 * @apiDefine s_pa_connectivity Search > Protected Areas Connectivity
 * Information related to protected areas connectivity in a given area.
 */

/**
 * @apiDefine CurrentExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     "key": "unprot",
 *     "area": 20548,
 *     "percentage": 0.5
 *   },
 *   ...
 * ]
 */

/**
 * @apiDefine DPCExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     "id": "02020014",
 *     "name": "Campoalegre",
 *     "key": "unprot",
 *     "value": 0.1,
 *     "area": 20548,
 *   },
 *   ...
 * ]
 */

/**
 * @apiDefine DPCLayerExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "properties": {
 *       "key": "Campoalegre",
 *       "value": 1,
 *       "area": 21116,
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
 * @apiDefine TimelineByCategoryExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   "key": "prot",
 *   "data": [
 *     {
 *       "x": "1938",
 *       "y": 0.5
 *     },
 *     ...
 * }
 */

/**
 * @apiDefine CurrentBySEExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     "key": "unprot",
 *     "area": 1500,
 *     "percentage": 0.15
 *   },
 *   ...
 * ]
 */

/**
 * @apiDefine SELayerExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
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
