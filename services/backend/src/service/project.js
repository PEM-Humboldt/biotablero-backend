const groupObjects = require('../util/groupObjects');

/**
 * Takes a phrase and set each word's first letter in upper case.
 * Also, hyphens are replaced by spaces.
 *
 * @param {String} phrase phrase to prettify
 *
 * @return {String} the transformed phrase
 */
const prettyLabel = (phrase) =>
  phrase
    .split(/ |-/)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join(' ');

module.exports = (projectPersistence, biomeService) => ({
  /**
   * Get projects by a given company, optionally, group those pjects by a list of their properties
   *
   * @param {String} companyId company id
   * @param {Array} groupProps list of properties to group results by.
   *
   * @return {(Array|Object)} list of projects or an object with projects grouped by groupProps
   * @throws {ReferenceError} When a property to group by isn't a project property
   */
  getProjectsByCompany: async (companyId, groupProps) => {
    const projects = await projectPersistence.findProjectsByCompany(companyId);
    if (!groupProps) {
      return projects.map((project) => ({
        ...project,
        label: prettyLabel(project.name),
      }));
    }

    if (projects.length <= 0) return {};

    const noProjectProp = groupProps.filter((prop) => !(prop in projects[0]));
    if (noProjectProp.length !== 0) {
      throw new ReferenceError(`Some of ${groupProps} are not project properties`);
    }

    return groupObjects(groupProps, projects);
  },

  /**
   * Get a project by its id
   *
   * @param {Number} projectId project id
   *
   * @return {Object} the project found
   */
  getProjectById: async (projectId) => {
    const pId = parseInt(projectId, 10);
    if (!pId) {
      const error = new Error('Missing or invalid project id');
      error.code = 400;
      throw error;
    }
    const projectFound = await projectPersistence.findProjectById(pId);
    return {
      ...projectFound,
      label: prettyLabel(projectFound.name),
    };
  },

  /**
   * Create a new project
   *
   * @param {Object} project object with project data
   *
   * @returns {Object} created object with its id
   */
  createProject: async (project) => projectPersistence.createProject(project),

  /**
   * Associate a set of biomes with a given project. Additionally, the associated project total area
   *  will be updated
   *
   * @param {Number} projectId project id
   * @param {Object[]} biomes biomes to associate with
   *
   * @returns {Object[]} created objects with id
   */
  addBiomes: async (projectId, biomes) => {
    const pId = parseInt(projectId, 10);
    if (!pId) {
      const error = new Error('Invalid project id');
      error.code = 400;
      throw error;
    }

    const addedBiomes = await biomeService.bulkAddImpacted(
      biomes.map((biome) => ({
        ...biome,
        id_project: pId,
      })),
    );

    projectPersistence.updateTotalArea(projectId);
    return addedBiomes;
  },

  /**
   * Get the impacted biomes decision tree for a given project
   *
   * @param {Number} projectId project id to search for
   *
   * @returns {Object} impacted biomes decision tree
   */
  getDecisionTree: async (projectId) => {
    const pId = parseInt(projectId, 10);
    if (!pId) {
      const error = new Error('Invalid project id');
      error.code = 400;
      throw error;
    }

    return biomeService.getImpactedDecisionTree(projectId);
  },

  /**
   * Get impacted biomes info for a given project
   *
   * @param {Number} projectId project id to search for
   *
   * @returns {Object} impacted biomes information
   */
  getImpactedBiomes: async (projectId) => {
    const pId = parseInt(projectId, 10);
    if (!pId) {
      const error = new Error('Invalid project id');
      error.code = 400;
      throw error;
    }

    return biomeService.getImpacted(projectId);
  },
});
