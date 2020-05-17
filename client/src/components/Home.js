import React, { Fragment, useEffect } from 'react';
import IncomeExpense from './income-expense/IncomeExpense';
import Account from './main/Account';
import Transactions from './transactions/Transactions';
import { connect } from 'react-redux';
import { loadAccount, loadTransactions } from '../actions/transaction';

const Home = ({ loadAccount, loadTransactions }) => {
	useEffect(() => {
		loadAccount();
		loadTransactions();
	}, []);
	return (
		<Fragment>
			<Account />
			<IncomeExpense />
			<Transactions />
		</Fragment>
	);
};

export default connect(null, { loadAccount, loadTransactions })(Home);
