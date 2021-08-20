const fs = require('fs');
const input = process.argv[2];

function cat (path) {
	fs.readFile(`${path}`, 'utf8', function (err, data) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
		console.log(`${data}`);
	});
}

cat(input);
