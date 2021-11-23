import React from 'react';
import { Link } from 'react-router-dom';
import './ColorList.css';

function ColorList ({ colors }) {
	return (
		<div className="selection-menu">
			Please select a color.
			{Object.keys(colors).map((color) => (
				<li>
					<Link to={`/colors/${color}`}>{color}</Link>
				</li>
			))}
		</div>
	);
}

export default ColorList;
