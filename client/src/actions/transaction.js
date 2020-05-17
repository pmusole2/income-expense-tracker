import {
	ACCOUNT_LOADED,
	ACCOUNT_LOAD_ERROR,
	TRANSACTION_SUCCESSFUL,
	TRANSACTION_FAILED,
	BALANCE_UPDATED,
	BALANCE_UPDATE_FAILED,
	TRANSACTIONS_LOADED,
	GET_TRANSACTIONS_FAILED,
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Load Account
export const loadAccount = () => async dispatch => {
	try {
		const res = await axios.get('/api/account');
		dispatch({
			type: ACCOUNT_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: ACCOUNT_LOAD_ERROR,
		});
	}
};

// Get Transactions
export const loadTransactions = () => async dispatch => {
	try {
		const res = await axios.get('/api/transactions');
		dispatch({
			type: TRANSACTIONS_LOADED,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: GET_TRANSACTIONS_FAILED,
			payload: err,
		});
	}
};

// Make Transaction
export const makeTransaction = (
	description,
	type,
	amount
) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	const body = JSON.stringify({ description, type, amount });
	try {
		const res = await axios.post('/api/transactions', body, config);
		const response = await axios.post('/api/account', body, config);
		dispatch({
			type: TRANSACTION_SUCCESSFUL,
			payload: res.data,
		});
		dispatch({
			type: BALANCE_UPDATED,
			payload: response.data,
		});
		dispatch(setAlert('Transaction Successful', 'success'));
	} catch (err) {
		dispatch({
			type: TRANSACTION_FAILED,
			payload: err,
		});
		dispatch(setAlert('Transaction Failed', 'danger'));
	}
};

// Go to Details Page
export const detailsPage = type => async dispatch => {
	try {
		dispatch({
			type: type,
		});
	} catch (err) {
		dispatch({
			type: 'ERROR_GETTING_DETAILS',
		});
	}
};
