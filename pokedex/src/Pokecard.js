import React from 'react';
import './Pokecard.css';

const Pokecard = (pokemon) => {
	return (
		<div className="Pokecard">
			<div className="Pokecard-name">{pokemon.name}</div>
			<img
				className="Pokecard-image"
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
			/>
			<div className="Pokecard-info">Type: {pokemon.type}</div>
			<div className="Pokecard-info">EXP: {pokemon.base_experience}</div>
		</div>
	);
};

export default Pokecard;
