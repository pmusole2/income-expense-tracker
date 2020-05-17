import {
	ACCOUNT_LOADED,
	ACCOUNT_LOAD_ERROR,
	TRANSACTION_SUCCESSFUL,
	TRANSACTION_FAILED,
	BALANCE_UPDATED,
	TRANSACTIONS_LOADED,
	BALANCE_UPDATE_FAILED,
} from '../actions/types';

const initialState = {
	account: null,
	loading: true,
	transactions: null,
	redirect: false,
	error: {},
};

export default (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ACCOUNT_LOADED:
			return {
				...state,
				account: payload,
				loading: false,
				redirect: false,
			};
		case TRANSACTIONS_LOADED:
			return {
				...state,
				transactions: payload,
				redirect: false,
			};
		case TRANSACTION_SUCCESSFUL:
			return {
				...state,
				transactions: [payload, ...state.transactions],
				loading: false,
				redirect: true,
			};
		case BALANCE_UPDATED:
			return {
				...state,
				account: payload,
				loading: false,
			};
		case TRANSACTION_FAILED:
		case ACCOUNT_LOAD_ERROR:
		case BALANCE_UPDATE_FAILED:
			return {
				...state,
				error: payload,
				loading: false,
			};
		default:
			return state;
	}
};
