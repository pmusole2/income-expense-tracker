import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsPage } from '../../actions/transaction';

const IncomeExpense = ({ account, detailsPage }) => {
	return (
		<div className='income-expense-container'>
			<Link to='/details' onClick={() => detailsPage('GET_INCOMES')}>
				<h4>Income</h4>
				<p className='money plus'>K{account ? account.total_income : 0}</p>
			</Link>
			<Link to='details' onClick={() => detailsPage('GET_EXPENSES')}>
				<h4>Expense</h4>
				<p className='money minus'>K{account ? account.total_expense : 0}</p>
			</Link>
		</div>
	);
};

const mapStateToProps = state => ({
	account: state.transaction.account,
});

export default connect(mapStateToProps, { detailsPage })(IncomeExpense);
