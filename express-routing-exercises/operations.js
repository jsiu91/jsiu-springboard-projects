function findMean (arr) {
	let nums = convertArrayToInteger(arr);
	let sum = nums.reduce((acc, num) => {
		return acc + num;
	});

	return sum / nums.length;
}

function convertArrayToInteger (arr) {
	let nums = arr.map((num) => parseInt(num));

	for (num of nums) {
		if (Number.isNaN(num)) {
			return new Error(`Please enter only integer numbers`);
		}
	}

	return nums;
}

function findMedian (arr) {
	let nums = convertArrayToInteger(arr);
	nums.sort();

	if (nums.length % 2 === 0) {
		return (nums[nums.length / 2 - 1] + nums[nums.length / 2]) / 2;
	} else {
		return nums[Math.floor(nums.length / 2)];
	}
}

function findMode (arr) {
	let nums = convertArrayToInteger(arr);
	nums.sort();

	let freqCounter = nums.reduce((acc, next) => {
		acc[next] = (acc[next] || 0) + 1;
		return acc;
	}, {});

	let count = 0;
	let mode;

	for (let key in freqCounter) {
		if (freqCounter[key] > count) {
			mode = key;
			count = freqCounter[key];
		}
	}

	return mode;
}

module.exports = {
	findMean,
	findMedian,
	findMode,
};
