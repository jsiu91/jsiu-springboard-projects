/** product: calculate the product of an array of numbers. */
// product([2, 3, 4])   // 24

function product (nums) {
	//base case
	if (nums.length === 0) return 1;

	return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */
// longest(["hello", "hi", "hola"])  // 5

function longest (words) {
	let longest = 0;

	function _longest (words, i) {
		if (words.length === i) return;
		if (words[i].length > longest) longest = words[i].length;
		_longest(words, i + 1);
	}

	_longest(words, 0);
	return longest;
}

/** everyOther: return a string with every other letter. */
// everyOther("hello")  // "hlo"

function everyOther (str) {
	let result = '';

	function _everyOther (str, i) {
		if (str.length === i) return;
		if (i % 2 === 0) result += str[i];
		_everyOther(str, i + 1);
	}

	_everyOther(str, 0);
	return result;
}

/** isPalindrome: checks whether a string is a palindrome or not. */
// isPalindrome("tacocat")  // true
// isPalindrome("tacodog")  // false

function isPalindrome (str) {
	let revertedStr = '';

	function reversedString (str, i) {
		if (i === -1) return;
		revertedStr += str[i];
		reversedString(str, i - 1);
	}

	reversedString(str, str.length - 1);
	return revertedStr === str;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */
// let animals = ["duck", "cat", "pony"];

// findIndex(animals, "cat");  // 1
// findIndex(animals, "porcupine");   // -1

function findIndex (arr, val) {
	let index = -1;

	function _findIndex (arr, i) {
		if (arr.length === i) return;
		if (arr[i] === val) {
			index = i;
			return;
		}
		_findIndex(arr, i + 1);
	}

	_findIndex(arr, 0);
	return index;
}

/** revString: return a copy of a string, but in reverse. */
// revString("porcupine") // 'enipucrop'

function revString (str) {
	let rs = '';

	function _revString (str, i) {
		if (i === -1) return;
		rs += str[i];
		_revString(str, i - 1);
	}

	_revString(str, str.length - 1);
	return rs;
}

/** gatherStrings: given an object, return an array of all of the string values. */
/*
    let nestedObj = {
    firstName: "Lester",
    favoriteNumber: 22,
    moreData: {
        lastName: "Testowitz"
    },
    funFacts: {
        moreStuff: {
        anotherNumber: 100,
        deeplyNestedString: {
            almostThere: {
            success: "you made it!"
            }
        }
        },
        favoriteString: "nice!"
    }
    };

    gatherStrings(nestedObj) // ["Lester", "Testowitz", "you made it!", "nice!"];
*/
function gatherStrings (obj) {
	let arrayStrings = [];
	for (let key in obj) {
		if (typeof obj[key] === 'string') arrayStrings.push(obj[key]);
		if (typeof obj[key] === 'object') arrayStrings.push(...gatherStrings(obj[key]));
	}
	return arrayStrings;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch (arr, val, left = 0, right = arr.length) {
	if (left > right) {
		return -1;
	}
	let middle = Math.floor((right + left) / 2);
	if (arr[middle] === val) {
		return middle;
	}
	if (arr[middle] > val) {
		return binarySearch(arr, val, left, middle - 1);
	}
	return binarySearch(arr, val, middle + 1, right);
}

module.exports = {
	product,
	longest,
	everyOther,
	isPalindrome,
	findIndex,
	revString,
	gatherStrings,
	binarySearch,
};
