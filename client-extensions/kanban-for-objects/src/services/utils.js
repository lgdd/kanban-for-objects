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

const findObjectById = (id, list) => {
  for (let i = 0; i < list.length; i++) {
    if (id === list[i].id) {
      return list[i];
    }
  }
  return {};
}

const updateObjectInList = (object, list) => {
  return list.map((item) => {
    if(item.id === object.id) {
     return object;
    }
    return item;
  });
}

const getStateFields = (objectDefinition) => {
  const stateFields = [];
  for (let i = 0; i < objectDefinition.objectFields.length; i++) {
    if (objectDefinition.objectFields[i].state) {
      stateFields.push(objectDefinition.objectFields[i]);
    }
  }
  return stateFields;
}

export { objectIsEmpty, objectIsNotEmpty, camelCaseToWords, findObjectById, updateObjectInList, getStateFields };