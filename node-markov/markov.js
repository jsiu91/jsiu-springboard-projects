/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor (text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains () {
		let chains = new Map();

		for (let i = 0; i < this.words.length; i++) {
			let word = this.words[i];
			let nextWord = this.words[i + 1] || null;

			if (chains.has(word)) {
				chains.get(word).push(nextWord);
			} else {
				chains.set(word, [ nextWord ]);
			}
		}

		this.chains = chains;
	}

	/** return random text from chains */

	static choice (array) {
		return array[Math.floor(Math.random() * array.length)];
	}

	makeText (numWords = 100) {
		let keys = Array.from(this.chains.keys());
		let key = MarkovMachine.choice(keys);
		let res = [];

		while (res.length < numWords && key != null) {
			res.push(key);
			key = MarkovMachine.choice(this.chains.get(key));
		}
		return res.join(' ');
	}
}

module.exports = {
	MarkovMachine,
};
