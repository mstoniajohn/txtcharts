import React, { useReducer } from 'react';
import uuid from 'uuid';
import UrlContext from './linkContext';
import urlReducer from './linkReducer';
import axios from 'axios';

import {
	ADD_URL,
	DELETE_URL,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_URL,
	FILTER_URLS,
	CLEAR_FILTER,
	URL_ERROR,
	CLEAR_URLS,
	GET_URLS,
} from '../types';

const UrlState = (props) => {
	const initialState = {
		urls: null,
		// store current contact being updated
		current: null,
		filtered: null,
		error: null,
	};

	// state allows us to access things in state
	// diapatch allows to dispatch objects to reducer
	const [state, dispatch] = useReducer(urlReducer, initialState);
	// get urls
	const getUrls = async () => {
		try {
			const res = await axios.get('/api/urls');
			console.log(res.data);
			dispatch({ type: GET_URLS, payload: res.data });
		} catch (err) {
			dispatch({ type: URL_ERROR, payload: err.response?.msg });
		}
	};

	// Actions to Add contact
	const addUrl = async (url) => {
		// contact.id = uuid.v4();
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.post('/api/urls', url, config);
			dispatch({ type: ADD_URL, payload: res.data });
		} catch (err) {
			dispatch({ type: URL_ERROR, payload: err.response.msg });
		}
	};

	// Delete Contact
	const deleteUrl = async (id) => {
		// state.contacts = state.contacts.filter(id !== state.contact.id)
		try {
			const res = await axios.delete(`/api/urls/${id}`);
			dispatch({ type: DELETE_URL, payload: id });
		} catch (err) {
			dispatch({ type: URL_ERROR, payload: err.response.msg });
		}
	};
	// Update Contact
	const updateUrl = async (url) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put(`/api/urls/${url._id}`, url, config);
			dispatch({ type: UPDATE_URL, payload: res.data });
		} catch (err) {
			dispatch({ type: URL_ERROR, payload: err.response.msg });
		}
	};

	// clear contact
	const clearUrls = () => {
		dispatch({ type: CLEAR_URLS });
	};

	// Set current contact
	const setCurrent = (doc) => {
		dispatch({ type: SET_CURRENT, payload: doc.id });
	};

	// Clear Current Contact
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	// Filter contact
	const filterUrls = (text) => {
		dispatch({ type: FILTER_URLS, payload: text });
	};

	// Clear FilterContact
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	return (
		<UrlContext.Provider
			value={{
				urls: state.urls,
				current: state.current,
				error: state.error,
				addUrl,
				deleteUrl,
				clearCurrent,
				setCurrent,
				updateUrl,
				filtered: state.filtered,
				filterUrls,
				clearFilter,
				getUrls,
				clearUrls,
			}}
		>
			{props.children}
		</UrlContext.Provider>
	);
};

export default UrlState;
