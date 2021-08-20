const fs = require('fs');
const input = process.argv[2];
const axios = require('axios');

function cat (path) {
	fs.readFile(`${path}`, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(`${data}`);
	});
}

async function webCat (path) {
	const res = await axios.get(path);
	console.log(res.data);
}

if (input.slice(-4) === '.txt') {
	cat(input);
} else {
	webCat(input);
}
