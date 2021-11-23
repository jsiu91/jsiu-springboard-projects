import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ColorHeader from './ColorHeader';
import AddColor from './AddColor';
import ColorList from './ColorList';
import ColorDetails from './ColorDetails';

function App (props) {
	const [ colors, setColors ] = useState(props.colors);

	const handleAdd = (newColorObj) => {
		setColors((prevColors) => ({ ...prevColors, ...newColorObj }));
	};

	return (
		<Router>
			<Switch>
				<Route exact path="/colors">
					<ColorHeader />
					<ColorList colors={colors} />
				</Route>
				<Route exact path="/colors/new">
					<AddColor addColor={handleAdd} />
				</Route>
				<Route exact path="/colors/:color">
					<ColorDetails colors={colors} />
				</Route>
				<Redirect to="/colors" />
			</Switch>
		</Router>
	);
}

App.defaultProps = {
	colors: {
		red: '#FF0000',
		green: '#00FF00',
		blue: '#0000FF',
	},
};

export default App;
