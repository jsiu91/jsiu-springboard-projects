import React from 'react';
import DogList from './DogList';
import DogDetails from './DogDetails';
import whiskey from './dogs/whiskey.jpg';
import duke from './dogs/duke.jpg';
import perry from './dogs/perry.jpg';
import tubby from './dogs/tubby.jpg';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App (props) {
	return (
		<Router>
			<Routes>
				<Route exact path="/dogs" element={<DogList dogs={props.dogs} />} />
				<Route path="/dogs/:name" element={<DogDetails dogs={props.dogs} />} />
				<Route path="*" element={<Navigate replace to="/dogs" />} />
			</Routes>
		</Router>
	);
}

App.defaultProps = {
	dogs: [
		{
			name: 'Whiskey',
			age: 5,
			src: whiskey,
			facts: [
				'Whiskey loves eating popcorn.',
				'Whiskey is a terrible guard dog.',
				'Whiskey wants to cuddle with you!',
			],
		},
		{
			name: 'Duke',
			age: 3,
			src: duke,
			facts: [
				'Duke believes that ball is life.',
				'Duke likes snow.',
				'Duke enjoys pawing other dogs.',
			],
		},
		{
			name: 'Perry',
			age: 4,
			src: perry,
			facts: [ 'Perry loves all humans.', 'Perry demolishes all snacks.', 'Perry hates the rain.' ],
		},
		{
			name: 'Tubby',
			age: 4,
			src: tubby,
			facts: [
				'Tubby is really stupid.',
				'Tubby does not like walks.',
				'Angelina used to hate Tubby, but claims not to anymore.',
			],
		},
	],
};

export default App;
