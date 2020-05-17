import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './navbar.css';
import { logout } from '../../actions/auth';

const Navbar = ({ isAuthenticated, logout }) => {
	const [checked, setChecked] = useState(false);

	const authLinks = (
		<Fragment>
			<li>
				<Link onClick={() => setChecked(false)} to='/'>
					Home
				</Link>
			</li>
			<li>
				<Link onClick={() => setChecked(false)} to='/add'>
					Make Transaction
				</Link>
			</li>
			<li>
				<Link onClick={() => setChecked(false)} to='/developer'>
					About Developer
				</Link>
			</li>
			<li>
				<Link onClick={() => setChecked(false)} to='/about'>
					About
				</Link>
			</li>
			<li>
				<Link
					onClick={() => {
						setChecked(false);
						logout();
					}}
					to='/login'
				>
					Logout
				</Link>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link onClick={() => setChecked(false)} to='login'>
					Login
				</Link>
			</li>
			<li>
				<Link onClick={() => setChecked(false)} to='/register'>
					Register
				</Link>
			</li>
			<li>
				<Link onClick={() => setChecked(false)} to='/developer'>
					About Developer
				</Link>
			</li>
			<li>
				<Link onClick={() => setChecked(false)} to='/about'>
					About
				</Link>
			</li>
		</Fragment>
	);

	return (
		<Fragment>
			<h1
				style={{
					textAlign: 'center',
					color: 'white',
					backgroundColor: 'black',
					padding: '8px',
				}}
			>
				Expense Tracker
			</h1>
			<div className='menu-wrap'>
				<input
					type='checkbox'
					checked={checked}
					onChange={() => setChecked(!checked)}
					className='toggler'
				/>
				<div className='hamburger'>
					<div></div>
				</div>

				<div className='menu'>
					<div>
						<div>
							<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(Navbar);
