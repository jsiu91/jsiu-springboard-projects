const baseURL = 'http://numbersapi.com';

async function getNumber () {
	const res = await axios.get(`${baseURL}/42?json`);
	$('#results').append(`<p>${res.data.text}</p>`);
	const res2 = await axios.get(`${baseURL}/57?json`);
	$('#results').append(`<p>${res2.data.text}</p>`);
	const res3 = await axios.get(`${baseURL}/69?json`);
	$('#results').append(`<p>${res3.data.text}</p>`);
}

async function getFacts () {
	const f1 = await axios.get(`${baseURL}/37/trivia?json`);
	$('#results').append(`<p>${f1.data.text}</p>`);
	const f2 = await axios.get(`${baseURL}/37?json`);
	$('#results').append(`<p>${f2.data.text}</p>`);
	const f3 = await axios.get(`${baseURL}/37?json`);
	$('#results').append(`<p>${f3.data.text}</p>`);
	const f4 = await axios.get(`${baseURL}/37?json`);
	$('#results').append(`<p>${f4data.text}</p>`);
}

$('#btn-numbers').on('click', getNumber);
$('#btn-facts').on('click', getFacts);
