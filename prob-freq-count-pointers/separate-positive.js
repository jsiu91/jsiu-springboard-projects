// add whatever parameters you deem necessary

/*
separatePositive
Write a function called separatePositive which accepts an array of non-zero integers. 
Separate the positive integers to the left and the negative integers to the right. 
positive numbers and negative numbers need not be in sorted order. 
The problem should be done in place (in other words, do not build a 
copy of the input array).

Examples:

separatePositive([2, -1, -3, 6, -8, 10]) // [2, 10, 6, -3, -1, -8]
separatePositive([5, 10, -15, 20, 25]) // [5, 10, 25, 20, -15]
separatePositive([-5, 5]) // [5, -5]
separatePositive([1, 2, 3]) // [1, 2, 3]
Constraints

Time Complexity: O(N)
*/
function separatePositive (arr) {
	let left = 0;
	let right = arr.length - 1;

	while (left < right) {
		if (arr[left] < 0 && arr[right] > 0) {
			[ arr[left], arr[right] ] = [ arr[right], arr[left] ];
			left++;
			right--;
		} else {
			if (arr[left] > 0) left++;
			else right--;
		}
	}

	return arr;
}
