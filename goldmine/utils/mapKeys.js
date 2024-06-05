// export const deepMapKeys = (obj, fn) =>
//   Array.isArray(obj)
//     ? obj.map(val => deepMapKeys(val, fn))
//     : obj !== null && typeof obj === 'object'
//     ? Object.keys(obj).reduce((acc, current) => {
//         const key = fn(current);
//         const val = obj[current];
//         acc[key] =  deepMapKeys(val, fn);
//         return acc;
//       }, {})
//     : obj;

//my version
export const deepMapKeys = (obj, fn) => {
  if (typeof obj !== "object" || obj == null) {
    return obj;
  }
  
  if (Array.isArray(obj)) {
    return obj.map((val) => deepMapKeys(val, fn));
  }

  return Object.keys(obj).reduce((acc, current) => {
    const key = fn(current);
    const val = obj[current];
    acc[key] = deepMapKeys(val, fn);
    return acc;
  }, {});
};
//只有深度剪枝没有宽度剪枝

const obj = {
  foo: "1",
  nested: {
    child: {
      withArray: [
        {
          grandChild: ["hello"],
        },
      ],
    },
  },
};
const upperKeysObj = deepMapKeys(obj, (key) => key.toUpperCase());
//console.log(upperKeysObj);