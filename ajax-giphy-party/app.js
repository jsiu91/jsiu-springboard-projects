console.log("Let's get this party started!");

const form = document.querySelector('#searchForm');

form.addEventListener('submit', function (e) {
	e.preventDefault();
	const term = $(searchBox).val();
	getGiphy(term);
});

async function getGiphy (searchTerm) {
	const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
		params: {
			api_key: 'WCoXB0Us87EF9EMkanO2f1hf8vLYF5iQ',
			q: `${searchTerm}`,
		},
	});
	createRandomGif(res.data);
}

function createRandomGif (res) {
	let randomImg = Math.round(Math.random() * res.data.length);
	let image = document.createElement('img');
	image.src = res.data[randomImg].images.downsized.url;
	$('#gifs').append(image);
}

$('#remove').on('click', function (e) {
	e.preventDefault();
	$('#gifs').empty();
});
