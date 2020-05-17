import React from 'react';
import Moment from 'react-moment';

const TransactionItem = ({ transaction }) => {
	const { type, amount, description, madeat } = transaction;
	return (
		<div className={type === 'expense' ? 'minus' : 'plus'}>
			<li>{description}</li>
			<span> K{amount} </span> <Moment format='DD/MM/YYYY'>{madeat}</Moment>
		</div>
	);
};

export default TransactionItem;
