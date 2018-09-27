const { Router } = require('restify-router');

/**
 * @apiDefine listProjectsByCompanyExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "gid": 1,
 *      "name": "ALFEREZ-SANMARCOS",
 *      "prj_status": "DAA",
 *      "region": "ZONA OCCIDENTE",
 *      "area_ha": "233.73530000000",
 *      "id_company": 1,
 *      "label": "Alferez Sanmarcos"
 *    }...
 *  ]
 */

/**
 * @apiDefine listProjectsByCompanyExample2
 * @apiSuccessExample {json} group_props success-Example:
 *  {
 *    "label": "Zona Occidente",
 *    "ZONA OCCIDENTE": {
 *      "label": "Daa",
 *      "DAA": [
 *        {
 *          "gid": 1,
 *          "name": "ALFEREZ-SANMARCOS",
 *          "prj_status": "DAA",
 *          "region": "ZONA OCCIDENTE",
 *          "area_ha": "233.73530000000",
 *          "id_company": 1,
 *          "label": "Alferez Sanmarcos"
 *        }...
 *      ],
 *      "LICENCIADO": [...]
 *    }...
 *  ]
 */

module.exports = (errorHandler, project) => {
  const router = new Router();

  /**
   * @apiGroup company/projects
   * @api {get} /companies/:id_company/projects listProjectsByCompany
   * @apiName listProjectsByCompany
   * @apiVersion 0.1.0
   * @apiDescription
   * Find all projects that belongs to a given company.
   * If group_props is passed, results will be grouped by the first prop, then by the second, so on.
   *
   * @apiParam {String} id_company company id to get projects
   * @apiParam {String[]} [group_props] list of properties to group results by
   *
   * @apiSuccess {Object[]} project project information
   * @apiSuccess {Number} project.gid project id
   * @apiSuccess {String} project.name project name
   * @apiSuccess {String} project.prj_status project status
   * @apiSuccess {String} project.region region in which is the project
   * @apiSuccess {String} project.area_ha project area
   * @apiSuccess {String} project.id_company company that owns the project
   * @apiSuccess {String} project.label pretty project name
   *
   * @apiExample {curl} Example usage:
   *  /companies/1/projects
   * @apiExample {curl} group_props example:
   *  /companies/1/projects?group_props=region,prj_status
   *
   * @apiUse listProjectsByCompanyExample
   * @apiUse listProjectsByCompanyExample2
   */
  router.get('/company/:id_company/projects', errorHandler((req, res, next) => {
    const groupProps = (req.params.group_props) ? req.params.group_props.split(',') : null;
    return project.getProjectsByCompany(req.params.id_company, groupProps)
      .then((projects) => {
        res.send(projects);
        next();
      });
  }));

  return router;
};
