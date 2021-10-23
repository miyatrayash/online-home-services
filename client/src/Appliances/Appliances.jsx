/** @format */

import React from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { AppService } from "services";
import { withRouter } from "react-router-dom";
import * as Material from "@mui/material";
const defaultLocation = { lat: 20.5937, lng: 78.9629 };

class Appliances extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			services: null,
			currentService: null,
			open: false,
		};
		this.getServices = this.getServices.bind(this);
		this.onMouseOverEvent = this.onMouseOverEvent.bind(this);
		this.setOpen = this.setOpen.bind(this);
	}
	state = {
		markerPosition: defaultLocation,
		currentService: null,
		open: false,
	};

	setOpen(val, address) {
		this.setState({
			open: val,
			address: address,
		});
	}
	handleClickToOpen = (service) => {
		const matrix = new window.google.maps.DistanceMatrixService();

		matrix.getDistanceMatrix(
			{
				origins: [
					new window.google.maps.LatLng(
						this.state.markerPosition.lat,
						this.state.markerPosition.lng,
					),
				],
				destinations: [
					new window.google.maps.LatLng(
						service.loc.coordinates[0],
						service.loc.coordinates[1],
					),
				],
				travelMode: window.google.maps.TravelMode.DRIVING,
			},
			function (response, status) {
				console.log(response);
				if (response.rows[0].elements[0].distance.value > 50000) {
					alert("Service only For distence within 50 kms");
				} else {
					setOpen(true, response.originAddresses);
				}
			},
		);
		var setOpen = this.setOpen;
	};

	handleToClose = () => {
		this.setState({ open: false, currentService: null });
	};
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(function (position) {
			defaultLocation.lat = position.coords.latitude;
			defaultLocation.lng = position.coords.longitude;
		});
		this.getServices("");
	}
	onMouseOverEvent = (place) => {
		this.setState({
			markerPosition: { lat: place.latLng.lat(), lng: place.latLng.lng() },
		});
	};
	getServices(category) {
		AppService.getAll().then((services) => {
			var data = services.data;
			//console.log(user)
			if (category !== "") {
				data = data.filter((service) => {
					return service.category === category;
				});
			}

			this.setState({ services: data });
			this.setState({
				markerPosition: defaultLocation,
			});
		});
		console.log(this.state.services);
	}

	render() {
		const { services } = this.state;
		return (
			<>
				<LoadScript googleMapsApiKey="AIzaSyDZ8oFXmBuqyvfhvxBKKdOQfeo3y0Oj5Zs">
					<GoogleMap
						id="map"
						zoom={7}
						center={defaultLocation}
						mapContainerStyle={{
							width: "100%",
							height: "100vh",
						}}
						onClick={this.onMouseOverEvent}
					>
						{window.google && (
							<Marker
								icon={{
									url: "https://img.icons8.com/ios-glyphs/30/000000/place-marker.png",
									anchor: new window.google.maps.Point(0, 32),
									origin: new window.google.maps.Point(0, 0),
									size: new window.google.maps.Size(50, 50),
								}}
								position={this.state.markerPosition}
							/>
						)}

						{services &&
							services.map((service) => (
								<InfoWindow
									options={{
										isHidden: false,
										visible: true,
									}}
									marker={document.getElementById(service.id)}
									key={service.id + "box"}
									position={{
										lat: service.loc.coordinates[0],
										lng: service.loc.coordinates[1],
									}}
								>
									<Material.Paper>
										<Material.Grid container>
											<Material.Grid item xs={10}>
												<div>Name: {service.name}</div>
											</Material.Grid>
											<Material.Grid item xs={10}>
												<div>Category: {service.category}</div>
											</Material.Grid>
										</Material.Grid>
										<Material.Grid item xs={10}>
											<div>Price: {service.price}</div>
										</Material.Grid>
										<Material.Grid item xs={10}>
											<Material.Button
												variant="contained"
												onClick={() => {
													this.setState({ currentService: service });
													this.handleClickToOpen(service);
												}}
												
											>Order</Material.Button>
										</Material.Grid>
									</Material.Paper>
								</InfoWindow>
							))}
					</GoogleMap>
				</LoadScript>

				{this.state.open && (
					<Material.Dialog open={this.state.open} onClose={this.handleToClose}>
						<Material.DialogTitle>
							{this.state.currentService
								? this.state.currentService.name
								: "Title"}
						</Material.DialogTitle>
						<Material.DialogContent sx={{ margin: 3, padding: 3 }}>
							<form style={{ margin: 3 }}>
								<Material.Grid container>
									<Material.Grid item xs={10}>
										<Material.TextField
											id={"personNum"}
											sx={{ margin: 3 }}
											required
											label="person"
											type="number"
											inputProps={{
												inputMode: "numeric",
												pattern: "[0-9]*",
											}}
											onChange={(e) => {
												document.getElementById("totalPrice").value =
													e.target.value * this.state.currentService.price;
											}}
										/>
									</Material.Grid>
									<Material.Grid item xs={10}>
										<Material.InputLabel>Total Price</Material.InputLabel>
										<Material.TextField disabled id="totalPrice" />
									</Material.Grid>
								</Material.Grid>
							</form>
						</Material.DialogContent>
						<Material.DialogActions>
							<Material.Button
								onClick={this.handleToClose}
								color="primary"
								autoFocus
							>
								Close
							</Material.Button>
							<Material.Button
								onClick={() => {
									this.props.history.push({
										pathname: `/checkOut`,
										state: {
											totalPerson: document.getElementById("personNum").value,
											totalPrice: document.getElementById("totalPrice").value,
											service: this.state.currentService,
											origin: this.state.address,
										},
									});
								}}
								color="primary"
								autoFocus
							>
								Order
							</Material.Button>
						</Material.DialogActions>
					</Material.Dialog>
				)}
			</>
		);
	}
}

export default withRouter(Appliances);
