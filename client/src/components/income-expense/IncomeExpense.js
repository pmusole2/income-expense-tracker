import React from 'react';
import { connect } from 'react-redux';

const IncomeExpense = ({ account }) => {
	return (
		<div className='income-expense-container'>
			<div>
				<h4>Income</h4>
				<p className='money plus'>K{account ? account.total_income : 0}</p>
			</div>
			<div>
				<h4>Expense</h4>
				<p className='money minus'>K{account ? account.total_expense : 0}</p>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	account: state.transaction.account,
});

export default connect(mapStateToProps)(IncomeExpense);
