/** @format */

import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
	const history = useHistory();
	const [email, changeEmail] = useState("");
	const [password, changePassword] = useState("");
	const [username, changeUsername] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:5000/isUserAuth", {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			})
			.then((res) => res.data)
			.then((data) => (data.isLoggedIn ? history.push("/dashboard") : null));
	}, [history]);

	async function handleRegister(e) {
		e.preventDefault();
		var state = {
			email,
			username,
			password,
		};

		axios
			.post("http://localhost:5000/register", state)
			.then((e) => this.history.push("/login"))
			.catch((err) => console.log(err));
	}


	return (
		<form onSubmit={handleRegister}>
			<input required type="email" onChange={changeEmail} />
			<input required type="username" onChange={changeUsername} />
			<input required type="password" onChange={changePassword} />
			<input type="submit" value="Submit" />
		</form>
	);
}

export default Register;
