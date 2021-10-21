import React, { useState } from 'react';
import Box from './Box';
import NewBoxForm from './NewBoxForm';

const BoxList = () => {
	const [ boxes, setBoxes ] = useState([]);

	const addBox = (color, width, height, id) => {
		setBoxes((boxes) => [ ...boxes, { color, width, height, id } ]);
	};

	const removeBox = (id) => {
		setBoxes((boxes) => boxes.filter((b) => b.id !== id));
	};

	return (
		<div>
			<NewBoxForm addBox={addBox} />
			{boxes.map(({ color, width, height, id }) => (
				<Box
					color={color}
					width={width}
					height={height}
					key={id}
					id={id}
					removeBox={removeBox}
				/>
			))}
		</div>
	);
};

export default BoxList;
