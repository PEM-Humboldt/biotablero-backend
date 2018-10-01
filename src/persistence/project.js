module.exports = (bookshelfConn, { GeoCompanyProject }) => (
  {
    /**
     * Select all projects for a given company
     *
     * @param {Number} companyId company id to select
     *
     * @return {Array} JSON Objects
     */
    findProjectsByCompany: companyId => (
      GeoCompanyProject
        .where('id_company', companyId)
        .fetchAll({
          columns: ['gid', 'name', 'prj_status', 'region', 'area_ha', 'id_company'],
        })
        .then(results => results.toJSON())
    ),
  }
);
