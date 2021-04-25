import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Mux from '@mux/mux-node';
import VideoPlayer from './components/VideoPlayer';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import Links from './components/charts/Links';

function App() {
	return (
		<div className="App">
			<Router>
				<AuthProvider>
					<Switch>
						<PrivateRoute exact path="/" component={Home} />
						<PrivateRoute exact path="/links" component={Links} />

						{/* <PrivateRoute path="/update-profile" component={UpdateProfile} /> */}
						<Route path="/signup" component={SignUp} />
						<Route path="/login" component={Login} />

						{/* <Route path="/forgot-password" component={ForgotPassword} /> */}
					</Switch>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
