class BoggleBoard {
	constructor (boardId, seconds = 60) {
		this.score = 0;
		this.seconds = seconds;
		this.showTimer(this.seconds);
		this.words = new Set();
		this.board = $('#' + boardId);

		$('#submit-form').on('submit', this.handleSubmit.bind(this));
	}

	showWord (word) {
		$('#words').append($('<li>', { text: word }));
	}

	showScore () {
		$('#score').text(this.score);
	}

	async handleSubmit (e) {
		e.preventDefault();

		// Check if there is a value in the input
		let guess = $('#guess').val();
		if (!guess) return;

		// Check if word is in Set and avoid duplicates
		if (this.words.has(guess)) {
			alert(`${guess} is Already Found!`);
			return;
		}
		// Request data from Flask to see if the word exists
		const res = await axios.get('/guess-word', { params: { guess: guess } });
		if (res.data.result === 'not-word') {
			alert(`${guess} is not a word. Enter a valid word`);
		} else if (res.data.result === 'not-on-board') {
			alert(`${guess} is not on board`);
		} else {
			alert('Good Guess!');
			this.words.add(guess);
			this.showWord(guess);
			this.score += guess.length;
			this.showScore(guess);
		}
	}

	async showTimer (time) {
		let ticks = setInterval(() => {
			// Tick down the time
			time -= 1;

			// When timer runs out of time
			if (time === 0) {
				clearInterval(ticks);
				alert(`GAME OVER! Your score is: ${this.score}`);
				$('#guess').prop('disabled', true);
				this.gameOver();
			}
			// Show timer
			$('#timer').text(time);
		}, 1000);
	}

	async gameOver () {
		//Send data to the server
		const res = await axios.post('/done', { score: this.score });
		if (res.data.newRecord) {
			alert(`New record: ${this.score}`);
		} else {
			alert(`Final score: ${this.score}`);
		}
	}
}
