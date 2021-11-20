import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import VendingMachine from './VendingMachine';
import Soda from './Soda';
import Chips from './Chips';
import Candies from './Candies';

function App () {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<VendingMachine />} exact />
				<Route path="/soda" element={<Soda />} exact />
				<Route path="/chips" element={<Chips />} exact />
				<Route path="/candies" element={<Candies />} exact />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
