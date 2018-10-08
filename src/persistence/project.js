module.exports = (bookshelfConn, { GeoCompanyProjects }) => {
  const { knex } = bookshelfConn;

  return {
    /**
     * Select all projects for a given company
     *
     * @param {Number} companyId company id to select
     *
     * @return {Array} JSON Objects
     */
    findProjectsByCompany: companyId => (
      GeoCompanyProjects
        .where('id_company', companyId)
        .fetchAll({
          columns: ['gid', 'name', 'prj_status', 'region', 'area_ha', 'id_company'],
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
      GeoCompanyProjects
        .where('gid', projectId)
        .fetch({
          columns: ['gid', 'name', 'prj_status', 'region', 'area_ha', 'id_company',
            knex.raw('ST_AsGeoJSON(geom) as "geomGeoJSON"')],
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
  };
};
