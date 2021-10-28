/** @format */

import HomePage from "HomePage/home";
import Navbar from "components/Navbar/Navbar";
import Foot from "footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import AuthPage from "AuthPage/AuthPage";
import authenticationService from "services/authentication.service";
import {history, Role} from 'helpers';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { PrivateRoute } from "components";
import { useState,useEffect } from "react";
import { AdminPage } from "AdminPage/AdminPage";
import Edit from "ProfilePage/EditUserDetails";
import Profile from "ProfilePage/UserDetails";
import MyAppliances from "MyAppliances/MyAppliances";
import NewAppliances from "MyAppliances/newAppliances";
import Appliances from "Appliances/Appliances";
import checkOut from "OrderPage/checkOut";
import myOrders from "OrderPage/myOrders";
import Orders from "OrderPage/Orders";
function App() {
	const [currentUser, setCurrentUser] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isVendor, setIsVendor] = useState(false);

	useEffect(() => {
		authenticationService.currentUser.subscribe((x) => {

			setCurrentUser(x);
			setIsAdmin(x && x.role === Role.Admin);
			setIsVendor(x && x.role === Role.Vendor);
			console.log(x && x.role);
		});
	}, [currentUser, isAdmin, isVendor]);

	function logout() {
		authenticationService.logout();
		history.push("/auth");
	}

	return (
		<Router history={history}>
			<Links />
			<Navbar user={currentUser} isAdmin={isAdmin} logout={logout} />
			<Switch>
				<Route path="/auth">
					<AuthPage />
				</Route>
				<PrivateRoute exact path="/services" component={Appliances} />
				<PrivateRoute
					exact
					path="/myServices"
					roles={[Role.Admin, Role.Vendor]}
					component={MyAppliances}
				/>
				<PrivateRoute
					exact
					path="/createServices"
					roles={[Role.Admin, Role.Vendor]}
					component={NewAppliances}
				/>
				<PrivateRoute exact path="/" component={HomePage} />
				<PrivateRoute exact path="/checkOut" component={checkOut} />
				<PrivateRoute exact path="/orders" component={myOrders} />
				<PrivateRoute exact path="/myOrders" component={Orders} />
				<PrivateRoute
					path="/admin"
					roles={[Role.Admin]}
					component={AdminPage}
				/>
				<PrivateRoute path="/users/:username/edit" component={Edit} />
				<PrivateRoute path="/users/:username" component={Profile} />
			</Switch>
			<Foot />
		</Router>
	);
}

function Links() {
	return (
		<>
			<link rel="icon" href="Images/favicon.png" />

			<link
				rel="stylesheet"
				href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
			/>
			<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
			<link rel="stylesheet" href="clone.css" />
			<script
				src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
				integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
				crossorigin="anonymous"
			></script>
			<script
				src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
				integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
				crossorigin="anonymous"
			></script>
			<script
				src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
				integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
				crossorigin="anonymous"
			></script>
			<script
				src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"
				type="text/javascript"
			></script>
			<script
				src="https://unpkg.com/aos@2.3.1/dist/aos.js"
				type="text/javascript"
			></script>
		</>
	);
}

export default App;
