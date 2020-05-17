import React from 'react';
import { connect } from 'react-redux';
import './account.css';

const Account = ({ account }) => {
	return (
		<div className='balance-container'>
			<div>
				<h3>Account Balance</h3>
				<h2
					style={{ marginTop: '5px' }}
					className='account-balance'
					id='account-balance'
				>
					K{account ? account.balance : 0}
				</h2>
			</div>
		</div>
	);
};

const mapStateToProps = state => ({
	account: state.transaction.account,
});

export default connect(mapStateToProps)(Account);
