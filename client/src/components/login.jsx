/** @format */

import {  useHistory } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function Login() {
	const history = useHistory();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isAuthenticated, changeAuth] = useState(false);

	useEffect( () =>{
		const asyncCallBack = async () => {
			console.log("here")
			const info = await axios
				.get("http://localhost:5000/isUserAuth", {
					headers: {
						"x-access-token": localStorage.getItem("token"),
					},
				})
				.then((res) => res.data);
				if(info.isLoggedIn) 
					history.push("/dashboard");
		};

		asyncCallBack();
	}, [history,isAuthenticated]);


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
					if (data) 
					{
						// console.log(data.token);
						changeAuth(true);
						localStorage.setItem("token", data.token);
					}
				});
		}
	}

	return (
		<form onSubmit={handleLogin}>
			<input
				required
				type="text"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				required
				type="password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<input type="submit" value="Submit" />
		</form>
	);
}

export default Login;
