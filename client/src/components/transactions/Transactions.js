import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import TransactionItem from './TransactionItem';

const Transactions = ({ transactions, loading }) => {
	let reversedTransactions;
	if (transactions !== null) {
		reversedTransactions = transactions
			.map(transaction => transaction)
			.reverse();
	}
	return (
		<div className='transactions-container'>
			<Fragment>
				{transactions === null && !loading ? (
					<Fragment>
						<h1>You have no transaction history</h1>
					</Fragment>
				) : (
					<Fragment>
						<h3>History</h3>
						<ul className='list'>
							{transactions &&
								reversedTransactions
									.filter((transaction, idx) => idx < 5)
									.map(transaction => (
										<TransactionItem
											key={transaction._id}
											transaction={transaction}
										/>
									))}
						</ul>
					</Fragment>
				)}
			</Fragment>
		</div>
	);
};

const mapStateToProps = state => ({
	transactions: state.transaction.transactions,
	loading: state.transaction.loading,
});

export default connect(mapStateToProps)(Transactions);
