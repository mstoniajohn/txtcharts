import React, { useReducer } from 'react';
import uuid from 'uuid';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';

import { SET_ALERT, REMOVE_ALERT, CLEAR_ERRORS } from '../types';

const AlertState = (props) => {
	const initialState = [];

	// state allows us to access things in state
	// diapatch allows to dispatch objects to reducer
	const [state, dispatch] = useReducer(alertReducer, initialState);

	// Set AlertState
	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuid.v4();
		dispatch({ type: SET_ALERT, payload: { msg, type, id } });

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	return (
		<AlertContext.Provider
			value={{
				alerts: state,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
