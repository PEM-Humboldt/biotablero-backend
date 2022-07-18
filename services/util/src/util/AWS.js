const AWS = require('aws-sdk');
const config = require('config');
const fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: config.AWS_S3.id,
  secretAccessKey: config.AWS_S3.secret,
});

/**
 * Uploads a file to S3, the file must exists in the filesystem
 *
 * @param {Object} file File properties of the file to be uploaded: path, upload and original name
 * and mimetype
 * @returns {Object} uploaded file information
 */
const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const fileStream = fs.createReadStream(file.path);
    const params = {
      Bucket: config.AWS_S3.bucket_name,
      Key: `${file.filename}`,
      Body: fileStream,
      ContentDisposition: `attachment; filename=${file.originalname}`,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        const error = {
          code: 500,
          stack: err.stack,
          message: 'Error connecting to cloud services',
        };
        return reject(error);
      }
      const regexp = /([\w|-]*)=(".*?"|\S*)/g;
      const expiration = [...data.Expiration.matchAll(regexp)][0][2];
      return resolve({ exp_date: expiration, ...data });
    });
  });

module.exports = { uploadFile };
