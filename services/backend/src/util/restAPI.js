const fetch = require('node-fetch');
const FormData = require('form-data');

const config = require('config');

const utilURL = config.services.util;

const makeGetRequest = (service, endpoint) =>
  fetch(`${service}/${endpoint}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return response.text().then((msg) => {
        const error = {
          stack: msg,
          message: 'Error communicating with other services',
        };
        throw error;
      });
    })
    .catch((e) => {
      const error = { stack: e.stack, message: 'Error communicating with other services' };
      throw error;
    });

const requestUploadFile = (file, filename, reference) => {
  const form = new FormData();

  form.append('file', file, { filename });
  form.append('service', 'main');
  form.append('reference', reference);

  const options = {
    method: 'POST',
    body: form,
  };
  return fetch(`${utilURL}/downloads/upload-file`, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return response.text().then((msg) => {
        const error = {
          Error: msg,
          message: 'Error communicating with other services',
        };
        throw error;
      });
    })
    .catch((e) => {
      const error = { stack: e.stack, message: 'Error communicating with other services' };
      throw error;
    });
};

module.exports = {
  requestDownloadUrl: async (fileReference) =>
    makeGetRequest(utilURL, `downloads/get-file?reference=${fileReference}`),
  requestUploadFile,
};
