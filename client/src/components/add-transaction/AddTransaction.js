import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { makeTransaction } from '../../actions/transaction';
import { setAlert } from '../../actions/alert';
import { Redirect } from 'react-router-dom';

const AddTransaction = ({ makeTransaction, setAlert, redirect }) => {
	const [formData, setFormData] = useState({
		description: '',
		type: '',
		amount: 0,
	});
	const { description, type, amount } = formData;
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		if (!description || !type || amount < 1) {
			setAlert('Please fill in all fields', 'danger');
		} else {
			makeTransaction(description, type, amount);
			setFormData({
				amount: 0,
				description: '',
				type: '',
			});
		}
	};

	return (
		<Fragment>
			{redirect && <Redirect to='/' />}
			<div className='form-container'>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='amount'>Amount</label>
						<input
							type='number'
							name='amount'
							value={amount}
							onChange={onChange}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='description'>Description</label>
						<input
							type='text'
							name='description'
							value={description}
							onChange={onChange}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleFormControlSelect1'>Transaction Type:</label>
						<select
							name='type'
							value={type}
							onChange={onChange}
							className='form-control'
						>
							<option value=''></option>
							<option value='income'>Income</option>
							<option value='expense'>Expense</option>
						</select>
					</div>
					<input
						type='submit'
						value='Add Transaction'
						className='btn btn-dark btn-block'
					/>
				</form>
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	redirect: state.transaction.redirect,
});

export default connect(mapStateToProps, { makeTransaction, setAlert })(
	AddTransaction
);
