export const shiftString = (strs) => {
  const generateKey = (str) => {
    let key = "";
    for (let i = 1; i < str.length; i++) {
      let offset = str[i].charCodeAt(0) - str[i - 1].charCodeAt(0);
      if (offset < 0) {
        offset += 26;
      }
      key += offset;
    }
    return key;
  };

  const resMap = new Map();
  for (let str of strs) {
    const key = generateKey(str);
    if (resMap.has(key)) {
      resMap.get(key).push(str);
    } else {
      resMap.set(key, [str]);
    }
  }
  return Array.from(resMap.values());
};


console.log(shiftString(["acd", "dfg", "wyz", "yab", "mop", "bdfh", "b", "y", "moqs"]));