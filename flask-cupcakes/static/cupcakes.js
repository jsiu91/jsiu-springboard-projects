const BASE_URL = 'http://127.0.0.1:5000';

async function getCupcakesData () {
	const res = await axios.get(`${BASE_URL}/api/cupcakes`);

	return res.data.cupcakes;
}

async function createCupcakesHTML () {
	for (cupcake of await getCupcakesData()) {
		$('#cupcakes').append(`<div data-cupcake-id=${cupcake.id}>
            <li>${cupcake.flavor} | ${cupcake.size} | ${cupcake.rating} 
            - <button class="delete-button">X</button>
            </li>
            <img class="cupcake-img" src="${cupcake.image}" alt="cupcake-image" 
            style="max-width: 200px; max-height=200px;">
        </div>`);
	}
}

$('#form-new-cupcake').on('submit', async function (e) {
	e.preventDefault();

	let flavor = $('#form-flavor').val();
	let size = $('#form-size').val();
	let rating = $('#form-rating').val();
	let image = $('#form-image').val();

	await axios.post(`${BASE_URL}/api/cupcakes`, { flavor, size, rating, image });

	createCupcakesHTML();
	$('#form-new-cupcake').trigger('reset');
});

$('#cupcakes').on('click', '.delete-button', async function (e) {
	e.preventDefault();
	let $cupcake = $(e.target).closest('div');
	let cupcakeId = $cupcake.attr('data-cupcake-id');

	await axios.delete(`${BASE_URL}/api/cupcakes/${cupcakeId}`);
	$cupcake.remove();
});

createCupcakesHTML();
