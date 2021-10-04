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
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card border-0 shadow rounded-3 my-5">
						<div className="card-body p-4 p-sm-5">
							<h2 className="card-title text-center mb-5">Sign Up</h2>
							<div>
								<form onSubmit={handleRegister} className={props.className}>
									<div className="form-floating mb-3 d-flex justify-content-center">
										<Input
											required
											type="text"
											value={username}
											icon={faUser}
											onChange={(e) => changeUsername(e.target.value)}
											placeholder="Username"
										/>
									</div>
									<div className="form-floating mb-3 d-flex justify-content-center">
										<Input
											required
											type="text"
											value={email}
											icon={faEnvelope}
											onChange={(e) => changeEmail(e.target.value)}
											placeholder="Email"
										/>
									</div>
									<div className="form-floating mb-3 d-flex justify-content-center">
										<Input
											required
											type="password"
											value={password}
											icon={faLock}
											onChange={(e) => changePassword(e.target.value)}
											placeholder="Password"
										/>
									</div>
									<div className="form-floating mb-3 d-flex justify-content-center">
										<Input
											required
											type="password"
											value={confPass}
											icon={faLock}
											onChange={(e) => changeConfPass(e.target.value)}
											placeholder="Confirm Password"
										/>
									</div>
									<div className="d-grid justify-content-center">
										<Button type="submit" value="Sign up"></Button>
									</div>
									<hr class="my-4" />
									<div className="content">
										<h3>One of us ?</h3>
										<p>Great! Just Login Again</p>
										<Button
											value="Sign In"
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

export default Register;
