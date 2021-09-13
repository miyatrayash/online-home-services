/** @format */

import { useHistory } from "react-router";
import { useState, useEffect } from "react";
import {
	faUser,
	faEnvelope,
	faLock,
} from "@fortawesome/fontawesome-free-solid";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
import axios from "axios";

function Register(props) {
	const history = useHistory();
	const [email, changeEmail] = useState("");
	const [password, changePassword] = useState("");
	const [username, changeUsername] = useState("");
	const [confPass, changeConfPass] = useState("");

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
		if (password === confPass) {
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
	}

	return (
		<form onSubmit={handleRegister} className={props.className}>
			<h2 className="title">Sign up</h2>
			<Input
				required
				type="text"
				value={username}
				icon={faUser}
				onChange={(e) => changeUsername(e.target.value)}
				placeholder="Username"
			/>
			<Input
				required
				type="text"
				value={email}
				icon={faEnvelope}
				onChange={(e) => changeEmail(e.target.value)}
				placeholder="Email"
			/>
			<Input
				required
				type="password"
				value={password}
				icon={faLock}
				onChange={(e) => changePassword(e.target.value)}
				placeholder="Password"
			/>

			<Input
				required
				type="password"
				value={confPass}
				icon={faLock}
				onChange={(e) => changeConfPass(e.target.value)}
				placeholder="Confirm Password"
			/>
			<Button type="submit" value="Sign up"></Button>
		</form>
	);
}

export default Register;
