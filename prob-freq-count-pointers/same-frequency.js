// add whatever parameters you deem necessary
/*
sameFrequency
Write a function called sameFrequency. 
Given two positive integers, find out if the two numbers have the same frequency of digits.

Examples:

sameFrequency(182,281) // true
sameFrequency(34,14) // false
sameFrequency(3589578, 5879385) // true
sameFrequency(22,222) // false

Constraints
Time Complexity - O(N + M) N-first number M-second number
Space Complexity - O(1)

*/

function sameFrequency (num1, num2) {
	//convert the number to string
	let string1 = num1.toString(); // 182 - "182"
	let string2 = num2.toString(); // 281 - "281"

	//edge case
	if (string1.length !== string2.length) return false;

	//create obj for first number, create obj for second number
	let obj1 = {};
	let obj2 = {};

	//store in  obj key-number value-repetitions
	for (let n of string1) {
		obj1[n] = obj1[n] + 1 || 1;
	}

	//obj1 = {"1": 1, "8":1 , "2":1}

	for (let n of string2) {
		obj2[n] = obj2[n] + 1 || 1;
	}

	//obj2 = {"2": 1, "8":1 , "1":1}

	for (let key in obj1) {
		//if doesn't have the key in second obj return false
		if (!obj2[key]) return false;
		//if the repetitions are different return false
		if (obj1[key] !== obj2[key]) return false;
	}

	// return true
	return true;
}

// function sameFrequency (num1, num2) {
// 	const string1 = num1.toString();
// 	const string2 = num2.toString();

// 	if (string1.length !== string2.length) return false;

// 	for (let i = 0; i < string1.length; i++) {
// 		if (!string2.includes(string1[i])) {
// 			return false;
// 		}
// 	}

// 	return true;
// }
