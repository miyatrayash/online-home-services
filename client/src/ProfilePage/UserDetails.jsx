/** @format */

import Button from "components/Button/Button";
import { authenticationService } from "services";
import { useHistory } from "react-router";
import Img from "../Images/1.png";
import { useState } from "react";


function Profile(props) {
	var currentUser = authenticationService.currentUserValue;
	const params = props.match.params;
	const history = useHistory();
	var initialValues = {
		username: currentUser.username,
		firstName: currentUser.firstName,
		lastName: currentUser.firstName,
		email: currentUser.email,
		imageUrl: currentUser.image !== null ? currentUser.image : Img,
	};
	console.log(currentUser.image);
	const image = useState(initialValues.imageUrl)[0];

	if (params.username !== currentUser.username) {
		history.replace("/");
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card border-0 shadow rounded-3 my-5">
						<div className="card-body p-4 p-sm-5">
							<h2 className="card-title text-center mb-5">Profile Page</h2>
							<div>
								<div className="form-group">
									<label
										htmlFor="imageUrl"
										id="lblI"
										className=" mb-3 d-flex justify-content-center"
									>
										<img src={image} height="300" alt='pic'width="400" id="Img"></img>
									</label>
								</div>
								<div className="form-group">
									<div className="mb-3 d-flex  justify-content-center">
										<label>FirstName</label>
										<label>{initialValues["firstName"]}</label>
									</div>
								</div>
								<div className="form-group">
									<div className="mb-3 d-flex  justify-content-center">
										<label>LastName:</label>
										<label>{initialValues["lastName"]}</label>
									</div>
								</div>
								<div className="form-group">
									<div className="mb-3 d-flex  justify-content-center">
										<label htmlFor="username" id="lblUser">
											Username
										</label>
										<label>{initialValues["username"]}</label>
									</div>
								</div>
								<div className="form-group">
									<div className=" mb-3 d-flex justify-content-center">
										<label htmlFor="email" id="lblEmail">
											Email
										</label>
										<label>{initialValues["email"]}</label>
									</div>
								</div>
								<div className="d-grid justify-content-center">
									<Button
										value="Edit"
										onClick={() => {
                                            const path = window.location.pathname + '/edit';
                                            history.push(path)
                                        }}
									></Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
