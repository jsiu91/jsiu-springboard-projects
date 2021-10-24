import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import axios from 'axios';

const DeckCards = () => {
	const [ deck, setDeck ] = useState(null);
	const [ cards, setCards ] = useState([]);
	const [ draw, setDraw ] = useState(false);
	const timer = useRef();

	useEffect(
		function fetchDeckAtMount () {
			async function fetchDeck () {
				const res = await axios.get(`http://deckofcardsapi.com/api/deck/new/`);
				const resShuffleDeck = await axios.get(
					`http://deckofcardsapi.com/api/deck/${res.data.deck_id}/shuffle`
				);
				setDeck(resShuffleDeck.data);
			}
			fetchDeck();
		},
		[ setDeck ]
	);

	useEffect(
		() => {
			async function drawCard () {
				let { deck_id } = deck;
				try {
					const cardRes = await axios.get(
						`http://deckofcardsapi.com/api/deck/${deck_id}/draw/`
					);

					if (cardRes.data.remaining === 0) {
						setDraw(false);
						return alert('Error: no cards remaining!');
					}

					const card = cardRes.data.cards[0];

					setCards((d) => [
						...d,
						{
							id: card.code,
							name: `${card.suit} ${card.value}`,
							image: card.image,
						},
					]);
				} catch (e) {
					alert(e);
				}
			}

			if (draw && timer)
				timer.current = setInterval(async () => {
					await drawCard();
				}, 1000);

			return function stopDrawing () {
				clearInterval(timer.current);
				timer.current = false;
			};
		},
		[ draw, setDraw, deck ]
	);

	const deckResult = cards.map((c) => <Card key={c.id} name={c.name} image={c.image} />);

	const toggleDraw = () => {
		setDraw((draw) => !draw);
	};

	return (
		<div>
			<div>
				{draw ? (
					<button onClick={toggleDraw}>Stop drawing</button>
				) : (
					<button onClick={toggleDraw}>Start drawing</button>
				)}
			</div>
			<div className="deck-result" />
			{deckResult}
		</div>
	);
};

export default DeckCards;
