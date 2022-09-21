import { Router } from 'restify-router';
import { EHFunction } from '../util/types_conf';
import { PortfoliosByTarget } from '../util/types_data';

interface TargetsService {
  getPortfoliosByTarget: () => Promise<Array<PortfoliosByTarget>>;
}

export default (errorHandler: EHFunction, TargetsService: TargetsService) => {
  const router = new Router();

  /**
   * @apiGroup s_portfolios_ca
   * @api {get} /portfolios-ca/target PortfoliosByTarget
   * @apiName PortfoliosByTarget
   * @apiVersion 1.0.0
   * @apiDescription
   * Values of all portfolios for a specific target within a given area
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {Number} targetId target id to filter results
   *
   * @apiSuccess {Object} result
   *
   * @apiExample {curl} Example usage:
   *  /portfolios-ca/target?areaType=ea&areaId=CARDER&targetId=1
   *
   * @apiUse PortfoliosByTargetExample
   */
  router.get(
    '/portfolios-ca/target',
    errorHandler((req, res, next) => {
      if (!(req.params.areaType && req.params.areaId && req.params.targetId)) {
        const error = { code: 400, message: 'areaType, areaId and targetId are required' };
        throw error;
      }
      return TargetsService.getPortfoliosByTarget().then((value) => {
        res.send(value);
        next();
      });
    }),
  );

  return router;
};
