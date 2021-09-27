const { sqlForPartialUpdate } = require('./sql');

const d1 = {
	firstName: 'Eric',
	lastName: 'Wong',
	age: 33,
};

const d2 = {
	companyName: 'Google',
	companyEmployees: 500,
};

describe('Convert JS Object into SQL', () => {
	test('Check return values from d1', () => {
		const res = sqlForPartialUpdate(d1, {
			firstName: 'first_name',
			lastName: 'last_name',
			age: 'age',
		});
		expect(res.setCols).toEqual(`"first_name"=$1, "last_name"=$2, "age"=$3`);

		expect(res.values).toEqual([ 'Eric', 'Wong', 33 ]);
	});

	test('Check return values from d2', () => {
		const res = sqlForPartialUpdate(d2, {
			companyName: 'company_name',
			companyEmployees: 'company_employees',
		});
		expect(res.setCols).toEqual(`"company_name"=$1, "company_employees"=$2`);
		expect(res.values).toEqual([ 'Google', 500 ]);
	});
});
