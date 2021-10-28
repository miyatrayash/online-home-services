/** @format */

import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { withRouter } from "react-router-dom";
import * as Material from "@mui/material";
import { OrderService } from "services";

class MyAppliances extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: null,
			category: "",
			status: "",
		};
		this.getServices = this.getServices.bind(this);
		this.change = this.change.bind(this);
	}

	componentDidMount() {
		this.getServices({ category: "", status: "" });
	}
	routingFunction() {
		this.props.history.push({
			pathname: `/createServices`,
		});
	}

	routingFunctionEdit(params) {
		this.props.history.push({
			pathname: `/createServices`,
			state: params,
		});
	}

	getServices({ category, status }) {
		OrderService.getByCustomer().then((services) => {
			var data = services.data;
			//console.log(user)
			if (category !== "") {
				data = data.filter((service) => {
					return service.category === category;
				});
			}
			if (status !== "") {
				data = data.filter((service) => {
					return service.status === status;
				});
			}
			data.sort(function (a, b) {
				return a.createdDate < b.createdDate;
			});
			this.setState({ services: data });
		});
	}

	change(e) {
		if (e.target.name === "category") {
			this.setState({
				category: e.target.value,
			});
			this.getServices({ category: e.target.value, status: this.state.status });
		} else {
			this.setState({
				status: e.target.value,
			});
			this.getServices({
				status: e.target.value,
				category: this.state.category,
			});
		}
	}

	render() {
		const { services } = this.state;
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Material.Grid container>
					<Material.Grid xs={3} item>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Paper
								elevation={5}
								sx={{
									width: "auto",
									borderRadius: 4,
									
								}}
							>
								<Material.Grid container 
									sx={{
										display: "flex",
										justifyContent: "center"
									}}
								>
									<Material.Grid  item>
										<Material.FormControl
											variant="standard"
											sx={{ m: 1, minWidth: 120 }}
										>
											<Material.InputLabel id="demo-simple-select-standard-label">
												Category
											</Material.InputLabel>
											<Material.Select
												name="category"
												labelId="demo-simple-select-standard-label"
												id="demo-simple-select-standard"
												label="Category"
												onChange={this.change}
											>
												<Material.MenuItem value="">
													<em>None</em>
												</Material.MenuItem>
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
										</Material.FormControl>
									</Material.Grid>
									<Material.Grid  item>
										<Material.FormControl
											variant="standard"
											sx={{ m: 1, minWidth: 120 }}
										>
											<Material.InputLabel id="demo-simple-select-standard-label1">
												Status
											</Material.InputLabel>
											<Material.Select
												name="status"
												labelId="demo-simple-select-standard-label1"
												label="Category"
												onChange={this.change}
											>
												<Material.MenuItem value="">
													<em>None</em>
												</Material.MenuItem>
												<Material.MenuItem value="Pending">
													Pending
												</Material.MenuItem>
												<Material.MenuItem value="Accepted">
													Accepted
												</Material.MenuItem>
												<Material.MenuItem value="Finished">
													Finished
												</Material.MenuItem>
											</Material.Select>
										</Material.FormControl>
									</Material.Grid>
								</Material.Grid>
							</Paper>
						</Box>
					</Material.Grid>
					<Material.Grid xs={6} item>
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Paper
								elevation={5}
								sx={{
									width: "100%",
									display: "flex",
									justifyContent: "center",
									borderRadius: 4,
								}}
							>
								<Material.List
									sx={{
										width: "100%",
										maxHeight: 500,
										overflowY: "scroll",
									}}
								>
									{services &&
										services.map((service) => (
											<Material.ListItemButton
												id="ListItem"
												key={service.id}
												sx={{
													margin: 2,
													padding: 3,
													backgroundColor:
														service.status === "Accepted" ? "#00FF00" : "#000",
													borderRadius: 4,

													".text": {
														color: "white",
													},
													":hover": {
														backgroundColor: "#e0e0e0",
														".text": {
															color: "black",
														},
													},
												}}
											>
												<Material.ListItemText
													primary={
														<React.Fragment>
															<Material.Typography
																class="text"
																sx={{ display: "inline" }}
																component="span"
																variant="body2"
															>
																{service.name}
															</Material.Typography>
														</React.Fragment>
													}
													secondary={
														<React.Fragment>
															<Material.Typography
																class="text"
																sx={{ display: "inline" }}
																component="span"
																variant="body2"
															>
																{service.category}
																{" -- " + service.price}
																{" Status: " + service.status}
															</Material.Typography>
															{service.status === "Accepted" && (
																<Material.Typography
																	class="text"
																	sx={{ display: "inline" }}
																	component="span"
																	variant="body2"
																>
																	Your Service In your Way
																</Material.Typography>
															)}
															{service.status === "Pending" && (
																<Material.Typography
																	class="text"
																	sx={{ display: "inline" }}
																	component="span"
																	variant="body2"
																>
																	Your service yet to be Accepted
																</Material.Typography>
															)}
														</React.Fragment>
													}
												/>

												{service.status === "Pending" && (
													<Material.Button variant="contained" onClick={()=>{
														OrderService.delete(service.id).then((res)=>{
															this.getServices({
																category: this.state.category,
																status: this.state.status,
															});
														});
													}}>
														Cancel
													</Material.Button>
												)}
											</Material.ListItemButton>
										))}
								</Material.List>
							</Paper>
						</Box>
					</Material.Grid>
				</Material.Grid>
			</Box>
		);
	}
}

export default withRouter(MyAppliances);
