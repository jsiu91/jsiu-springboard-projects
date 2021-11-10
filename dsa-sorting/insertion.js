function insertionSort (arr) {
	let i, j, min;
	for (i = 0; i < arr.length; i++) {
		min = arr[i];
		j = i - 1;
		while (j >= 0 && arr[j] > min) {
			arr[j + 1] = arr[j];
			j--;
		}
		arr[j + 1] = min;
	}
	return arr;
}

module.exports = insertionSort;
