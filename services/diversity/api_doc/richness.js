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
 *     region: 100
 *   },
 *   {
 *     id: "endemic",
 *     inferred: 20,
 *     observed: 25,
 *     region: 100
 *   },
 *   {
 *     id: "invasive",
 *     inferred: 10,
 *     observed: 20,
 *     region: 100
 *   },
 *   {
 *     id: "threatened",
 *     inferred: 15,
 *     observed: 20,
 *     region: 100
 *   }
 * ]
 */

/**
 * @apiDefine NSThresholdsExample
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
