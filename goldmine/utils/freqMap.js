//https://bigfrontend.dev/problem/most-frequently-occurring-character
export function count(str) {
  // your code here
  const freqMap = [...str].reduce((acc, k) => (acc[k] = (acc[k] || 0) + 1, acc), {});
  let ans = [];
  Object.entries(freqMap).reduce((acc, k) => {
    if (k[1] >= acc[1]) {
      if (k[1] == acc[1]) {
        ans.push(k[0]);
      } else {
        ans = [k[0]];
      }
      return k
    } else {
      return acc
    }
  }, [null, 0]);
  return ans.length > 1 ? ans : ans[0];
}
