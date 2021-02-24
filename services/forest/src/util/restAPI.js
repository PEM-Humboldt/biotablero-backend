const fetch = require('node-fetch');
const config = require('config');

const backendURL = config.services.backend;

const makeGetRequest = endpoint => (
  fetch(`${backendURL}/${endpoint}`)
    .then(response => response.json())
    .catch(error => new Error('Error making the request', error))
);

module.exports = {
  requestCategoriesByBinaryProtected: async binaryProtectedValues => (
    makeGetRequest(`pa/categories/binary_protected/${binaryProtectedValues}`)
  ),
  requestBinaryProtectedByCategory: async category => (
    makeGetRequest(`pa/${category}/binary_protected`)
  ),
};