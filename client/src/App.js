import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import Register from './components/register/Register';
import Home from './components/Home';
import Login from './components/register/Login';
import AddTransaction from './components/add-transaction/AddTransaction';
import store from './store';
import Alert from './components/Alert';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
		// eslint-disable-next-line
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<div className='container'>
					<Alert />
					<Switch>
						<PrivateRoute exact path='/' component={Home} />
						<Route exact path='/register' component={Register} />
						<Route exact path='/login' component={Login} />
						<PrivateRoute exact path='/add' component={AddTransaction} />
						<Redirect to='/' />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
