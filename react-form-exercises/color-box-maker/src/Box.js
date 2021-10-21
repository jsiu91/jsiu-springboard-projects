import React from 'react';
import './Box.css';

const Box = ({ color, width, height, id, removeBox }) => {
	const remove = () => removeBox(id);
	return (
		<div>
			<div
				className="Box"
				style={{
					backgroundColor: color,
					width: `${width}px`,
					height: `${height}px`,
				}}
			/>
			<button onClick={remove}>X</button>
		</div>
	);
};

export default Box;
