/**
 * @param {string} str
 * @return {object | Array | string | number | boolean | null}
 */
//solution 1(by https://algodaily.com/challenges/implement-json-parse): handling easy cases ok, but bug for nested obj with comma
////const str = JSON.stringify([{"a":{"b":{"c":"bbb","d":"aaa"}}},null,"str"])
//it will split by comma no matter what, causing error, but rather the right thing
//to do is only split the comma in the immediate level down

// function parse(input) {
//   // if the input is empty or starts with an invalid character, throw an error
//   if (input === "" || input[0] === "'") {
//     throw Error();
//   }

//   // check if the input is null, an empty object, empty array, or a boolean and return the value from the input
//   if (input === "null") {
//     return null;
//   }
//   if (input === "{}") {
//     return {};
//   }
//   if (input === "[]") {
//     return [];
//   }
//   if (input === "true") {
//     return true;
//   }
//   if (input === "false") {
//     return false;
//   }
//   if (isNaN(input) === false) { //window.isNaN相当于Number(val)看看会不会是NaN
//     return Number(input);
//   }

//   //if the input starts with a quote, return the value from inside the quotes
//   if (input[0] === '"') {
//     return input.slice(1, -1);
//   }

//   // if it starts with a bracket, perform parsing of the contents within the brackets
//   if (input[0] === "{") {
//     return input
//       .slice(1, -1)
//       .split(",") // this is the error part, we cannot arbitary split by ANY comma we see
//       .reduce((acc, item) => {
//         // get the key and the value of the JSON property by splitting the string on the colon character
//         const index = item.indexOf(":");
//         const key = item.slice(0, index);
//         const value = item.slice(index + 1);
//         console.log("key=" + key);
//         console.log("value=" + value);
//         acc[parse(key)] = parse(value);
//         return acc;
//       }, {});
//   }
//   // if the input is an array, return the value from inside the array
//   if (input[0] === "[") {
//     return input
//       .slice(1, -1)
//       .split(",")
//       .map((x) => parse(x));
//   }
// }

//solution 2 by bfe.dev JSON.parse()
//https://bigfrontend.dev/problem/implement-JSON-parse

/*

function parse(jsonString) {
  const index = { value: 0 };

  function parseValue() {
    const start = index.value;
    let result;

    switch (jsonString[start]) {
      case "{":
        result = parseObject();
        break;

      case "[":
        result = parseArray();
        break;

      case '"':
        result = parseString();
        break;

      case "t":
        result = parseTrue();
        break;

      case "f":
        result = parseFalse();
        break;

      case "n":
        result = parseNull();
        break;

      default:
        result = parseNumber();
        break;
    }

    return result;
  }

  function parseObject() {
    index.value++;
    const obj = {};

    while (jsonString[index.value] !== "}") {
      const key = parseString();

      index.value++;
      const value = parseValue();

      obj[key] = value;

      if (jsonString[index.value] === ",") {
        index.value++;
      }
    }

    index.value++;
    return obj;
  }

  function parseArray() {
    index.value++;
    const arr = [];

    while (jsonString[index.value] !== "]") {
      const value = parseValue();
      arr.push(value);
      if (jsonString[index.value] === ",") {
        index.value++;
      }
    }

    index.value++;
    return arr;
  }

  function parseString() {
    const start = index.value + 1;
    let end = start;

    while (jsonString[end] !== '"') {
      // if (jsonString[end] === "\\") {
      //   end++;
      // } //not sure what this is for
      end++;
    }

    const str = jsonString.slice(start, end);
    index.value += str.length + 2;
    return str;
  }

  function parseTrue() {
    index.value += 4;
    return true;
  }

  function parseFalse() {
    index.value += 5;
    return false;
  }

  function parseNull() {
    index.value += 4;
    return null;
  }

  function parseNumber() {
    const start = index.value;
    let end = start;

    while ("0123456789-+eE.".includes(jsonString[end])) {
      end++;
    }

    const numStr = jsonString.slice(start, end);
    const num = Number(numStr);
    index.value += numStr.length;

    return num;
  }

  return parseValue();
}
//const str = JSON.stringify([{"a":{"b":{"c":"bbb","d":"aaa"}}},null,"str"])
//const str = JSON.stringify({"a":{"b":{"c":"bbb","d":'aaa'}}})
//const str = JSON.stringify({ a: { c: 0, s: 1 }, e: "hhh" });
// const str = JSON.stringify({ a: false });
// console.log(str);
//const str2 = '[{"a":{"b":{"c":1,"d":"BFE,dev"}}},null,"str"]';
const str2 =
  '["hello",true,false,"World",{"love":"dad","hate":{"animal":"dog"}},"mom",12,"12"]';
//const str3 = '[{"a":{"b":{"c":"abc","d":10}}},null,"str"]'
//const str4 = '[{"a":{"b":{"c":"bbb","d":"aaa"}}},null,"str"]'
try {
  console.log(parse(str2));
} catch (e) {
  console.log(e);
}


*/

//'"' === "\""  true
/*
Number('123')
123
Number('sb1')
NaN
isNaN('1')
false
isNaN('a')
true
*/

//try my own now
function parse(str) {
  let pos = 0; //currentPos
  return parseValue();

  function parseValue() {
    //0 recursively called
    //1 extract the value,
    //2 move foward the pos pointer

    //true, false, null
    if (str[pos] === "t") {
      return parseTrue();
    }

    if (str[pos] === "f") {
      return parseFalse();
    }

    if (str[pos] === "n") {
      return parseNull();
    }

    if (str[pos] === '"') {
      return parseString();
    }

    if (str[pos] === "[") {
      return parseArray();
    }

    if (str[pos] === "{") {
      return parseObject();
    }

    if (/[0-9-+eE\.]/.test(str[pos])) { //can no check condition, just parseNumber by default
      return parseNumber();
    }
  }

  function parseNumber() {
    //'12345'
    let start = pos;
    let end = start;
    while (/[0-9-+eE\.]/.test(str[end])) {
      end++;
    }
    const numStr = str.slice(start, end);
    pos += numStr.length;
    return Number(numStr);
  }

  function parseTrue() {
    pos += 4;
    return true;
  }

  function parseFalse() {
    pos += 5;
    return false;
  }

  function parseNull() {
    pos += 4;
    return null;
  }

  function parseString() {
    // '"abc"'
    let start = pos + 1;
    let end = start;
    while (str[end] !== '"') {
      end++;
    }
    const subStr = str.slice(start, end);
    pos += subStr.length + 2;
    return subStr;
  }

  function parseArray() {
    // '["abc","def"]'
    pos++;
    const res = [];

    while (str[pos] !== "]") {
      const value = parseValue();
      res.push(value);
      if (str[pos] === ",") {
        pos++;
      }
    }
    pos++;
    return res;
  }

  function parseObject() {
    // '{"abc":"def"}'
    pos++;
    const res = {};

    while (str[pos] !== "}") {
      const key = parseValue();
      pos++;
      const value = parseValue();
      res[key] = value;
      if (str[pos] === ",") {
        pos++;
      }
    }
    pos++;
    return res;
  }
}

const res = parse('["def",123,true,{"key":"value","b":4}]');
console.log(res);
