import React from 'react';

function DogList ({ dogs }) {
	return (
		<div>
			{dogs.map((dog) => {
				return (
					<ul>
						<li>name: {dog.name}</li>
						<li>age: {dog.age}</li>
						<img src={dog.src} alt={dog.src} />
						<ul>
							Facts:{dog.facts.map((fact) => {
								return <li>{fact}</li>;
							})}
						</ul>
					</ul>
				);
			})}
		</div>
	);
}

export default DogList;
