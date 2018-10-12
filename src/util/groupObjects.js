/**
 * Given a list of keys and a list of objects, construct an object where each first level key
 * correspond to different values on the first element of keys array, the second level
 * with the second key, and so on.
 *
 * @example
 * // returns {
 *  colombia: {
 *    bogota: [{ country: "colombia", city: "bogota" }],
 *    cali: [{ country: "colombia", city: "cali" }]
 *  }
 * }
 * groupObjects(
 *  ['country', 'city'],
 *  [{ country: "colombia", city: "bogota" }, { country: "colombia", city: "cali" }]
 * )
 *
 * @param {String[]} keys array with the object keys to be used to group objects
 * @param {Object[]} objects array of objects to group
 */
const groupObjects = (keys, objects) => {
  const result = {};
  objects.forEach((project) => {
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

module.exports = groupObjects;
