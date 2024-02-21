import { Router } from 'restify-router';
import { PortfoliosServiceI } from '../types/portfolios';

export default (PortfoliosService: PortfoliosServiceI) => {
  const router = new Router();

  /**
   * @apiGroup s_portfolios_ca
   * @api {get} /portfolios-ca/portfolios/list PortfoliosList
   * @apiName PortfoliosList
   * @apiVersion 1.0.0
   * @apiDescription
   * List of available portfolios in the system
   *
   * @apiSuccess {Object[]} result
   * @apiSuccess {String} result.id portfolio id
   * @apiSuccess {String} result.name portfolio short name
   *
   * @apiExample {curl} Example usage:
   *  /portfolios-ca/portfolios/list
   *
   * @apiUse PortfoliosListExample
   */
  router.get('/portfolios-ca/portfolios/list', (_req, res, next) =>
    PortfoliosService.getPortfoliosList().then((value) => {
      res.send(value);
      return next();
    }),
  );

  /**
   * @apiGroup s_portfolios_ca
   * @api {get} /portfolios-ca/portfolios/layer PortfolioLayer
   * @apiName PortfolioLayer
   * @apiVersion 1.0.0
   * @apiDescription
   * Layer of a portfolio within a given area.
   *
   * @apiParam (Query params) {String} areaType area type
   * @apiParam (Query params) {String|Number} areaId area id
   * @apiParam (Query params) {Number} portfolioId portfolio id
   *
   * @apiSuccess {Image} result image with the geometry
   *
   * @apiExample {curl} Example usage:
   *  /portfolios-ca/portfolios/layer?areaType=ea&areaId=CARDER&portfolioId=1
   */
  router.get('/portfolios-ca/portfolios/layer', (req, res, next) => {
    if (!(req.params.areaType && req.params.areaId && req.params.portfolioId)) {
      const error = { code: 400, message: 'areaType, areaId and portfolioId are required' };
      return next(error);
    }
    return PortfoliosService.getPortfoliosCALayer(Number(req.params.portfolioId)).then((value) => {
      res.sendRaw(200, value, { 'Content-Type': 'image/png' });
      next();
    });
  });

  return router;
};
