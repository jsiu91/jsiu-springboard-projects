/** Common config for bookstore. */

const DB_URI = process.env.NODE_ENV === 'test' ? 'postgresql:///books_test' : 'postgresql:///books';

module.exports = { DB_URI };
