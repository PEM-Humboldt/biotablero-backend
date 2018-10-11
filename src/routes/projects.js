const { Router } = require('restify-router');

/**
 * @apiDefine companiesProjects Companies/Projects
 * Queries and actions directly related with projects
 */

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

/**
 * @apiDefine addBiomesProjectExampleUsage
 * @apiParamExample {json} Request-Example:
 *  [
 *    {
 *      "id_biome": 178,
 *      "natural_area_ha": 0,
 *      "secondary_area_ha": 0,
 *      "transformed_area_ha": 0,
 *      "area_impacted_ha": 0,
 *      "area_to_compensate_ha": 0
 *    },
 *    {
 *      "id_ea": "CORPOBOYACA",
 *      "id_biome": 178,
 *      "id_subzone": 2403,
 *      "natural_area_ha": 10,
 *      "secondary_area_ha": 20,
 *      "transformed_area_ha": 30,
 *      "area_impacted_ha": 60,
 *      "area_to_compensate_ha": 100
 *    }
 *  ]
 */

/**
 * @apiDefine addBiomesProjectExampleResponse
 * @apiSuccessExample {json} Success-Example:
 *  [
 *    {
 *      "id_biome": 178,
 *      "natural_area_ha": 0,
 *      "secondary_area_ha": 0,
 *      "transformed_area_ha": 0,
 *      "area_impacted_ha": 0,
 *      "area_to_compensate_ha": 0,
 *      "is_preloaded": false,
 *      "id_project": 1,
 *      "id": 16
 *    },
 *    {
 *      "id_project": 1,
 *      "id_ea": "CORPOBOYACA",
 *      "id_biome": 178,
 *      "id_subzone": 2403,
 *      "natural_area_ha": 10,
 *      "secondary_area_ha": 20,
 *      "transformed_area_ha": 30,
 *      "area_impacted_ha": 60,
 *      "area_to_compensate_ha": 100,
 *      "is_preloaded": false,
 *      "id": 17
 *    }
 *  ]
 */
module.exports = (errorHandler, project) => {
  const router = new Router();

  /**
   * @apiGroup companiesProjects
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
   * @apiGroup companiesProjects
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
   * @apiGroup companiesProjects
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

  /**
   * @apiGroup companiesProjects
   * @api {post} /companies/:id_company/projects/:id_project/biomes addBiomes
   * @apiName addBiomes
   * @apiVersion 0.1.0
   * @apiDescription
   * Associate a set of biomes with a given project
   *
   * @apiParam (query) {Number} id_company project's owner id
   * @apiParam (query) {Number} id_project project id
   *
   * @apiParam (body) {Object[]} biomes array of biomes to associate with the project
   * @apiParam (body) {Number} biomes.id_biome biome id
   * @apiParam (body) {Number} [biomes.id_ea] environmental
   * @apiParam (body) {Number} [biomes.id_subzone] sub-basin id
   * @apiParam (body) {Number} [biomes.natural_area_ha] natural area affected in this biome
   * @apiParam (body) {Number} [biomes.secondary_area_ha] secondary area affected in this biome
   * @apiParam (body) {Number} [biomes.transformed_area_ha] transformed area affected in this biome
   * @apiParam (body) {Number} [biomes.area_impacted_ha] total area affected in this biome
   * @apiParam (body) {Number} [biomes.area_to_compensate_ha] area to compensate for this biome
   *
   * @apiSuccess {Object[]} biomes array of biomes to associate with the project
   * @apiSuccess {Number} biomes.id association id
   * @apiSuccess {Number} biomes.id_biome biome id
   * @apiSuccess {Number} biomes.id_ea environmental
   * @apiSuccess {Number} biomes.id_subzone sub-basin id
   * @apiSuccess {Number} biomes.natural_area_ha natural area affected in this biome
   * @apiSuccess {Number} biomes.secondary_area_ha secondary area affected in this biome
   * @apiSuccess {Number} biomes.transformed_area_ha transformed area affected in this biome
   * @apiSuccess {Number} biomes.area_impacted_ha total area affected in this biome
   * @apiSuccess {Number} biomes.area_to_compensate_ha area to compensate for this biome
   * @apiSuccess {Boolean} biomes.is_preloaded indicates if the biome was associated to the project
   *  through the platform (false) or by other way
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/biomes
   * @apiUse addBiomesProjectExampleUsage
   * @apiUse addBiomesProjectExampleResponse
   */
  router.post('/companies/:id_company/projects/:id_project/biomes', errorHandler((req, res, next) => (
    project.addBiomes(req.params.id_project, req.body)
      .then((result) => {
        res.send(result);
        next();
      })
  )));

  return router;
};
