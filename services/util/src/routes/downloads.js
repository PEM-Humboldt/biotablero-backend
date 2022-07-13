const { Router } = require('restify-router');

module.exports = (errorHandler) => {
  const router = new Router();

  /**
   * @apiGroup download
   * @api {get} /downloads/get-file GetFile
   * @apiName GetFile
   * @apiVersion 1.0.0
   * @apiDescription
   * Given a reference returns the file url if it exists and hasn't expired
   *
   * @apiParam (Query params) {String} reference file reference to retrieve
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String="Ok","Unavailable"} result.status File status for the requested reference
   * @apiSuccess {String} [result.url] File url if status is "Ok"
   *
   * @apiExample {curl} Example usage:
   *  /downloads/get-file?reference=main-c1p1
   * @apiUse GetFileExampleUrl
   * @apiUse GetFileExampleExpired
   */
  router.get(
    '/downloads/get-file',
    errorHandler((req, res, next) => {
      if (!req.params.reference) {
        const error = { code: 400, message: 'reference is required' };
        throw error;
      }
      res.send({ status: 'Ok', url: 'http://url.to.file' });
      next();
      // return UtilService.getTexts(req.params.key).then((value) => {
      //   res.send(value);
      //   next();
      // });
    }),
  );

  /**
   * @apiGroup download
   * @api {post} /downloads/upload-file UploadFile
   * @apiName UploadFile
   * @apiVersion 1.0.0
   * @apiDescription
   * Upload the given file o the corresponding service and return its url
   *
   * Missing the file parameter
   * @apiParam (Query params) {String} service microservice making the request
   * @apiParam (Body params) {Object} [headers] headers to be passed to the storage service
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String="Ok","Error"} result.status Result status of the upload
   * @apiSuccess {String} [result.url] File url if status is "Ok"
   * @apiSuccess {String} [result.message] Error message if it's the case
   *
   * @apiExample {curl} Example usage:
   *  /downloads/upload-file?service=main
   * @apiUse GetFileExampleUrl
   * @apiParamExample {json} Request-Example:
   *  {
   *    "headers": {
   *      "ContentType": "application/json"
   *    }
   *  }
   * @apiUse UploadFileExample
   */
  router.get(
    '/downloads/upload-file',
    errorHandler((req, res, next) => {
      if (!req.params.service) {
        const error = { code: 400, message: 'service is required' };
        throw error;
      }
      res.send({ status: 'Ok', url: 'http://url.to.file' });
      next();
      // return UtilService.getTexts(req.params.key).then((value) => {
      //   res.send(value);
      //   next();
      // });
    }),
  );

  return router;
};
