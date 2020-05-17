import React, { useState, Fragment } from 'react';
import './form.css';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Redirect, Link } from 'react-router-dom';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		login({ email, password });
		setFormData({
			email: '',
			password: '',
		});
	};

	return (
		<Fragment>
			{isAuthenticated && <Redirect to='/' />}
			<div className='form-container'>
				<h1 className='text-center'>Login to your Account</h1>
				<form onSubmit={onSubmit}>
					<div className='form-group'>
						<label htmlFor='exampleInputEmail1'>Email address</label>
						<input
							value={email}
							name='email'
							onChange={onChange}
							type='email'
							className='form-control'
						/>
						<small id='emailHelp' className='form-text text-muted'>
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className='form-group'>
						<label htmlFor='exampleInputPassword1'>Password</label>
						<input
							value={password}
							onChange={onChange}
							type='password'
							name='password'
							className='form-control'
						/>
					</div>
					<button type='submit' className='btn btn-dark btn-block'>
						Submit
					</button>
				</form>
				<p>Dont have an account?</p>
				<Link className='btn btn-primary' to='/register'>
					Register
				</Link>
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
