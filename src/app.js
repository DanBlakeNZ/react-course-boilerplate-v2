import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { login, logout } from './actions/auth';

import './styles/styles.scss';
import 'normalize.css/normalize.css';
import "react-dates/lib/css/_datepicker.css";

import { firebase } from './firebase/firebase'
import LoadingPage from './components/LoadingPage'

const store = configureStore();

const jsx = (
	<Provider store={store}>
		<AppRouter />
	</Provider>
);

let hasRendered = false;
const renderApp = () => { //ensure the app only renders a single time;
	if (!hasRendered) {
		ReactDOM.render(jsx, document.getElementById('app'));
		hasRendered = true;
	}
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
	if (user) { //Is logged in
		store.dispatch(login(user.uid));
		renderApp();
			if (history.location.pathname === '/'){ // If current location is login page
				history.push('dashboard'); // go to dashboard
			}
	} else { // Is logged out
		store.dispatch(logout());
		renderApp();
		history.push('/'); // redirect to login page
	}
});