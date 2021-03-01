const fetch = require('node-fetch');
const config = require('config');

const backendURL = config.services.backend;

const makeGetRequest = endpoint => (
  fetch(`${backendURL}/${endpoint}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return {
        stack: response.body.error,
        message: 'Error communicating with other services',
      };
    })
    .catch((e) => {
      const error = { stack: e.stack, message: 'Error communicating with other services' };
      throw error;
    })
);

module.exports = {
  requestCategoriesByBinaryProtected: async binaryProtectedValues => (
    makeGetRequest(`pa/categories/binary_protected?binary_protected=${binaryProtectedValues}`)
  ),
  requestBinaryProtectedByCategory: async category => (
    makeGetRequest(`pa/${category}/binary_protected`)
  ),
};
