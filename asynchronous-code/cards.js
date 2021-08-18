let deckRemain = 0;
let deckCards = [];

function getCard (e) {
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
		axios
			.get(`http://deckofcardsapi.com/api/deck/new/draw/?count=52`)
			.then((d) => {
				deckRemain = 51;
				deckCards = d.data.cards;
				$('#results').append(`<img src=${deckCards[deckRemain].image}>`);
			})
			.catch((err) => console.log(err));
	}
}
$('#btn-card').on('click', getCard);
