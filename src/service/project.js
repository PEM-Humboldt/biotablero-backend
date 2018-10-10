/**
 * Takes a phrase and set each word's first letter in upper case.
 * Also, hyphens are replaced by spaces.
 *
 * @param {String} phrase phrase to prettify
 *
 * @return {String} the transformed phrase
 */
const prettyLabel = phrase => phrase
  .split(/ |-/)
  .map(word => `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`)
  .join(' ');

/**
 * Given a list of keys and a list of objects, construct an object where each first level key
 * correspond to a different project values on the first element of keys array, the second level
 * with the second key, and so on.
 *
 * @example
 * // returns {
 *  colombia: {
 *    bogota: [{ country: "colombia", city: "bogota" }],
 *    cali: [{ country: "colombia", city: "cali" }]
 *  }
 * }
 * groupProjects(
 *  ['country', 'city'],
 *  [{ country: "colombia", city: "bogota" }, { country: "colombia", city: "cali" }]
 * )
 *
 * @param {String[]} keys array with the object keys to be used to group projects
 * @param {Object[]} projects array of objects to group
 */
const groupProjects = (keys, projects) => {
  const result = {};
  projects.forEach((project) => {
    // targetObj behaves like a moving reference to some result's section.
    let targetObj = result;
    let groupKey;
    keys.forEach((key, idx) => {
      groupKey = project[key];
      if (idx < keys.length - 1) {
        if (!targetObj[groupKey]) targetObj[groupKey] = {};
        targetObj = targetObj[groupKey];
      }
    });
    if (!targetObj[groupKey]) targetObj[groupKey] = [];
    targetObj[groupKey].push(project);
  });
  return result;
};

module.exports = projectPersistence => ({
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
      return projects.map(project => ({
        ...project,
        label: prettyLabel(project.name),
      }));
    }

    const noProjectProp = groupProps.filter(prop => !(prop in projects[0]));
    if (noProjectProp.length !== 0) {
      throw new ReferenceError(`Some of ${groupProps} are not project properties`);
    }

    return groupProjects(groupProps, projects);
  },

  /**
   * Get a project by its id
   *
   * @param {Number} projectId project id
   *
   * @return {Object} the project found
   */
  getProjectById: async (projectId) => {
    if (!projectId) {
      const error = new Error('Mising required parameter');
      error.code = 400;
      throw error;
    }
    const projectFound = await projectPersistence.findProjectById(projectId);
    return {
      ...projectFound,
      geomGeoJSON: JSON.parse(projectFound.geomGeoJSON),
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
  createProject: async project => projectPersistence.createProject(project),
});
