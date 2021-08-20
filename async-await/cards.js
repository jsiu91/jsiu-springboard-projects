const baseURL = 'http://deckofcardsapi.com/api';
let deckRemain = 0;
let deckCards = [];

async function getCard (e) {
	e.preventDefault();

	let angle = Math.random() * 90 - 45;
	let randomX = Math.random() * 40 - 20;
	let randomY = Math.random() * 40 - 20;

	if (deckRemain !== 0) {
		deckRemain--;
		$('#results').append(
			$('<img>', {
				src: deckCards[deckRemain].image,
				css: {
					transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
				},
			})
		);
		if (deckRemain === 0) {
			$('#btn-card').hide();
		}
	} else {
		const d = await axios.get(`${baseURL}/deck/new/draw/?count=52`);
		deckRemain = 51;
		deckCards = d.data.cards;
		$('#results').append(`<img src=${deckCards[deckRemain].image}>`);
	}
}

$('#btn-card').on('click', getCard);
