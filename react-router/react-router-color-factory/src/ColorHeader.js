import React from 'react';
import { Link } from 'react-router-dom';
import './ColorHeader.css';

function ColorHeader () {
	return (
		<div className="App-header">
			Welcome to the color factory.
			<Link to={'/colors/new'}>Add a color</Link>
		</div>
	);
}

export default ColorHeader;
