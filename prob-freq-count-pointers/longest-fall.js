// add whatever parameters you deem necessary

/*
longestFall
Write a function called longestFall, which accepts an array of integers, 
and returns the length of the longest consecutive decrease of integers.

Examples:

longestFall([5, 3, 1, 3, 0]) // 3, 5-3-1 is the longest consecutive sequence of decreasing integers
longestFall([2, 2, 1]) // 2, 2-1 is the longest consecutive sequence of decreasing integers
longestFall([2, 2, 2]) // 1, 2 is the longest consecutive sequence of decreasing integers
longestFall([5, 4, 4, 4, 3, 2]) // 3, 4-3-2 is the longest
longestFall([9, 8, 7, 6, 5, 6, 4, 2, 1]) // 5, 9-8-7-6-5 is the longest
longestFall([]) // 0
*/
function longestFall (nums) {
	let counter = 1;
	let maxCounter = 0;

	// quick fail case if the array is empty
	if (nums.length === 0) {
		return 0;
	}

	for (let i = 1; i < nums.length; i++) {
		// if current number is smaller than the previous number
		if (nums[i] < nums[i - 1]) {
			counter++;
			maxCounter = Math.max(counter, maxCounter);
		} else {
			counter = 1;
		}
	}

	// 1 is the default value for a non-empty array
	return maxCounter || 1;
}
