/** @format */

import React, {  useState } from "react";
import Login from "./login";
import Register from "./register";
import { authenticationService } from "services";
import { useHistory } from "react-router";
function AuthPage() {
	const history = useHistory();

	if (authenticationService.currentUserValue) history.replace("/");

	const [isSignUp, changeForm] = useState(false);


	return (
			<div className="container-fluid">
				<div>
					{isSignUp ? (
						<Register changeVal={() => changeForm(false)}></Register>
					) : (
						<Login changeVal={() => changeForm(true)}></Login>
					)}
				</div>
		</div>
	);
}

export default AuthPage;
