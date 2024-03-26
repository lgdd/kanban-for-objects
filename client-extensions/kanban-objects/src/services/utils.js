const objectIsEmpty = (object) => {
  return Object.keys(object).length === 0
}

const objectIsNotEmpty = (object) => {
  return Object.keys(object).length > 0
}

// https://stackoverflow.com/a/21149072
const camelCaseToWords = (str) => {
  return str.match(/^[a-z]+|[A-Z][a-z]*/g).map(function (x) {
    return x[0].toUpperCase() + x.substr(1).toLowerCase();
  }).join(' ');
}

export { objectIsEmpty, objectIsNotEmpty, camelCaseToWords };