const { Router } = require('restify-router');

/**
 * @apiDefine users Users
 * Endpoint for actions on users
 */

/**
 * @apiDefine loginUserExampleUsage
 * @apiParamExample {json} Request-Example:
 *  {
 *    "username": "test",
 *    "password": "testPass12"
 *  }
 */

/**
 * @apiDefine loginUserExampleResponse
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "username": "test",
 *    "name": "Test user"
 *  }
 */
module.exports = (userService) => {
  const router = new Router();

  /**
   * @apiGroup users
   * @api {post} /users/login loginUser
   * @apiName loginUser
   * @apiVersion 2.0.0
   * @apiDescription
   * Authenticate a user. Properties of the returned object varies, since these are defined in the
   *  configuration file, but it includes at least username.
   *
   * @apiParam (body) {String} username user username
   * @apiParam (body) {String} password user password
   *
   * @apiSuccess {Object} user authenticated user
   * @apiSuccess {Object} user.username authenticated username
   *
   * @apiExample {bash} Example usage:
   *  /users/login
   * @apiUse loginUserExampleUsage
   * @apiUse loginUserExampleResponse
   */
  router.post('/users/login', (req, res, next) => {
    const input = req.body || {};
    const result = userService.login(input.username, input.password);
    res.send(result);
    next();
  });

  return router;
};
