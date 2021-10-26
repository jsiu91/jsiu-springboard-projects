import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

const useAxios = (url) => {
	const [ state, setState ] = useState([]);

	const addState = async (restOfUrl = '') => {
		const response = await axios.get(`${url}${restOfUrl}`);
		setState((data) => [ ...data, { ...response.data, id: uuid() } ]);
	};

	return [ state, addState ];
};

export default useAxios;
