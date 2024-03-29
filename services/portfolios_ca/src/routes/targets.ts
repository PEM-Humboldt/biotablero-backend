import { Router } from 'restify-router';
import { TargetsServiceI } from '../types/targets';

export default (TargetsService: TargetsServiceI) => {
  const router = new Router();

  /**
   * @apiGroup s_portfolios_ca
   * @api {get} /portfolios-ca/targets/:targetId/values PortfoliosByTarget
   * @apiName PortfoliosByTarget
   * @apiVersion 1.0.0
   * @apiDescription
   * Values of all portfolios for a specific target within a given area
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Path params) {Number} targetId target id to filter results
   *
   * @apiSuccess {Object} result
   * @apiSuccess {Number} result.target_id target_id target id
   * @apiSuccess {String} result.target_name target_name target name
   * @apiSuccess {Number} result.target_national target_national target national value
   * @apiSuccess {String} result.target_units_short target_units_short units of target national value (short name)
   * @apiSuccess {String} result.target_units target_units units of target national value (long name)
   * @apiSuccess {Object[]}  result.portfolios_data portfolios_data Values of portfolios in the selected target
   * @apiSuccess {Number} result.portfolios_data.id id portfolio id
   * @apiSuccess {String} result.portfolios_data.name id portfolio name
   * @apiSuccess {String} result.portfolios_data.short_name id portfolio short name
   * @apiSuccess {Number} result.portfolios_data.value id portfolio value
   *
   * @apiExample {curl} Example usage:
   *  /portfolios-ca/targets/1/values?areaType=ea&areaId=CARDER
   *
   * @apiUse PortfoliosByTargetExample
   */
  router.get('/portfolios-ca/targets/:targetId/values', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.targetId)) {
      const error = { code: 400, message: 'areaType, areaId and targetId are required' };
      return next(error);
    }
    return TargetsService.getPortfoliosByTarget(
      req.params.areaType,
      req.params.areaId,
      Number(req.params.targetId),
    ).then((value) => {
      res.send(value);
      next();
    });
  });

  /**
   * @apiGroup s_portfolios_ca
   * @api {get} /portfolios-ca/targets/list TargetsList
   * @apiName TargetsList
   * @apiVersion 1.0.0
   * @apiDescription
   * List of targets with portfolios values within a given area
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id target id
   * @apiSuccess {String} result.name target name
   *
   * @apiExample {curl} Example usage:
   *  /portfolios-ca/targets/list?areaType=ea&areaId=CARDER
   *
   * @apiUse TargetsListExample
   */
  router.get('/portfolios-ca/targets/list', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId)) {
      const error = { code: 400, message: 'areaType and areaId are required' };
      return next(error);
    }
    return TargetsService.getTargetsList(req.params.areaType, req.params.areaId).then((value) => {
      res.send(value);
      next();
    });
  });

  return router;
};
