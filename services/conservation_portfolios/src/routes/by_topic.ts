import { Router } from 'restify-router';

import { EHFunction } from '../util/types';

export default (errorHandler: EHFunction) => {
  const router = new Router();

  /**
   * @apiGroup s_conservation_portfolios
   * @api {get} /con-portfolios/hola Hola Mundo
   * @apiName Hola Mundo
   * @apiVersion 1.0.0
   * @apiDescription
   * Endpoint dummy para facilitar la prueba
   *
   * @apiSuccess {String} mensaje hola
   *
   * @apiExample {curl} Example usage:
   *  /con-portfolios/hola
   */
  router.get(
    '/con-portfolios/hola',
    errorHandler((req, res, next) => {
      res.send({ mensaje: 'hola' });
      next();
    }),
  );

  return router;
};
