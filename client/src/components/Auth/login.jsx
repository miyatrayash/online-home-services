/** @format */

import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { faUser, faLock } from "@fortawesome/fontawesome-free-solid";
import axios from "axios";
import Input from "components/Input/Input";
import Button from "components/Button/Button";
//import "./login.css";

function Login(props) {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isAuthenticated, changeAuth] = useState(false);

	useEffect(() => {
		const asyncCallBack = async () => {
			console.log("here");
			const info = await axios
				.get("http://localhost:5000/isUserAuth", {
					headers: {
						"x-access-token": localStorage.getItem("token"),
					},
				})
				.then((res) => res.data);
			if (info.isLoggedIn) history.push("/dashboard");
		};

		asyncCallBack();
	}, [history, isAuthenticated]);

	function handleLogin(e) {
		e.preventDefault();
		const task = { username, password };
		if (task.username && task.username.length > 0) {
			console.log("here");

			axios
				.post("http://localhost:5000/login", task)
				.then(
					(res) => res.data,
					(err) => console.log(err),
				)
				.then((data) => {
					if (data) {
						changeAuth(true);
						localStorage.setItem("token", data.token);
					}
				});
		}
	}

	return (
		<form onSubmit={handleLogin} className={props.className}>
			<h2 className="title">Sign in</h2>
			<Input
				required
				type="text"
				value={username}
				icon={faUser}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<Input
				required
				type="password"
				value={password}
				icon={faLock}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<Button type="submit" value="Login"  />
			<div>
				<h3>New here ?</h3>
				<p>Please Sign Up to our website</p>
				<Button value="Sign Up" type="button" onClick={() => {
					props.changeVal();
				}}>
					Sign In
				</Button>
			</div>
		</form>
	);
}

export default Login;
