// add whatever parameters you deem necessary

function constructNote (message, letters) {
	const msgObj = addLettersToObj(message);
	const letObj = addLettersToObj(letters);

	for (let key in msgObj) {
		if (!letObj[key]) return false;
		if (letObj[key] < msgObj[key]) return false;
	}

	return true;
}

function addLettersToObj (str) {
	let obj = {};

	for (let c of str) {
		obj[c] = obj[c] + 1 || 1;
	}

	return obj;
}
