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

export default (state, action) => {
	switch (action.type) {
		case GET_URLS:
			return {
				...state,
				urls: action.payload,
				loading: false,
			};
		case ADD_URL:
			return {
				...state,
				urls: [action.payload, ...state.urls],
				loading: false,
			};
		case UPDATE_URL:
			return {
				...state,
				urls: state.urls.map((url) =>
					url._id === action.payload._id ? action.payload : url
				),
				loading: false,
			};
		case DELETE_URL:
			return {
				...state,
				urls: state.urls.filter((url) => url._id !== action.payload),
				loading: false,
			};
		case CLEAR_URLS:
			return {
				...state,
				urls: null,
				filtered: null,
				error: null,
				current: null,
			};

		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case FILTER_URLS:
			return {
				...state,
				filtered: state.urls.filter((url) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return url.name.match(regex);
				}),
			};
		case CLEAR_FILTER:
			return {
				...state,
				filtered: null,
			};
		case URL_ERROR:
			return {
				...state,
				error: action.payload,
			};

		default:
			return state;
	}
};
