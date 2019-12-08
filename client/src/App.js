import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import PrivateRoute from "./PrivateRoute";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import Header from "./components/Header";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";

function App(props) {
	const [authTokens, setAuthTokens] = useState();

	const setTokens = data => {
		localStorage.setItem("tokens", JSON.stringify(data));
		setAuthTokens(data);
	};

	return (
		<AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
			<Router>
				<Header></Header>
				<React.Fragment>
					<Switch>
						<Route exact path="/">
							<HomePage />
						</Route>
						<Route path="/login/" component={LoginPage} />>
						<PrivateRoute path="/admin/" component={DashboardPage} >
						</PrivateRoute>
					</Switch>
					<ReactNotification />
				</React.Fragment>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
