const RestifyErrors = require('restify-errors');

module.exports = (db, { geoCompanyProjects, projectImpactedBiomes }) => ({
  /**
   * Select all projects for a given company
   *
   * @param {Number} companyId company id to select
   *
   * @return {Array} JSON Objects
   */
  findProjectsByCompany: (companyId) =>
    geoCompanyProjects
      .where('id_company', companyId)
      .fetchAll({
        columns: ['gid', 'name', 'prj_status', 'id_region', 'area_ha', 'id_company'],
      })
      .then((results) => results.toJSON()),

  /**
   * Select a project by it's id
   *
   * @param {Number} projectId project id
   *
   * @return {Object} the project information
   */
  findProjectById: (projectId) =>
    geoCompanyProjects
      .where('gid', projectId)
      .fetch({
        columns: [
          'gid',
          'name',
          'prj_status',
          'id_region',
          'area_ha',
          'id_company',
          db.raw('ST_AsGeoJSON(geom)::json as "geomGeoJSON"'),
        ],
      })
      .then((result) => {
        if (result === null) {
          throw new RestifyErrors.NotFoundError('Project not found');
        }
        return result.toJSON();
      }),

  /**
   * Create a new project
   *
   * @param {Object} project object with project data
   *
   * @returns {Object} created object with its id
   */
  createProject: (project) => geoCompanyProjects.forge(project).save(),

  /**
   * Update the total project area with the total impacted biomes affected area
   *
   * @param {Number} projectId project id to update
   *
   * @returns {Promise} with the updated project when resolved
   */
  updateTotalArea: async (projectId) => {
    const area = await projectImpactedBiomes
      .query()
      .where('id_project', projectId)
      .sum('area_impacted_ha')
      .select();
    return geoCompanyProjects
      .where('gid', projectId)
      .fetch()
      .then((project) => project.set('area_ha', area[0].sum).save());
  },
});
