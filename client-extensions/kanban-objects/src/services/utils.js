const objectIsEmpty = (object) => {
  return object === undefined || Object.keys(object).length === 0
}

const objectIsNotEmpty = (object) => {
  return object !== undefined && Object.keys(object).length > 0
}

// https://stackoverflow.com/a/21149072
const camelCaseToWords = (str) => {
  return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function (x) {
    return x[0].toUpperCase() + x.substr(1).toLowerCase();
  }).join(' ');
}

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export { objectIsEmpty, objectIsNotEmpty, camelCaseToWords, reorder };