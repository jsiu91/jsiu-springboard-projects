import React from 'react';
import { Link } from 'react-router-dom';
import image from './images/vendingmachine.jpg';
import './VendingMachine.css';

function VendingMachine () {
	return (
		<div className="VendingMachine" style={{ backgroundImage: `url(${image})` }}>
			<h1>Hello I am a Vending Machine. What would you like to eat?</h1>
			<h2>
				<Link to="/soda">soda</Link>
			</h2>
			<h2>
				<Link to="/chips">chips</Link>
			</h2>
			<h2>
				<Link to="/candies">candies</Link>
			</h2>
		</div>
	);
}

export default VendingMachine;
