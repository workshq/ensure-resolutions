/**
 * Sorts object fields alphabetically
 * 
 * @param {Array<string>} fieldsToSort 
 */
function createFieldSorter(fieldsToSort) {
  return function sortFields(key, value) {
    const objLiteral = value instanceof Object && value instanceof Array === false;
  
    if (objLiteral === false || fieldsToSort.includes(key) === false) return value;
  
    return Object.keys(value)
      .sort()
      .reduce((sorted, key) => {
        sorted[key] = value[key];
        return sorted;
      }, {});
  }
}

module.exports = createFieldSorter;