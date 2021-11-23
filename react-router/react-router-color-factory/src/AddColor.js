import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AddColor.css';

function AddColor ({ addColor }) {
	const [ form, updateForm ] = useState({ name: '', color: '#ffffff' });
	const history = useHistory();

	function handleChange (e) {
		e.persist();
		updateForm((f) => ({ ...f, [e.target.name]: e.target.value }));
	}

	function handleSubmit (e) {
		e.preventDefault();
		addColor({ [form.name]: form.color });
		history.push('/colors');
	}

	const { color, name } = form;

	return (
		<div className="add-color">
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="name">Color name:</label>
					<input
						id="name"
						name="name"
						placeholder="Enter color name"
						onChange={handleChange}
						value={name}
					/>
				</div>
				<div>
					<label htmlFor="color">Color value:</label>
					<input
						id="color"
						name="color"
						onChange={handleChange}
						value={color}
						type="color"
					/>
				</div>
				<div className="col">
					<button type="Submit">Add this color</button>
				</div>
			</form>
		</div>
	);
}

export default AddColor;
