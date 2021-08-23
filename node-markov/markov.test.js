const { MarkovMachine } = require('./markov');

describe('constructor', function () {
	let mm;

	beforeEach(function () {
		mm = new MarkovMachine('the cat in the hat');
	});

	test('check array words', function () {
		expect(mm.words).toContain('cat');
		expect(mm.words).toContain('in');
		expect(mm.words).toContain('hat');
	});

	test('check number of words in array', function () {
		expect(mm.words.length).toBe(5);
	});

	test('check array type', function () {
		let wordsLen = mm.words.length;
		expect(mm.words[0]).toEqual(expect.any(String));
		expect(mm.words[wordsLen - 1]).toEqual(expect.any(String));
	});

	test('check chains function result', () => {
		const res = new Map([
			[ 'the', [ 'cat', 'hat' ] ],
			[ 'cat', [ 'in' ] ],
			[ 'in', [ 'the' ] ],
			[ 'hat', [ null ] ],
		]);
		expect(mm.chains).toEqual(res);
	});
});
