import React from 'react';
import { Link } from 'react-router-dom';
import chips from './images/chips.jpg';

function Chips () {
	return (
		<div>
			<img src={chips} alt="Chips" />
			<h1>Check out all these Chips!!</h1>
			<h1>
				<Link to="/">Back Home</Link>
			</h1>
		</div>
	);
}

export default Chips;
