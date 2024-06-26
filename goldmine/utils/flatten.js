export const flattenObject = (obj, delimiter = '.', prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}${delimiter}` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], delimiter, pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
//只有宽度剪枝没有深度剪枝

const fileSizes = {
  package: 256,
  src: {
    index: 1024,
    styles: {
      main: 128,
      colors: 16
    },
  },
  assets: {
    images: {
      logo: 512,
      background: 512
    },
    fonts: {
      serif: 64
    }
  }
};

// Assuming the previous object, `fileSizes`
//console.log(flattenObject(fileSizes, '/'));
/* {
  'package': 256,
  'src/index': 1024,
  'src/styles/main': 128,
  'src/styles/colors': 16,
  'assets/images/logo': 512,
  'assets/images/background': 512,
  'assets/fonts/serif': 64
} */


// export const unflattenObject = (obj, delimiter = '.') =>
//   Object.keys(obj).reduce((res, k) => {
//     k.split(delimiter).reduce(
//       (acc, e, i, keys) =>
//         acc[e] ||
//         (acc[e] = isNaN(Number(keys[i + 1]))
//           ? keys.length - 1 === i
//             ? obj[k]
//             : {}
//           : []),
//       res
//     );
//     return res;
//   }, {});

//my version
export const unflattenObject = (obj, delimiter = '.') => {
  return Object.keys(obj).reduce((acc, k) => {
    //do something to mutate acc using reduce
    //return of reduce function I don't care
    k.split(delimiter).reduce((pointer, key, i, keys) => {
      if (!pointer[key]) {
        if (i === keys.length - 1) {
          pointer[key] = obj[k];
        } else {
          pointer[key] = {};
        }
      }
      return pointer[key];
      
    }, acc);
    
    return acc;
  }, {})
};

// Assuming the previous object, `flattenedFileSizes`
// no recursion
console.log(unflattenObject(flattenObject(fileSizes, '/'), '/'));
/* 
 from  
 {
  'package': 256,
  'src/index': 1024,
  'src/styles/main': 128,
  'src/styles/colors': 16,
  'assets/images/logo': 512,
  'assets/images/background': 512,
  'assets/fonts/serif': 64
}  

to 
{
  package: 256,
  src: {
    index: 1024,
    styles: {
      main: 128,
      colors: 16
    },
  },
  assets: {
    images: {
      logo: 512,
      background: 512
    },
    fonts: {
      serif: 64
    }
  }
} */