// add whatever parameters you deem necessary
/*
isSubsequence
Write a function called isSubsequence which takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, without their order changing.

Examples:

isSubsequence('hello', 'hello world'); // true
isSubsequence('sing', 'sting'); // true
isSubsequence('abc', 'abracadabra'); // true
isSubsequence('abc', 'acb'); // false (order matters)
Constraints:

Time Complexity - O(N + M)
*/
function isSubsequence (str1, str2) {
	let str1Idx = 0;
	let str2Idx = 0;

	if (!str1) return true;

	for (str2Idx; str2Idx < str2.length; str2Idx++) {
		if (str2[str2Idx] === str1[str1Idx]) str1Idx++;
		if (str1Idx === str1.length) return true;
	}

	return false;
}
