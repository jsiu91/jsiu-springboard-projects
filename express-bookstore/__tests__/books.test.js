process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('../app');
const db = require('../db');
const Book = require('../models/book');

let testBook;

beforeEach(async () => {
	await db.query(`DELETE FROM books`);
	let b = await Book.create({
		isbn: '0691161518',
		amazon_url: 'http://a.co/eobPtX2',
		author: 'Matthew Lane',
		language: 'english',
		pages: 264,
		publisher: 'Princeton University Press',
		title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
		year: 2017,
	});

	testBook = b;
});

describe('GET /books', () => {
	/** GET / => {books: [book, ...]}  */
	test('Gets a list of books', async () => {
		const res = await request(app).get(`/books`);
		const books = res.body.books;
		expect(res.status).toEqual(200);
		expect(books[0]).toHaveProperty('isbn');
		expect(books[0]).toHaveProperty('amazon_url');
	});
});

describe('GET /:isbn', () => {
	/** GET /[id]  => {book: book} */
	test('Gets a single book', async () => {
		const res = await request(app).get(`/books/${testBook.isbn}`);
		expect(res.body.book).toHaveProperty('isbn');
		expect(res.body.book.isbn).toBe(testBook.isbn);
	});
});

describe('POST /books', () => {
	/** POST /   bookData => {book: newBook}  */
	test('Adds a single book', async () => {
		const res = await request(app).post(`/books`).send({
			isbn: '32794782',
			amazon_url: 'https://taco.com',
			author: 'mctest',
			language: 'english',
			pages: 1000,
			publisher: 'yeah right',
			title: 'amazing times',
			year: 2000,
		});
		expect(res.statusCode).toBe(201);
		expect(res.body.book).toHaveProperty('isbn');
	});

	test('Prevents creating book without required title', async () => {
		const res = await request(app).post(`/books`).send({
			year: 2000,
		});
		expect(res.statusCode).toBe(400);
	});
});

describe('PUT /books/:isbn', () => {
	/** PUT /[isbn]   bookData => {book: updatedBook}  */
	test('Updates a single book if isbn matches', async () => {
		const res = await request(app).put(`/books/${testBook.isbn}`).send({
			amazon_url: 'http://a.co/eobPtX2',
			author: 'Matthew Lane',
			language: 'english',
			pages: 264,
			publisher: 'Harvard University',
			title: 'Power-Up: Unlocking the Hidden Mathematics in Video Games',
			year: 2019,
		});
		expect(res.body.book).toHaveProperty('isbn');
		expect(res.body.publisher).toBe('Harvard University');
	});

	test('Prevents a bad book update', async function () {
		const response = await request(app).put(`/books/${testBook.isbn}`).send({
			isbn: '32794782',
			badField: 'DO NOT ADD ME!',
			amazon_url: 'https://taco.com',
			author: 'mctest',
			language: 'english',
			pages: 1000,
			publisher: 'yeah right',
			title: 'UPDATED BOOK',
			year: 2000,
		});
		expect(response.statusCode).toBe(400);
	});
});

describe('DELETE /books/:id', function () {
	/** DELETE /[isbn]   => {message: "Book deleted"} */
	test('Deletes a single a book', async function () {
		const response = await request(app).delete(`/books/${testBook.isbn}`);
		expect(response.body).toEqual({ message: 'Book deleted' });
	});
});

afterEach(async function () {
	await db.query('DELETE FROM BOOKS');
});

afterAll(async function () {
	await db.end();
});
