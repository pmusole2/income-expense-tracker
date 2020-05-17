import React, { Fragment, useState } from 'react';
import './form.css';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { register } from '../../actions/auth';
import { setAlert } from '../../actions/alert';

const Register = ({ isAuthenticated, register, setAlert }) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});
	const { name, email, password, password2 } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			setAlert('Passwords do not match', 'danger');
		} else {
			register({
				name,
				email,
				password,
			});
			setFormData({
				name: '',
				email: '',
				password: '',
				password2: '',
			});
		}
	};

	return (
		<Fragment>
			{isAuthenticated && <Redirect to='/' />}
			<div className='form-container'>
				<h1 className='text-center'>Register your Account</h1>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>Name</label>
						<input
							type='text'
							name='name'
							value={name}
							onChange={onChange}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputEmail1'>Email address</label>
						<input
							type='email'
							name='email'
							value={email}
							onChange={onChange}
							className='form-control'
						/>
						<small id='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>Password</label>
						<input
							type='password'
							name='password'
							value={password}
							onChange={onChange}
							className='form-control'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>Confirm Password</label>
						<input
							type='password'
							name='password2'
							value={password2}
							onChange={onChange}
							className='form-control'
						/>
					</div>
					<button type='submit' className='btn btn-dark btn-block'>
						Submit
					</button>
				</form>
				<p>Already have an account?</p>
				<Link className='btn btn-primary' to='/login'>
					Login
				</Link>
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, setAlert })(Register);
