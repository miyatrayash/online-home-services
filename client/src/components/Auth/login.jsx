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
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card border-0 shadow my-5">
						<div className="card-body p-4 p-sm-5">
							<h2 className="card-title text-center mb-5">Sign In</h2>
							<div>
								<form onSubmit={handleLogin} className={props.className}>
									<div className="form-floating mb-3 d-flex justify-content-center">
										<Input
											required
											type="text"
											value={username}
											icon={faUser}
											onChange={(e) => setUsername(e.target.value)}
											placeholder="Username"
										/>
									</div>
									<div className="form-floating mb-3 d-flex justify-content-center">
										<Input
											required
											type="password"
											value={password}
											icon={faLock}
											onChange={(e) => setPassword(e.target.value)}
											placeholder="Password"
										/>
									</div>
									<div className="d-grid justify-content-center">
										<Button type="submit" value="Login" />
									</div>
									<hr class="my-4" />
									<div className="content">
										<h3>New here ?</h3>
										<p>Please Sign Up to our website</p>
										<Button
											value="Sign Up"
											type="button"
											onClick={() => {
												props.changeVal();
											}}
										>
										</Button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
