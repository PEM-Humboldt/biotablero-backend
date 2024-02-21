const multer = require('multer');
const { Router } = require('restify-router');
const RestifyErrors = require('restify-errors');

module.exports = (DownloadsService) => {
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
  router.get('/downloads/get-file', (req, res, next) => {
    if (!req.params.reference) {
      const error = new RestifyErrors.BadRequestError('reference is required');
      return next(error);
    }
    return DownloadsService.getFile(req.params.reference).then((value) => {
      res.send(value);
      next();
    });
  });

  const upload = multer({ dest: `${process.cwd()}/uploads/` });
  /**
   * @apiGroup download
   * @api {post} /downloads/upload-file UploadFile
   * @apiName UploadFile
   * @apiVersion 1.0.0
   * @apiDescription
   * Upload the given file to the corresponding service and return its url
   *
   * @apiParam (multipart/form-data) {File} file file to be uploaded
   * @apiParam (multipart/form-data) {String} service microservice making the request
   * @apiParam (multipart/form-data) {String} reference id to associate to the uploaded file
   *
   * @apiSuccess {Object} result
   * @apiSuccess {String} [result.url] File download url
   *
   * @apiParamExample {json} Request-Example:
   * curl --request POST \
   *  --url http://localhost/downloads/upload-file \
   *  --header 'Content-Type: multipart/form-data' \
   *  --form service=main \
   *  --form reference=main_c1p1 \
   *  --form file=@path/to/a/file
   * @apiUse UploadFileExample
   */
  router.post('/downloads/upload-file', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return next(err);
      }
      if (!req.file || !req.body.service || !req.body.reference) {
        const error = new RestifyErrors.BadRequestError('file, service and reference are required');
        return next(error);
      }
      return DownloadsService.uploadFile(
        req.file,
        req.body.service.replace(/\s+/g, ' ').trim(),
        req.body.reference.replace(/\s+/g, ' ').trim(),
      ).then((value) => {
        res.send(value);
        next();
      });
    });
  });

  return router;
};
