/**
 * @apiDefine s_portfolios_ca Search > Conservation Portfolios
 * Information related to conservation portfolios in a given area.
 */

/**
 * @apiDefine PortfoliosByTargetExample
 * @apiSuccessExample {json} Success-Example:
 * {
 *   target_id: 3,
 *   target_name: "Servicios Ecosistémicos",
 *   target_national: 4521,
 *   target_units_short: "TC",
 *   target_units: "Toneladas de carbono",
 *   portfolios_data: [
 *     {
 *       id: 1,
 *       name: "NATURE MAP · WCMC",
 *       short_name: "WCMC",
 *       value: 100,
 *     },
 *     {
 *       id: 2,
 *       name: "ELSA · PNUD",
 *       short_name: "ELSA",
 *       value: 200,
 *     },
 *     {
 *       id: 3,
 *       name: "WEPLAN FORESTS",
 *       short_name: "WEPLAN",
 *       value: 300,
 *     },
 *     {
 *       id: 4,
 *       name: "Especies, Carbono y Agua . LONG NAME",
 *       short_name: "Especies, Carbono y Agua",
 *       value: 400,
 *     },
 *     {
 *       id: 5,
 *       name: "ACC · LONG NAME",
 *       short_name: "ACC",
 *       value: 500,
 *     },
 *   ],
 * }
*/

/**
 * @apiDefine TargetsListExample
 * @apiSuccessExample {json} Success-Example:
 * [
 *   {
 *     id: 1,
 *     name: "Especies"
 *   },
 *   {
 *     id: 2,
 *     name: "Ecosistemas",
 *   },
 *   {
 *     id: 3,
 *     name: "Servicios Ecosistémicos",
 *   },
 *   {
 *     id: 4,
 *     name: "Conectividad"
 *   },
 *   {
 *     id: 5,
 *     name: "Cambio Climático"
 *   },
 *   {
 *     id: 6,
 *     name: "Deforestación"
 *   },
 *   {
 *     id: 7,
 *     name: "Restauración"
 *   },
 *   {
 *     id: 8,
 *     name: "Aguas - Rios"
 *   }
 * ]
*/
