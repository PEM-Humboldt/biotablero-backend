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
 * Given an array of values, construct an object with the first value of the array as key,
 * which value is an object with the second value of the array as key and so on until the last value
 * is the initial result passed to the function.
 *
 * @example
 * // returns { 1: { 2: { 3: 'last' } } }
 * createPath([1,2,3], 'last')
 *
 * @param {String[]} keys array of values to be used as keys
 * @param {Object} result constructed object
 */
const createPath = (keys, result) => {
  if (keys.length === 0) return result;
  const val = keys[keys.length - 1];
  keys.pop();
  return createPath(keys, {
    label: prettyLabel(`${val}`),
    [val]: result,
  });
};

/**
 * Merge two objects including their nested properties.
 *
 * @param {Object} baseObj First object to merge
 * @param {Object} newObj Second object to merge
 */
const mergeIntoObject = (baseObj, newObj) => {
  const finalObject = baseObj;

  Object.keys(newObj).forEach((propertyKey) => {
    const propertyValue = baseObj[propertyKey];

    if (typeof propertyValue === 'object' && !Array.isArray(propertyValue)) {
      finalObject[propertyKey] = mergeIntoObject(baseObj[propertyKey], newObj[propertyKey]);
    } else if (!propertyValue) {
      finalObject[propertyKey] = newObj[propertyKey];
    } else if (Array.isArray(propertyValue)) {
      finalObject[propertyKey] = [...baseObj[propertyKey], ...newObj[propertyKey]];
    }
  });

  return finalObject;
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

    let groupedProjects = {};
    projects.forEach((project) => {
      const newProject = {
        ...project,
        label: prettyLabel(project.name),
      };
      const vals = groupProps.map(v => project[v]);
      const path = createPath(vals, [newProject]);
      groupedProjects = mergeIntoObject(groupedProjects, path);
    });

    return groupedProjects;
  },
});
