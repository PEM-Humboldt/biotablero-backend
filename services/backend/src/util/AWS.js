const AWS = require('aws-sdk');
const config = require('config');

const s3 = new AWS.S3({
  accessKeyId: config.AWS_S3.id,
  secretAccessKey: config.AWS_S3.secret,
});

const uploadFile = (geojson) => new Promise((resolve, reject) => {
  const randomFileName = Math.random().toString(36).slice(2);
  const params = {
    Bucket: config.AWS_S3.bucket_name,
    Key: `${randomFileName}.json`,
    Body: JSON.stringify(geojson),
    ContentType: 'application/json'
  };

  s3.upload(params, (err, data) => {
    if (err) {
      return reject(err);
    }
    return resolve(data.Location);
  });
  });

module.exports = uploadFile;
