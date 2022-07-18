module.exports = (strategyPersistence, restAPI) => ({
  /**
   * Create a new project strategy
   *
   * @param {}
   * @param {Object} strategy object with strategy data
   *
   * @returns {Object} created object with its id
   */
  createStrategy: async (projectId, strategy) => {
    const pId = parseInt(projectId, 10);
    if (!pId) {
      const error = new Error('Invalid project id');
      error.code = 400;
      throw error;
    }
    return strategyPersistence.createStrategy({ ...strategy, id_project: pId });
  },

  /**
   * List all strategies that belong to a user and project
   *
   * @param {Number} userId strategies owner id
   * @param {Number} projectId project associated with the stretegies
   *
   * @returns {Object[]} list of project strategies
   */
  listStrategies: async (userId, projectId) =>
    strategyPersistence.findByUserAndProject(userId, projectId),

  /**
   * Get all geometries belonging to selected strategies for a given project
   *
   * @param {Number} projectId associated project id
   *
   * @returns {Object} GeoJson object with all geometries
   */
  getSelectedStrategiesGeoJson: async (projectId) => {
    const pId = parseInt(projectId, 10);
    if (!pId) {
      const error = new Error('Invalid project id');
      error.code = 400;
      throw error;
    }

    const reference = `main_c1p${projectId}`;
    const download = await restAPI.requestDownloadUrl(reference);

    if (download.status === 'Ok') {
      return { url: download.url };
    }

    const selectedStrategies = await strategyPersistence.findSelectedStrategiesGeoJson(pId);

    if (selectedStrategies && selectedStrategies.features) {
      return restAPI.requestUploadFile(
        JSON.stringify(selectedStrategies),
        'strategies.json',
        reference,
      );
    }

    const error = {
      code: 500,
      message: 'Error getting project',
    };
    throw error;
  },
});
