/**
 * @apiDefine geofence_ea Geofence > Environmental Authorities
 * Information exclusively about environmental authorities: details, list all options, national
 * layer
 */

/**
 * @apiDefine getAllEAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id": "CRC",
 *      "name": "Corporacion Autonoma Regional del Cauca"
 *    },
 *    {
 *      "id": "CORPOGUAVIO",
 *      "name": "Corporacion Autonoma Regional del Guavio"
 *    }...
 *  ]
 */

/**
 * @apiDefine SubzoneInBiomeInEAExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "key": "Río Carare (Minero)",
 *      "area": 217.5024408345576297
 *    },
 *    {
 *      "key": "Río Chicamocha",
 *      "area": 1030.6969008182
 *    },...
 *  ]
 */

/**
 * @apiDefine BiomesLayerInEAExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "type": "FeatureCollection",
 *    "features": [
 *      {
 *        "type": "Feature",
 *        "properties": {
 *          "gid": 252,
 *          "name_biome": "Hidrobioma Magdalena medio y depresión momposina"
 *          "id_biome": 41,
 *          "compensation_factor": 6.5
 *        },
 *        "geometry": {
 *          "type": "MultiPolygon",
 *          "coordinates": [...]
 *        }
 *      },...
 *    ]
 *  }
 */
