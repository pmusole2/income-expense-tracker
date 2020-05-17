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
import { About } from './components/about-page/About';
import AboutDeveloper from './components/about-page/AboutDeveloper';
import DetailsPage from './components/DetailsPage';

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
						<Route exact path='/about' component={About} />
						<Route exact path='/developer' component={AboutDeveloper} />
						<PrivateRoute exact path='/details' component={DetailsPage} />
					</Switch>
				</div>
			</Router>
		</Provider>
	);
};

export default App;
