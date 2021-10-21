import React from 'react';

const Todo = ({ input, id, remove }) => {
	const handleDelete = () => {
		remove(id);
	};

	return (
		<div className="todo">
			{input}
			<button onClick={handleDelete}>X</button>
		</div>
	);
};

export default Todo;
