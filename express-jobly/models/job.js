'use strict';

const db = require('../db');
const { BadRequestError, NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

/** Related functions for jobs. */

class Job {
	/** Create a job (from data), update db, return new jobs data.
   *
   * data should be { title, salary, equity, company_handle }
   *
   * Returns { id, title, salary, equity, company_handle }
   *
   * Throws BadRequestError if job already in database.
   * */

	static async create ({ title, salary, equity, companyHandle }) {
		const result = await db.query(
			`INSERT INTO jobs
            (title, salary, equity, company_handle)
            VALUES ($1, $2, $3, $4)
            RETURNING id, title, salary, equity, company_handle AS "companyHandle"`,
			[ title, salary, equity, companyHandle ]
		);
		const job = result.rows[0];

		return job;
	}

	/** Find all jobs.
   *
   * Returns [{ id, title, salary, equity, company_handle }, ...]
   * */

	static async findAll (filters = {}) {
		let query = `SELECT j.id,
                            j.title, 
                            j.salary, 
                            j.equity, 
                            j.company_handle AS "companyHandle",
                            c.name As "companyName"
                     FROM jobs j
                     LEFT JOIN companies As c ON c.handle=j.company_handle`;

		let whereClauses = [];
		let queryValues = [];

		const { title, minSalary, hasEquity } = filters;

		if (minSalary !== undefined) {
			queryValues.push(minSalary);
			whereClauses.push(`salary >= $${queryValues.length}`);
		}

		if (hasEquity === true) {
			queryValues.push(0);
			whereClauses.push(`equity > $${queryValues.length}`);
		}

		if (title) {
			queryValues.push(`%${title.toLowerCase()}%`);
			whereClauses.push(`lower(title) LIKE $${queryValues.length}`);
		}

		if (whereClauses.length > 0) {
			query += ` WHERE ` + whereClauses.join(' AND ');
		}

		query += ' ORDER BY title';

		const jobsRes = await db.query(query, queryValues);
		return jobsRes.rows;
	}

	/** Given a jobs id, return data about the job.
   *
   * Returns { id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   **/

	static async get (id) {
		const jobRes = await db.query(
			`SELECT id, 
                    title, 
                    salary, 
                    equity, 
                    company_handle as "companyHandle"
           FROM jobs
           WHERE id = $1`,
			[ id ]
		);

		const job = jobRes.rows[0];

		if (!job) throw new NotFoundError(`No job: ${id}`);

		// const companyRes = await db.query(
		// 	`SELECT handle,
		//             name,
		//             description,
		//             num_employees AS "numEmployees",
		//             logo_url AS "logoUrl"
		//     FROM companies
		//     WHERE handle = $1`,
		// 	[ job.companyHandle ]
		// );

		// delete job.companyHandle;
		// job.company = companyRes.rows[0];

		return job;
	}

	/** Update jobs data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain all the
   * fields; this only changes provided ones.
   *
   * Data can include: {title, salary, equity}
   *
   * Returns {id, title, salary, equity, company_handle}
   *
   * Throws NotFoundError if not found.
   */

	static async update (id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {});
		const idVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE jobs 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id,
                                title,
                                salary, 
                                equity, 
                                company_handle as "companyHandle"`;
		const result = await db.query(querySql, [ ...values, id ]);
		const job = result.rows[0];

		if (!job) throw new NotFoundError(`No job: ${job}`);

		return job;
	}

	/** Delete given jobs from database; returns undefined.
   *
   * Throws NotFoundError if job not found.
   **/

	static async remove (id) {
		const result = await db.query(
			`DELETE
           FROM jobs
           WHERE id = $1
           RETURNING id`,
			[ id ]
		);
		const job = result.rows[0];

		if (!job) throw new NotFoundError(`No job: ${id}`);
	}
}

module.exports = Job;
