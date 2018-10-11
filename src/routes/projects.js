const { Router } = require('restify-router');

/**
 * @apiDefine listProjectsByCompanyExample
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "gid": 1,
 *      "name": "ALFEREZ-SANMARCOS",
 *      "prj_status": "DAA",
 *      "id_region": "ZONA OCCIDENTE",
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
 *          "id_region": "ZONA OCCIDENTE",
 *          "area_ha": "233.73530000000",
 *          "id_company": 1,
 *          "label": "Alferez Sanmarcos"
 *        }...
 *      ],
 *      "LICENCIADO": [...]
 *    }...
 *  ]
 */

/**
 * @apiDefine getProjectByIdExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "gid": 1,
 *    "name": "ALFEREZ-SANMARCOS",
 *    "prj_status": "DAA",
 *    "id_region": "ZONA OCCIDENTE",
 *    "area_ha": "233.73530000000",
 *    "id_company": 1,
 *    "label": "Alferez Sanmarcos"
 *  }
 */

/**
 * @apiDefine createProjectExampleUsage
 * @apiParamExample {json} Request-Example:
 *  {
 *    "id_company": 1,
 *    "id_region": "ZONA OCCIDENTE",
 *    "name": "test project"
 *  }
 */

/**
 * @apiDefine createProjectExampleResponse
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "id_company": 1,
 *    "id_region": "ZONA OCCIDENTE",
 *    "name": "test project2",
 *    "gid": 18
 *  }
 */
module.exports = (errorHandler, project) => {
  const router = new Router();

  /**
   * @apiGroup companies/projects
   * @api {get} /companies/:id_company/projects listProjectsByCompany
   * @apiName listProjectsByCompany
   * @apiVersion 0.1.0
   * @apiDescription
   * Find all projects that belongs to a given company.
   * If group_props is passed, results will be grouped by the first prop, then by the second, so on.
   *
   * @apiParam {Number} id_company company id to get projects
   * @apiParam {String[]} [group_props] list of properties to group results by
   *
   * @apiSuccess {Object[]} project project information
   * @apiSuccess {Number} project.gid project id
   * @apiSuccess {String} project.name project name
   * @apiSuccess {String} project.prj_status project status
   * @apiSuccess {String} project.id_region region in which is the project
   * @apiSuccess {String} project.area_ha project area
   * @apiSuccess {String} project.id_company company that owns the project
   * @apiSuccess {String} project.label pretty project name
   *
   * @apiExample {curl} Example usage:
   *  /companies/1/projects
   * @apiExample {curl} group_props example:
   *  /companies/1/projects?group_props=id_region,prj_status
   *
   * @apiUse listProjectsByCompanyExample
   * @apiUse listProjectsByCompanyExample2
   */
  router.get('/companies/:id_company/projects', errorHandler((req, res, next) => {
    const groupProps = (req.params.group_props) ? req.params.group_props.split(',') : null;
    return project.getProjectsByCompany(req.params.id_company, groupProps)
      .then((projects) => {
        res.send(projects);
        next();
      });
  }));

  /**
   * @apiGroup companies/projects
   * @api {get} /companies/:id_company/projects/:id_project getProjectById
   * @apiName getProjectById
   * @apiVersion 0.1.0
   * @apiDescription
   * Find a project by its id
   *
   * @apiParam {Number} id_company project's owner id
   * @apiParam {Number} id_project project id
   *
   * @apiSuccess {Object} project project information
   * @apiSuccess {Number} project.gid project id
   * @apiSuccess {String} project.name project name
   * @apiSuccess {String} project.prj_status project status
   * @apiSuccess {String} project.id_region region in which is the project
   * @apiSuccess {String} project.area_ha project area
   * @apiSuccess {String} project.id_company company that owns the project
   * @apiSuccess {String} project.label pretty project name
   *
   * @apiExample {curl} Example usage:
   *  /companies/1/projects/1
   * @apiUse getProjectByIdExample
   */
  router.get('/companies/:id_company/projects/:id_project', errorHandler((req, res, next) => (
    project.getProjectById(req.params.id_project)
      .then((projectFound) => {
        res.send(projectFound);
        next();
      })
  )));

  /**
   * @apiGroup companies/projects
   * @api {get} /companies/:id_company/projects createProject
   * @apiName createProject
   * @apiVersion 0.1.0
   * @apiDescription
   * Create a project
   *
   * @apiParam (query) {Number} id_company project's owner id
   * @apiParam (query) {Number} id_project project id
   *
   * @apiParam (body) {Object} project object to be created
   * @apiParam (body) {String} project.name project name
   * @apiParam (body) {Number} [project.area_ha] project area
   * @apiParam (body) {String} [project.details] extra information about the project
   * @apiParam (body) {String} [project.prj_status] project status
   * @apiParam (body) {Number} project.id_company project's owner id
   * @apiParam (body) {String} project.id_region project region
   *
   * @apiSuccess {Object} project new project
   * @apiSuccess {String} project.gid newly created project id
   * @apiSuccess {String} project.name project name
   * @apiSuccess {Number} project.area_ha project area
   * @apiSuccess {String} project.details information about the project
   * @apiSuccess {String} project.prj_status project status
   * @apiSuccess {Number} project.id_company project's owner id
   * @apiSuccess {String} project.id_region project region
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects
   * @apiUse createProjectExampleUsage
   * @apiUse createProjectExampleResponse
   */
  router.post('/companies/:id_company/projects', errorHandler((req, res, next) => (
    project.createProject(req.body)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  router.post('/companies/:id_company/projects/:id_project/biomes', errorHandler((req, res, next) => (
    project.addBiomes(req.params.id_project, req.body)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  return router;
};
