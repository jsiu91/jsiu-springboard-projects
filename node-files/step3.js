const fs = require('fs');
let input = process.argv[2];
let output;
const axios = require('axios');

function writeOutput (data, output) {
	if (output) {
		fs.writeFile(output, data, 'utf8', function (err) {
			if (err) {
				console.log(err);
				process.exit(1);
			} else {
				console.log(data);
			}
		});
	} else {
		console.log(data);
	}
}

function cat (path, output) {
	fs.readFile(`${path}`, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			process.exit(1);
		} else {
			writeOutput(data, output);
		}
	});
}

async function webCat (path, output) {
	try {
		const res = await axios.get(path);
		writeOutput(res.data, output);
	} catch (e) {
		console.log(e);
		process.exit(1);
	}
}

if (process.argv[2] === '--out') {
	output = process.argv[3];
	input = process.argv[4];
}

if (input.slice(-4) === '.txt') {
	cat(input, output);
} else {
	webCat(input, output);
}
