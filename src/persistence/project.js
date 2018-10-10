module.exports = (db, { geoCompanyProjects }) => ({
  /**
   * Select all projects for a given company
   *
   * @param {Number} companyId company id to select
   *
   * @return {Array} JSON Objects
   */
  findProjectsByCompany: companyId => (
    geoCompanyProjects
      .where('id_company', companyId)
      .fetchAll({
        columns: ['gid', 'name', 'prj_status', 'id_region', 'area_ha', 'id_company'],
      })
      .then(results => results.toJSON())
  ),

  /**
   * Select a project by it's id
   *
   * @param {Number} projectId project id
   *
   * @return {Object} the project information
   */
  findProjectById: projectId => (
    geoCompanyProjects
      .where('gid', projectId)
      .fetch({
        columns: ['gid', 'name', 'prj_status', 'id_region', 'area_ha', 'id_company',
          db.raw('ST_AsGeoJSON(geom) as "geomGeoJSON"')],
      })
      .then((result) => {
        if (result === null) {
          const error = new Error('Project not found');
          error.code = 404;
          throw error;
        }
        return result.toJSON();
      })
  ),

  /**
   * Create a new project
   *
   * @param {Object} project object with project data
   *
   * @returns {Object} created object with its id
   */
  createProject: project => geoCompanyProjects.forge(project).save(),
});
