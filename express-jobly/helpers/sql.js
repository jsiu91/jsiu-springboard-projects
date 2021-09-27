const { BadRequestError } = require('../expressError');

// Converts a JS Object into a partial values SET for a SQL Query

function sqlForPartialUpdate (dataToUpdate, jsToSql) {
	const keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError('No data');

	// {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`);

	// {setCols:  ['"first_name"=$1', '"age"=$2'],
	//  values: ['Aliya', 32]}
	return {
		setCols: cols.join(', '),
		values: Object.values(dataToUpdate),
	};
}

module.exports = { sqlForPartialUpdate };
