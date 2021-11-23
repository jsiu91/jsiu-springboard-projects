import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ColorDetails.css';

function ColorDetails (props) {
	const { color } = useParams();
	return (
		<div className="Color" style={{ backgroundColor: color }}>
			<h1>This is {color.toLowerCase()}.</h1>
			<p>
				<Link to="/">Go Back</Link>
			</p>
		</div>
	);
}

export default ColorDetails;
