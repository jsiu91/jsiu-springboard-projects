import React from 'react';
import { Link } from 'react-router-dom';
import soda from './images/soda.jpg';

function Soda () {
	return (
		<div>
			<img src={soda} alt="Soda" />
			<h1>Feeling Thristy! Drink this refreshing soda!</h1>
			<h1>
				<Link to="/">Back Home</Link>
			</h1>
		</div>
	);
}

export default Soda;
