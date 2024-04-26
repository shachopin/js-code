export function getPermutations(array) {
  // Write your code here.
	const results = [];
	if (array == null || array.length == 0) {
		return results;
	}
	const visited = new Array(array.length).fill(false);
	searchPermutation(array, [], results, visited);
	return results;
}

function searchPermutation(array, temp, results, visited) {
	if (temp.length === array.length) {
		results.push([...temp]); //deep copy
		return; //not needed, then you will just rely on implicit contraint to return avoid endless recursion
	}
	for (let i = 0; i < array.length; i++) {
		if (visited[i]) {
			continue;
		}
		visited[i] = true;
		temp.push(array[i]);
		searchPermutation(array, temp, results, visited);
		temp.pop();
		visited[i] = false;
	}
}