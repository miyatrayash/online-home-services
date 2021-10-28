/** @format */

import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import * as Material from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "components/Button/Button";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { AppService } from "services";
import { withRouter } from "react-router-dom";
const defaultLocation = { lat: 20.5937, lng: 78.9629 };

class NewAppliances extends React.Component {
	constructor(props) {
		super(props);
		if (props.location.state) {
			console.log(props.location.state);
		}

		this.onMouseOverEvent = this.onMouseOverEvent.bind(this);
		this.routingFunction = this.routingFunction.bind(this);
	}

	state = {
		markerPosition: defaultLocation,
		address: "",
	};
	initialValues = {
		name: "",
		price: 0,
		address: "",
		category: "Room Cleaning",
		description: "",
	};
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(function (position) {
			defaultLocation.lat = position.coords.latitude;
			defaultLocation.lng = position.coords.longitude;
		});

		if (this.props.location.state) {
			console.log("this.props.location.state");
			var props = this.props.location.state;
			this.initialValues = {
				name: props.name,
				price: props.price,
				address: props.address,
				category: props.category,
				description: props.description,
			};
			this.setState({
				markerPosition: {
					lat: this.props.location.state.loc.coordinates[0],
					lng: this.props.location.state.loc.coordinates[1],
				},
				address: props.address,
			});
		} else
			this.setState({
				markerPosition: defaultLocation,
			});
	}

	routingFunction = () => {
		this.props.history.push({
			pathname: `/myServices`,
		});
	};
	onMouseOverEvent = (place, setFieldValue) => {
		fetch(
			//`https://api.radar.io/v1/geocode/reverse?coordinates=${place.latLng.lat()},${place.latLng.lng()}`,
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${place.latLng.lat()},${place.latLng.lng()}&key=AIzaSyB7AbECqCey2hPmL1JMcTfvfDqPrVWji8o`,
			{
				method: "get",
				// headers: new Headers({
				// 	Authorization:
				// 		"prj_live_sk_6b97e69fcf648f71dc615ffb80a640b4816fb885",
				// }),
			},
		).then((res) =>
			res.json().then((result) => {
				console.log(result.results[0]);
				this.setState({
					markerPosition: { lat: place.latLng.lat(), lng: place.latLng.lng() },
					address: result.results[0].formatted_address,
				});
				setFieldValue("address", result.results[0].formatted_address);
			}),
		);


	};

	render() {
		return (
			<Box
				sx={{
					height: "100vh",
				}}
			>
				<Formik
					initialValues={
						this.props.location.state
							? {
								name: this.props.location.state.name,
								price: this.props.location.state.price,
								address: this.props.location.state.address,
								category: this.props.location.state.category,
								description: this.props.location.state.description,
							}
							: {
								name: "",
								price: 0,
								address: "",
								category: "Room Cleaning",
								description: "",
							}
					}
					validationSchema={Yup.object().shape({
						name: Yup.string().required("Name is required"),
						price: Yup.string().required("Price is required"),
						address: Yup.string().required("Address is required"),
						category: Yup.string().required("Category is required"),
						description: Yup.string().required("description is required"),
					})}
					onSubmit={(Fields, status) => {
						if (this.props.location.state) {
							var vars = this.props.location.state;
							AppService.update({
								_id: vars._id,
								...Fields,
								lat: this.state.markerPosition.lat,
								lng: this.state.markerPosition.lng,
							})
								.then((res) => {
									this.routingFunction();
								})
								.catch((error) => {
									status.setSubmitting(false);
									status.setStatus(error.message);
								});
						} else {
							AppService.create({
								...Fields,
								lat: this.state.markerPosition.lat,
								lng: this.state.markerPosition.lng,
							})
								.then((res) => {
									this.routingFunction();
								})
								.catch((error) => {
									status.setSubmitting(false);
									status.setStatus(error.message);
								});
						}
					}}
				>

					{({ values, setFieldValue, status, isSubmitting }) => {
						//setFieldValue("address", this.state.address);
						return (
							<Form>
								<Material.Grid
									container
									sx={{
										height: "100vh",
									}}
								>
									<Material.Grid
										item
										xs={2}
										sx={{
											height: "100vh",
										}}
									>
										<Box
											sx={{
												display: "flex",
												alignItems: "stretch",
												height: "100vh",
											}}
										>
											<Paper
												elevation={5}
												sx={{
													width: "100%",
													display: "flex",
													justifyContent: "center",
													alignItems: "start",
													borderRadius: 4,
												}}
											>
												<Material.FormControl
													variant="standard"
													sx={{
														"& .MuiTextField-root,& .MuiSelect-root, #demo-simple-select-standard-label ":
															{
																m: 2,
															},
													}}
												>
													<Material.TextField
														required
														name="name"
														label="name"
														value={values["name"]}
														onChange={(e) => {
															this.setState({});
															setFieldValue("name", e.target.value);
														}}
													/>
													<Material.TextField
														required
														label="price"
														value={values["price"]}
														type="number"
														inputProps={{
															inputMode: "numeric",
															pattern: "[0-9]*",
														}}
														onChange={(e) => {
															setFieldValue("price", e.target.value);
														}}
													/>
													<Material.Select
														labelId="demo-simple-select-standard-label"
														id="demo-simple-select-standard"
														value={values["category"]}
														onChange={(e) => {
															console.log(e.target.value);
															setFieldValue("category", e.target.value);
														}}
													>
														<Material.InputLabel id="demo-simple-select-standard-label">
															Category
														</Material.InputLabel>
														<Material.MenuItem value="Room Cleaning">
															Room Cleaning
														</Material.MenuItem>
														<Material.MenuItem value="Pest Control">
															Pest Control
														</Material.MenuItem>
														<Material.MenuItem value="Plumber">
															Plumber
														</Material.MenuItem>
													</Material.Select>
													<Material.TextField
														required
														multiline
														label="address"
														value={this.state.address}
														type="text"
														rows={4}
														onChange={(e) => {
															this.setState({
																address: e.target.value,
															});
															setFieldValue("address", e.target.value);
														}}
													/>
													<Material.TextField
														required
														multiline
														label="Description"
														value={values["description"]}
														type="text"
														rows={4}
														onChange={(e) => {
															setFieldValue("description", e.target.value);
														}}
													/>
													{status && (
														<div className={"alert alert-danger"}>
															{status.toString()}
														</div>
													)}

													<div className="d-grid justify-content-center">
														<Button
															value={this.props.location.state ? "Update" : "Create"}
															type="submit"
															onClick={() => { }}
														></Button>
														{this.props.location.state && (
															<Button
																value="Delete"
																type="submit"
																onClick={() => {
																	AppService.delete(this.props.location.state.id).then((res) => {
																		this.routingFunction();
																	})
																}}
															></Button>
														)}
														{isSubmitting && (
															<img
																alt="load"
																src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
															/>
														)}
													</div>
												</Material.FormControl>
											</Paper>
										</Box>
									</Material.Grid>
									<Material.Grid
										xs={10}
										sx={{
											backgroundColor: "blue",
											width: "83%",
											height: "100vh",
										}}
										item
									>
										<LoadScript googleMapsApiKey="AIzaSyB7AbECqCey2hPmL1JMcTfvfDqPrVWji8o">
											<GoogleMap
												id="map"
												zoom={5}
												center={{
													lat: this.state.markerPosition.lat,
													lng: this.state.markerPosition.lng,
												}}
												mapContainerStyle={{
													width: "100%",
													height: "100vh",
												}}
												onClick={(place) =>
													this.onMouseOverEvent(place, setFieldValue)
												}
											>
												<Marker position={this.state.markerPosition}></Marker>
											</GoogleMap>
										</LoadScript>
									</Material.Grid>
								</Material.Grid>
							</Form>
						);
					}}
				</Formik>
			</Box>
		);
	}
}

export default withRouter(NewAppliances);
