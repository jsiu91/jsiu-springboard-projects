function sortedFrequency (arr, val) {
	const i = findFirstPosition(arr, val);
	const j = findLastPosition(arr, val);

	if (i == -1) {
		return i;
	}

	return j - i + 1;
}

function findFirstPosition (arr, val) {
	let leftIdx = 0;
	let rightIdx = arr.length - 1;

	let index = -1;

	while (leftIdx <= rightIdx) {
		middleIdx = Math.floor((leftIdx + rightIdx) / 2);
		middleVal = arr[middleIdx];

		if (middleVal === val) {
			index = middleIdx;
			rightIdx = middleIdx - 1;
		} else if (middleVal > val) {
			rightIdx = middleIdx - 1;
		} else {
			leftIdx = middleIdx + 1;
		}
	}
	return index;
}

function findLastPosition (arr, val) {
	let leftIdx = 0;
	let rightIdx = arr.length - 1;

	let index = -1;

	while (leftIdx <= rightIdx) {
		middleIdx = Math.floor((leftIdx + rightIdx) / 2);
		middleVal = arr[middleIdx];

		if (middleVal === val) {
			index = middleIdx;
			leftIdx = middleIdx + 1;
		} else if (middleVal > val) {
			rightIdx = middleIdx - 1;
		} else {
			leftIdx = middleIdx + 1;
		}
	}
	return index;
}
module.exports = sortedFrequency;
