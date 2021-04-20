// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
const NUM_CATEGORIES = 6;
const NUM_QUESTIONS_PER_CAT = 5;
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds () {
	const idList = [];
	const random = Math.round(Math.random() * 100);
	const res = await axios.get('http://jservice.io/api/categories', {
		params: { count: NUM_CATEGORIES, offset: random },
	});

    for(let cat of res.data) {
		idList.push(cat.id);
	}

	return idList;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory (catId) {
	const clues = [];
	const res = await axios.get('http://jservice.io/api/category', { params: { id: `${catId}` } });

	for (let clue of res.data.clues) {
		clues.push({
			question: clue.question,
			answer: clue.answer,
			showing: null,
		});
	}
	return clues;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable () {
	// create jeopardy table
	const table = document.createElement('table');
	table.setAttribute('id', 'jeopardy');

	// jeopardy table head
	const thead = document.createElement('thead');
	const headRow = document.createElement('tr');

	for (let x = 0; x < NUM_CATEGORIES; x++) {
		const th = document.createElement('th');
		th.innerText = x;
		headRow.append(th);
	}
	thead.append(headRow);
	table.append(thead);

	//jeopardy table body
	const tbody = document.createElement('tbody');

	for (let y = 0; y < NUM_QUESTIONS_PER_CAT; y++) {
		const bodyRow = document.createElement('tr');

		for (let x = 0; x < NUM_CATEGORIES; x++) {
			const td = document.createElement('td');
			td.setAttribute('id', `${y}-${x}`);
			td.addEventListener('click', function () {
				console.log('YOU CLICKED');
			});
			td.innerText = '?';
			bodyRow.append(td);
		}
		tbody.append(bodyRow);
	}
	table.append(tbody);

	//jeopardy table add to body
	document.body.prepend(table);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick (evt) {}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView () {}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView () {}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart () {}

/** On click of start / restart button, set up game. */

// TODO
fillTable();

/** On page load, add event handler for clicking clues */

// TODO
// 