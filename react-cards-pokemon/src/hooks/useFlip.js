import { useState } from 'react';

const useFlip = () => {
	const [ state, setState ] = useState(true);
	const flipState = () => {
		setState((card) => !card);
	};

	return [ state, flipState ];
};

export default useFlip;
