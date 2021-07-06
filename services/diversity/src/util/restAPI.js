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
  requestAreaGeometry: async (areaType, areaId) => (
    makeGetRequest(`${areaType}/layers/${areaId}`)
  ),
};
