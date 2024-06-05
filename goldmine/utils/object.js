export const listify = (obj, mapFn) =>
  Object.entries(obj).map(([key, value]) => mapFn(key, value));

const people = { John: { age: 42 }, Adam: { age: 39 } };

listify(people, (key, value) => ({ name: key, ...value }));
//[ { name: 'John', age: 42 }, { name: 'Adam', age: 39 } ]


export const delistify = (arr, mapFn) =>  Object.fromEntries(arr.map(mapFn));
// const people = [
//   { name: 'John', age: 42 },
//   { name: 'Adam', age: 39 },
// ];

// delistify(people, (obj) => {
//   const { name, ...rest } = obj;
//   return [name, rest];
// });
// { John: { age: 42 }, Adam: { age: 39 } }


// export const mapObject = (arr, fn) =>
//   Object.fromEntries(arr.map((el, i, arr) => [el, fn(el, i, arr)]));

// mapObject([1, 2, 3], a => a * a);
// // { 1: 1, 2: 4, 3: 9 }


export const mapObject = (arr, mapKey, mapValue = i => i) =>
  Object.fromEntries(
    arr.map((el, i, arr) => [mapKey(el, i, arr), mapValue(el, i, arr)])
  );

// const people = [ { name: 'John', age: 42 }, { name: 'Adam', age: 39 } ];

// mapObject(people, p => p.name.toLowerCase());
// // { john: { name: 'John', age: 42 }, adam: { name: 'Adam', age: 39 } }

// mapObject(
//   people,
//   p => p.name.toLowerCase(),
//   p => p.age
// );
// { john: 42, adam: 39 }