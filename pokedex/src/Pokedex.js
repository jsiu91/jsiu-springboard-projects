import React from 'react';
import Pokecard from './Pokecard';
import './Pokedex.css';

const Pokedex = ({ items }) => {
	return (
		<div className="Pokedex">
			<h2 className="Pokedex-title">Pokedex</h2>
			<div className="Pokedex-cards">
				{items.map((p) => (
					<Pokecard
						id={p.id}
						name={p.name}
						type={p.type}
						base_experience={p.base_experience}
					/>
				))}
			</div>
		</div>
	);
};

export default Pokedex;
