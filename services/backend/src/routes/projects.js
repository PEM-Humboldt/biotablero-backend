const { Router } = require('restify-router');

/**
 * @apiDefine comp_companiesProjects Compensation > Companies/Projects
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
 *    "ZONA OCCIDENTE": {
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
 *  }
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
 *      "area_impacted_pct": 0
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
 *      "area_impacted_pct": 0
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

/**
 * @apiDefine impactedBiomesDecisionTreeExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "Hidrobioma Cauca medio": {
 *      "Rio Tapias y otros directos al Cauca": {
 *        "Corporacion Autonoma Regional de Risaralda": [
 *          {
 *            "id_biome": 92,
 *            "biome_name": "Hidrobioma Cauca medio",
 *            "ea_name": "Corporacion Autonoma Regional de Risaralda",
 *            "id_subzone": 2616,
 *            "nom_szh": "Rio Tapias y otros directos al Cauca",
 *            "id_ea": "CARDER"
 *          }
 *        ],
 *        "Corporacion Autonoma Regional de Caldas": [
 *          {
 *            "id_biome": 92,
 *            "biome_name": "Hidrobioma Cauca medio",
 *            "ea_name": "Corporacion Autonoma Regional de Caldas",
 *            "id_subzone": 2616,
 *            "nom_szh": "Rio Tapias y otros directos al Cauca",
 *            "id_ea": "CORPOCALDAS"
 *          }
 *        ]
 *      }...
 *    }
 *  }
 */

/**
 * @apiDefine getImpactedBiomesExample
 * @apiSuccessExample {json} Success-Example:
 *  {
 *    "biomes": [
 *      {
 *        "id": 91,
 *        "id_project": 11,
 *        "natural_area_ha": null,
 *        "secondary_area_ha": "2.1978",
 *        "transformed_area_ha": null,
 *        "area_impacted_ha": "2.1978",
 *        "area_to_compensate_ha": "2.1978",
 *        "id_biome": 18,
 *        "biome": {
 *          "id_biome": 18,
 *          "name": "Helobioma Altoandino cordillera oriental",
 *          "compensation_factor": "7.00"
 *        }
 *      },...
 *    ],
 *    "geometry": {
 *      "type": "FeatureCollection",
 *      "features": [
 *        {
 *          "type": "Feature",
 *          "properties": {
 *            "gid": 120,
 *            "name": "Hidrobioma Nechí-San Lucas",
 *            "compensation_factor": 5.5,
 *            "id_biome": 113
 *          },
 *          "geometry": {...}
 *        }...
 *      ]
 *    }
 *  }
 */
module.exports = (errorHandler, projectService) => {
  const router = new Router();

  /**
   * @apiGroup comp_companiesProjects
   * @api {get} /companies/:id_company/projects listProjectsByCompany
   * @apiName listProjectsByCompany
   * @apiVersion 2.0.0
   * @apiDescription
   * Find all projects that belongs to a given company.
   * If group_props is passed, results will be grouped by the first prop, then by the second, so on.
   *
   * @apiParam (Path params) {Number} id_company company id to get projects
   * @apiParam (Query params) {String[]} [group_props] list of properties to group results by
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
  router.get(
    '/companies/:id_company/projects',
    errorHandler((req, res, next) => {
      const groupProps = req.params.group_props ? req.params.group_props.split(',') : null;
      return projectService
        .getProjectsByCompany(req.params.id_company, groupProps)
        .then((projects) => {
          res.send(projects);
          next();
        });
    }),
  );

  /**
   * @apiGroup comp_companiesProjects
   * @api {get} /companies/:id_company/projects/:id_project getProjectById
   * @apiName getProjectById
   * @apiVersion 2.0.0
   * @apiDescription
   * Find a project by its id
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   * @apiParam (Path params) {Number} id_project project id
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
  router.get(
    '/companies/:id_company/projects/:id_project',
    errorHandler((req, res, next) =>
      projectService.getProjectById(req.params.id_project).then((projectFound) => {
        res.send(projectFound);
        next();
      }),
    ),
  );

  /**
   * @apiGroup comp_companiesProjects
   * @api {post} /companies/:id_company/projects createProject
   * @apiName createProject
   * @apiVersion 2.0.0
   * @apiDescription
   * Create a project
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   *
   * @apiParam (Body Params) {Object} project object to be created
   * @apiParam (Body Params) {String} project.name project name
   * @apiParam (Body Params) {String} [project.details] extra information about the project
   * @apiParam (Body Params) {String} [project.prj_status] project status
   * @apiParam (Body Params) {Number} project.id_company project's owner id
   * @apiParam (Body Params) {String} project.id_region project region
   *
   * @apiSuccess {Object} project new project
   * @apiSuccess {String} project.gid newly created project id
   * @apiSuccess {String} project.name project name
   * @apiSuccess {Number} [project.area_ha] project area
   * @apiSuccess {String} [project.details] information about the project
   * @apiSuccess {String} [project.prj_status] project status
   * @apiSuccess {Number} project.id_company project's owner id
   * @apiSuccess {String} project.id_region project region
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects
   * @apiUse createProjectExampleUsage
   * @apiUse createProjectExampleResponse
   */
  router.post(
    '/companies/:id_company/projects',
    errorHandler((req, res, next) =>
      projectService.createProject(req.body).then((result) => {
        res.send(result);
        next();
      }),
    ),
  );

  /**
   * @apiGroup comp_companiesProjects
   * @api {post} /companies/:id_company/projects/:id_project/biomes addImpactedBiomes
   * @apiName addImpactedBiomes
   * @apiVersion 2.0.0
   * @apiDescription
   * Associate a set of biomes as impacted by a given project. This automatically updates the
   *  associated project total area
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   * @apiParam (Path params) {Number} id_project project id
   *
   * @apiParam (Body Params) {Object[]} biomes array of biomes to associate with the project
   * @apiParam (Body Params) {Number} biomes.id_biome biome id
   * @apiParam (Body Params) {Number} [biomes.id_ea] environmental
   * @apiParam (Body Params) {Number} [biomes.id_subzone] sub-basin id
   * @apiParam (Body Params) {Number} [biomes.natural_area_ha] natural area affected in this biome
   * @apiParam (Body Params) {Number} [biomes.secondary_area_ha] secondary area affected in this
   * biome
   * @apiParam (Body Params) {Number} [biomes.transformed_area_ha] transformed area affected in this
   * biome
   * @apiParam (Body Params) {Number} [biomes.area_impacted_ha] total area affected in this biome
   * @apiParam (Body Params) {Number} [biomes.area_to_compensate_ha] area to compensate for this
   * biome
   * @apiParam (Body Params) {Number} [biomes.area_impacted_pct] percentage that represents this
   * biome in the total project area
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
   * @apiSuccess {Number} biomes.area_impacted_pct percentage that represents this biome in the
   *  total project area
   * @apiSuccess {Boolean} biomes.is_preloaded indicates if the biome was associated to the project
   *  through the platform (false) or by other way
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/biomes
   * @apiUse addBiomesProjectExampleUsage
   * @apiUse addBiomesProjectExampleResponse
   */
  router.post(
    '/companies/:id_company/projects/:id_project/biomes',
    errorHandler((req, res, next) =>
      projectService.addBiomes(req.params.id_project, req.body).then((result) => {
        res.send(result);
        next();
      }),
    ),
  );

  /**
   * @apiGroup comp_companiesProjects
   * @api {get} /companies/:id_company/projects/:id_project/decisionTree impactedBiomesDecisionTree
   * @apiName impactedBiomesDecisionTree
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the impacted biomes decision tree for a given project
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   * @apiParam (Path params) {Number} id_project project id
   *
   * @apiSuccess {Object} tree the decision tree
   * @apiSuccess {Object} tree.biome biome name (starting point on the decision tree)
   * @apiSuccess {Object} tree.biome.subzone sub-basin name
   * @apiSuccess {Object[]} tree.biome.subzone.ea environmental authority name
   * @apiSuccess {Number} tree.biome.subzone.ea.id_biome impacted biome id
   * @apiSuccess {String} tree.biome.subzone.ea.biome_name biome name
   * @apiSuccess {String} tree.biome.subzone.ea.id_ea environmental authority id
   * @apiSuccess {String} tree.biome.subzone.ea.ea_name environmental authority name
   * @apiSuccess {Number} tree.biome.subzone.ea.id_subzone sub-basin id
   * @apiSuccess {String} tree.biome.subzone.ea.nom_szh sub-basin name
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/decisionTree
   * @apiUse impactedBiomesDecisionTreeExample
   */
  router.get(
    '/companies/:id_company/projects/:id_project/decisionTree',
    errorHandler((req, res, next) =>
      projectService.getDecisionTree(req.params.id_project).then((result) => {
        res.send(result);
        next();
      }),
    ),
  );

  /**
   * @apiGroup comp_companiesProjects
   * @api {get} /companies/:id_company/projects/:id_project/biomes getImpactedBiomes
   * @apiName getImpactedBiomes
   * @apiVersion 2.0.0
   * @apiDescription
   * Get the impacted biomes for a given project
   *
   * @apiParam (Path params) {Number} id_company project's owner id
   * @apiParam (Path params) {Number} id_project project id
   *
   * @apiSuccess {Object} result impacted biomes info
   * @apiSuccess {Object[]} result.biomes information for each biomes
   * @apiSuccess {Number} result.biomes.id impacted biome id
   * @apiSuccess {Number} result.biomes.id_project impacted biome associated project
   * @apiSuccess {Number} result.biomes.natural_area_ha natural area impacted
   * @apiSuccess {Number} result.biomes.secondary_area_ha secondary area impacted
   * @apiSuccess {Number} result.biomes.transformed_area_ha transformed area impacted
   * @apiSuccess {Number} result.biomes.area_impacted_ha total area impacted
   * @apiSuccess {Number} result.biomes.area_to_compensate_ha total area to compensate
   * @apiSuccess {Number} result.biomes.id_biome impacted biome id
   * @apiSuccess {Number} result.biomes.area_impacted_pct percentage that this biome area represents
   *  for the hole project area
   * @apiSuccess {Object} result.biomes.biome impacted biome info
   * @apiSuccess {String} result.biomes.biome.name impacted biome name
   * @apiSuccess {String} result.biomes.biome.compensation_factor impacted biome compensation factor
   * @apiSuccess {Object} result.geometry geoJSON with all biomes as features
   *
   * @apiExample {bash} Example usage:
   *  /companies/1/projects/1/biomes
   * @apiUse getImpactedBiomesExample
   */
  router.get(
    '/companies/:id_company/projects/:id_project/biomes',
    errorHandler((req, res, next) =>
      projectService.getImpactedBiomes(req.params.id_project).then((result) => {
        res.send(result);
        next();
      }),
    ),
  );

  return router;
};
