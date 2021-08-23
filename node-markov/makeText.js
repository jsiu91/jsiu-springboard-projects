/** Command-line tool to generate Markov text. */
const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function generateText (text) {
	let newMarkov = new markov.MarkovMachine(text);
	console.log(newMarkov);
}

function makeText (path) {
	fs.readFile(path, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}

async function makeURLText (url) {
	let res;
	try {
		res = await axios.get(url);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
	generateText(res.data);
}

let [ method, path ] = process.argv.slice(2);

if (method === 'file') {
	makeText(path);
} else if (method === 'url') {
	makeURLText(path);
} else {
	console.log(`Unknown method: ${method}`);
	process.exit(1);
}
