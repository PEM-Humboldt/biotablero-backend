/**
 * @apiDefine s_richness Search > Species richness
 * Information related to the species richness in a given area.
 */

/**
 * @apiDefine NumberOfSpeciesExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     id: "total",
 *     inferred: 30,
 *     observed: 40,
 *     region_inferred: 80,
 *     region_observed: 100,
 *     region_name: Andes
 *   },
 *   {
 *     id: "endemic",
 *     inferred: 20,
 *     observed: 25,
 *     region_inferred: 80,
 *     region_observed: 100,
 *     region_name: Andes
 *   },
 *   {
 *     id: "invasive",
 *     inferred: 10,
 *     observed: 20,
 *     region_inferred: 80,
 *     region_observed: 100,
 *     region_name: Andes
 *   },
 *   {
 *     id: "threatened",
 *     inferred: 15,
 *     observed: 20,
 *     region_inferred: 80,
 *     region_observed: 100,
 *     region_name: Andes
 *   }
 * ]
 */

/**
 * @apiDefine NOSThresholdsExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     id: "total",
 *     min_inferred: 3,
 *     min_observed: 5,
 *     max_inferred: 100,
 *     max_observed: 110
 *   }
 * ]
 */

/**
 * @apiDefine NOSNationalMaxExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     id: "total",
 *     max_inferred: 100,
 *     max_observed: 110
 *   }
 * ]
 */

/**
 * @apiDefine GapsExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     id: 'gaps',
 *     avg: 0.34,
 *     min: 0.4,
 *     max: 0.8,
 *     min_region: 0.45,
 *     max_region: 0.99,
 *     min_threshold: 0.15,
 *     max_threshold: 0.95,
 *     region_name: Andes
 *   }
 * ]
 */

/**
 * @apiDefine ConcentrationExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     id: 'concentration',
 *     avg: 0.3,
 *     min: 0.2,
 *     max: 0.6,
 *     min_region: 0.45,
 *     max_region: 0.99,
 *     min_threshold: 0.1,
 *     max_threshold: 1,
 *   }
 * ]
 */

/**
 * @apiDefine NOSLayerExample
 * @apiSuccessExample {binary} Success-Example:
 * image/png
 */

/**
 * @apiDefine NOSLayerThresholdsExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   min: 0,
 *   max: 2192,
 * }
 */

/**
 * @apiDefine GapsLayerExample
 * @apiSuccessExample {binary} Success-Example:
 * image/png
 */

/**
 * @apiDefine GapsLayerThresholdsExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   min: 0.158548156,
 *   max: 0.658754684,
 * }
 */
