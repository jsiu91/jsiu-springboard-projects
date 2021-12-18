function guessingGame () {
	let countGuesses = 0;
	const randomNumber = Math.floor(Math.random() * 100);
	let gameState = true;

	return function (guess) {
		if (!gameState) return 'The game is over, you already won!';
		countGuesses++;
		if (guess < randomNumber) {
			return `${guess} is too low!`;
		}
		if (guess > randomNumber) {
			return `${guess} is too high!`;
		} else {
			gameState = false;
			return `You win! You found ${randomNumber} in ${countGuesses} guesses.`;
		}
	};
}

module.exports = { guessingGame };
