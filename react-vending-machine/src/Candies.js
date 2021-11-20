import React from 'react';
import { Link } from 'react-router-dom';
import candies from './images/candies.jpg';

function Candies () {
	return (
		<div>
			<img src={candies} alt="Candies" />
			<h1>Feeling Hungry?</h1>
			<h1>
				<Link to="/">Back Home</Link>
			</h1>
		</div>
	);
}

export default Candies;
