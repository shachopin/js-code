// const dig = (obj, target) =>
//   target in obj
//     ? obj[target]
//     : Object.values(obj).reduce((acc, val) => {
//         if (acc !== undefined) return acc;
//         if (typeof val === 'object') return dig(val, target);
//       }, undefined);
// const data = {
//   foo: {
//     foz: [1, 2, 3],
//     bar: { baz: ['a', 'b', 'c'] },
//   },
// };
// dig(data, 'foz'); // [1, 2, 3]
// dig(data, 'baz'); // ['a', 'b', 'c']


export const dig = (obj, target) => {
  if (Object.hasOwn(obj, target)) {
    return obj[target];
  }
  
  for (const value of Object.values(obj)) {
    return dig(value, target);
  }
}

const data = {
  level1: {
    level2: {
      level4: {
        level3: "some data 1"
      }
    },
    level5: {
      level3: "other data 2"
    },
    //level3: 'aaa'
  }
};


 console.log(dig(data, "level3")) //shows some data 1