const baseURL = 'http://numbersapi.com';

function getNumber () {
	let numbers = [];

	axios
		.get(`${baseURL}/42?json`)
		.then((res) => {
			$('#results').append(`<p>${res.data.text}</p>`);
			return axios.get(`${baseURL}/43?json`);
		})
		.then((res2) => {
			$('#results').append(`<p>${res2.data.text}</p>`);
			return axios.get(`${baseURL}/69?json`);
		})
		.then((res3) => {
			$('#results').append(`<p>${res3.data.text}</p>`);
		})
		.catch((err) => console.log(err));
}

function getFacts () {
	axios
		.get(`${baseURL}/37/trivia?json`)
		.then((f1) => {
			$('#results').append(`<p>${f1.data.text}</p>`);
			return axios.get(`${baseURL}/37?json`);
		})
		.then((f2) => {
			$('#results').append(`<p>${f2.data.text}</p>`);
			return axios.get(`${baseURL}/37?json`);
		})
		.then((f3) => {
			$('#results').append(`<p>${f3.data.text}</p>`);
			return axios.get(`${baseURL}/37?json`);
		})
		.then((f4) => {
			$('#results').append(`<p>${f4.data.text}</p>`);
		})
		.catch((err) => console.log(err));
}

$('#btn-numbers').on('click', getNumber);
$('#btn-facts').on('click', getFacts);
