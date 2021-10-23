/** @format */

import { AppService } from "services";
import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ArrowRightRounded } from "@mui/icons-material";
import { withRouter } from "react-router-dom";
import * as Material from "@mui/material";
class MyAppliances extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			services: null,
		};
		this.getServices = this.getServices.bind(this);
		this.change = this.change.bind(this);
		this.routingFunction = this.routingFunction.bind(this);
		this.routingFunctionEdit = this.routingFunctionEdit.bind(this);
	}

	componentDidMount() {
		this.getServices("");
	}
	routingFunction() {
		this.props.history.push({
			pathname: `/createServices`,
		});
	}

	routingFunctionEdit(params) {
		this.props.history.push({
			pathname: `/createServices`,
			state:params
		});
	}
	getServices(category) {
		AppService.getAllByUser().then((services) => {
			var data = services.data;
			//console.log(user)
			if (category !== "") {
				data = data.filter((service) => {
					return service.category === category;
				});
			}
			this.setState({ services: data });
		});
		console.log(this.state.services);
	}

	change(e) {
		this.getServices(e.target.value);
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
									width: "50%",
									display: "flex",
									justifyContent: "center",
									borderRadius: 4,
								}}
							>
								<Material.FormControl
									variant="standard"
									sx={{ m: 1, minWidth: 120 }}
								>
									<Material.InputLabel id="demo-simple-select-standard-label">
										Category
									</Material.InputLabel>
									<Material.Select
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
													backgroundColor: "#000",
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
												onClick={() => this.routingFunctionEdit(service)}
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
																{" -- " + service.description}
															</Material.Typography>
														</React.Fragment>
													}
												/>

												<ArrowRightRounded fontSize="large" />
											</Material.ListItemButton>
										))}
								</Material.List>
							</Paper>
						</Box>
					</Material.Grid>
					<Material.Grid xs={3} item>
						<Box
							sx={{
								width: "100%",
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Paper
								elevation={5}
								sx={{
									width: "50%",
									display: "flex",
									justifyContent: "center",
									borderRadius: 4,
									padding: 1,
								}}
							>
								<Material.Button
									variant="contained"
									color="success"
									onClick={() => {
										this.routingFunction();
									}}
								>
									Add New Service
								</Material.Button>
							</Paper>
						</Box>
					</Material.Grid>
				</Material.Grid>
			</Box>
		);
	}
}

export default withRouter(MyAppliances);
