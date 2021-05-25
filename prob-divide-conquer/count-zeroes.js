function countZeroes (arr) {
	let counter = 0;
	arr.sort();

	for (n of arr) {
		if (n === 0) {
			counter++;
		} else {
			break;
		}
	}

	return counter;
}

module.exports = countZeroes;
