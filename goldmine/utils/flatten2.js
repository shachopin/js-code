export function flatten(value) {
  // Write your code here.
  if (typeof value !== 'object' || value === null ) {
    return value;
  }
  
  if (Array.isArray(value)) {
    return flattenArray(value);
  }
  return flattenObject(value);
}

function flattenArray(value) {
  return value.reduce((currentArray, currentItem) => currentArray.concat(flatten(currentItem)), [])
}


function flattenObject(value) {
  return Object.keys(value).reduce((currentObj, currentKey) => {
    const currentVal = value[currentKey];
    if (isObject(currentVal)) {
      return {...currentObj, ...flatten(currentVal)};
    } else {
      return {...currentObj, [currentKey]: flatten(currentVal)}
    }
  }, {})
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}


console.log(flatten([1,2,3,4,[5,6]]));
