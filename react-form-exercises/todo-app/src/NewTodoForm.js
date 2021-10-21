import React, { useState } from 'react';
const { uuid } = require('uuidv4');

const NewTodoForm = ({ addTodo }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		addTodo(formData.input, uuid());
		setFormData({ input: '' });
	};
	const [ formData, setFormData ] = useState({
		input: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({
			...fData,
			[name]: value,
		}));
	};
	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="input">To-do:</label>
			<input id="input" name="input" value={formData.input} onChange={handleChange} />
			<button>Add todo!</button>
		</form>
	);
};

export default NewTodoForm;
