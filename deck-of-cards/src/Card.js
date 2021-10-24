import React from 'react';

const Card = ({ name, image }) => {
	return <img className="Card" src={image} alt={name} />;
};

export default Card;
