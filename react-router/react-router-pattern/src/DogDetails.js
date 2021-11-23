import React from 'react';
import { useParams } from 'react-router-dom';

function DogDetails ({ dogs }) {
	const { name } = useParams();

	const currentDog = dogs.find((dog) => dog.name.toLowerCase() === name.toLowerCase());

	return (
		<div>
			<ul>
				<li>name: {currentDog.name}</li>
				<li>age: {currentDog.age}</li>
				<img src={currentDog.src} alt={currentDog.src} />
				<ul>
					Facts:{currentDog.facts.map((fact) => {
						return <li>{fact}</li>;
					})}
				</ul>
			</ul>
		</div>
	);
}

export default DogDetails;
