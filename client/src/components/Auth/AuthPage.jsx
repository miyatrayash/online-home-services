/** @format */

import React, {  useState } from "react";
import Login from "./login";
import Register from "./register";

function AuthPage() {
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
			

			{/* <div className="panels-container" >
				<div className="panel left-panel">
					<div className="content">
						<h3>New here ?</h3>
						<p>Please Sign Up to our website</p>
						<button
							className="btn transparent"
							id="sign-up-btn"
							onClick={() => {
								const container = document.querySelector(".container");
								container.classList.add("sign-up-mode");
								timer(true);
							}}
						>
							Sign up
						</button>
					</div>
					<Late className="image"></Late>

				</div>
				<div className="panel right-panel">
					<div className="content">
						<h3>One of us ?</h3>
						<p>Grate! Just Login Again</p>
						<button
							className="btn transparent"
							id="sign-in-btn"
							onClick={() => {
								const container = document.querySelector(".container");
								container.classList.remove("sign-up-mode");
								timer(false);
							}}
						>
							Sign in
						</button>
					</div>
					<Design className="image"></Design>
				</div>
			</div> */}
		</div>
	);
}

export default AuthPage;
