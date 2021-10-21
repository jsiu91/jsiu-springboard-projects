import React, { useState } from 'react';
const { uuid } = require('uuidv4');

const NewBoxForm = ({ addBox }) => {
	const handleSubmit = (e) => {
		e.preventDefault();
		addBox(formData.color, formData.width, formData.height, uuid());
		setFormData({ color: '', width: '', height: '' });
	};

	const [ formData, setFormData ] = useState({
		color: '',
		width: '',
		height: '',
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
			<label htmlFor="color">Color:</label>
			<input id="color" name="color" value={formData.color} onChange={handleChange} />

			<label htmlFor="width">Width:</label>
			<input id="width" name="width" value={formData.width} onChange={handleChange} />

			<label htmlFor="height">Height:</label>
			<input id="height" name="height" value={formData.height} onChange={handleChange} />
			<button>Add new box!</button>
		</form>
	);
};

export default NewBoxForm;
