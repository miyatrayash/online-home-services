/** @format */

import Input from "components/Input/Input";
import Button from "components/Button/Button";
import { authenticationService, userService } from "services";
import { Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router";
import Img from "../Images/1.png";
import { useState } from "react";
import { Convert } from "mongo-image-converter";


function Edit(props) {
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
	const [image, setImage] = useState(initialValues.imageUrl);

	if (params.username !== currentUser.username) {
		history.replace("/");
	}



	const onImageChange = (file) => {
		setImage(URL.createObjectURL(file));
	};

	async function handleEdit(
		{ username, firstName, lastName, imageUrl, email },
		{ setStatus, setSubmitting },
	) {
		const convertedImage = await Convert(imageUrl);
		console.log(convertedImage);
		userService
			.update({ username, email, firstName, lastName, image: convertedImage })
			.then((e) => {
				window.location.reload();	
							
				localStorage.setItem(
								"currentUser",
								JSON.stringify(e.data),
							);

			})
			.catch((error) => {
				setSubmitting(false);
				setStatus(error.message);
			});
	}
	return (
		<div className="container">
			<div className="row">
				<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
					<div className="card border-0 shadow rounded-3 my-5">
						<div className="card-body p-4 p-sm-5">
							<h2 className="card-title text-center mb-5">Edit</h2>
							<div>
								<Formik
									initialValues={initialValues}
									validationSchema={Yup.object().shape({
										username: Yup.string().required("Username is required"),
										firstName: Yup.string().required("FirstName is required"),
										lastName: Yup.string().required("LastName is required"),
										email: Yup.string()
											.required("Email is required")
											.email("Email is Not valid"),
									})}
									onSubmit={handleEdit}
								>
									{({
										setFieldValue,
										values,
										errors,
										status,
										touched,
										isSubmitting,
									}) => (
										<Form>
											<div className="form-group">
												<ErrorMessage
													name="imageUrl"
													component="div"
													className="invalid-feedback form-floating mb-3 d-flex justify-content-center"
												/>
												<label
													htmlFor="imageUrl"
													id="lblI"
													className=" mb-3 d-flex justify-content-center"
												>
													<img
														src={image}
														alt='pic'
														height="300"
														width="400"
														id="Img"
													></img>
												</label>
												<div className="mb-3 d-flex  justify-content-center">
													<input
														name="imageUrl"
														type="file"
														className={
															"form-control mt-3" +
															(errors.firstName && touched.firstName
																? " is-invalid"
																: "")
														}
														onChange={(e) => {
															onImageChange(e.currentTarget.files[0]);
															setFieldValue(
																"imageUrl",
																e.currentTarget.files[0],
															);
														}}
													/>
												</div>
											</div>
											<div className="form-group">
												<ErrorMessage
													name="firstName"
													component="div"
													className="invalid-feedback form-floating mb-3 d-flex justify-content-center"
												/>
												<div className="mb-3 d-flex  justify-content-center">
													<label htmlFor="firstName" id="lblFN">
														FirstName
													</label>
													<Input
														name="firstName"
														type="firstName"
														className={
															"form-control" +
															(errors.firstName && touched.firstName
																? " is-invalid"
																: "")
														}
														value={values["firstName"]}
														setFieldValue={setFieldValue}
													/>
												</div>
											</div>
											<div className="form-group">
												<ErrorMessage
													name="lastName"
													component="div"
													className="invalid-feedback form-floating mb-3 d-flex justify-content-center"
												/>
												<div className="mb-3 d-flex  justify-content-center">
													<label htmlFor="lastName" id="lblLN">
														LastName
													</label>
													<Input
														name="lastName"
														type="lastName"
														className={
															"form-control" +
															(errors.lastName && touched.lastName
																? " is-invalid"
																: "")
														}
														value={values["lastName"]}
														setFieldValue={setFieldValue}
													/>
												</div>
											</div>
											<div className="form-group">
												<ErrorMessage
													name="username"
													component="div"
													className="invalid-feedback form-floating mb-3 d-flex justify-content-center"
												/>
												<div className="mb-3 d-flex  justify-content-center">
													<label htmlFor="username" id="lblUser">
														Username
													</label>
													<Input
														name="username"
														type="username"
														className={
															"form-control" +
															(errors.username && touched.username
																? " is-invalid"
																: "")
														}
														value={values["username"]}
														setFieldValue={setFieldValue}
													/>
												</div>
											</div>
											<div className="form-group">
												<ErrorMessage
													name="email"
													component="div"
													className="invalid-feedback form-floating mb-3 d-flex justify-content-center"
												/>
												<div className=" mb-3 d-flex justify-content-center">
													<label htmlFor="email" id="lblEmail">
														Email
													</label>
													<Input
														name="email"
														type="email"
														className={
															"form-control" +
															(errors.email && touched.email
																? " is-invalid"
																: "")
														}
														value={values["email"]}
														setFieldValue={setFieldValue}
													/>
												</div>
											</div>

											{status && (
												<div className={"alert alert-danger"}>
													{status.toString()}
												</div>
											)}

											<div className="d-grid justify-content-center">
												<Button
													type="submit"
													value="Sign up"
													onClick={() => {}}
												></Button>
												{isSubmitting && (
													<img alt='load' src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
												)}
												<Button
													value="Cancel"
													onClick={() => {
														history.push("/");
													}}
												></Button>
											</div>
										</Form>
									)}
								</Formik>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Edit;
