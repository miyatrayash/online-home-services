/** @format */

import React from "react";
import { withRouter } from "react-router";
import * as Material from "@mui/material";
import { OrderService } from "services";

class CheckOut extends React.Component {
	render() {
		if (!this.props.location.state) {
			this.props.history.replace("/");
		}
		const { service, totalPerson, totalPrice, origin } =
			this.props.location.state;
		return (
			<Material.Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					width: "100%",
				}}
			>
				<Material.Paper
					elevation={10}
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "center",
						borderRadius: 4,
						"& .MuiBox-root": {
							display: "flex",
							justifyContent: "center",
							width: "100%",
						},
					}}
				>
					<Material.Grid container>
						<Material.Grid xs={12} item>
							<Material.Box>
								<h1>{service.name}</h1>
							</Material.Box>
						</Material.Grid>
						<Material.Grid xs={6} item>
							<Material.Box>
								<h4>{service.category}</h4>
							</Material.Box>
						</Material.Grid>
						<Material.Grid xs={6} item>
							<Material.Box>
								<h4>{totalPerson} Person</h4>
							</Material.Box>
						</Material.Grid>
						<Material.Grid xs={6} item>
							<Material.Box>Your Address is {origin}</Material.Box>
						</Material.Grid>
						<Material.Grid xs={6} item>
							<Material.Box>
								<h4>total Price - {totalPrice}</h4>
							</Material.Box>
						</Material.Grid>

						<Material.Grid xs={12} item>
							<Material.Box>
								<h4>Please Confirm your order by clicking on confirm button</h4>
							</Material.Box>
						</Material.Grid>
						<Material.Grid xs={6} item>
							<Material.Box></Material.Box>
						</Material.Grid>
						<Material.Grid xs={6} item>
							<Material.Box>
								<Material.Button
									size={"large"}
									onClick={() => {
										OrderService.create({
											price: totalPrice,
											source: origin[0],
											ownerID: service.owner,
											serviceID: service.id,
											person: totalPerson,
											category: service.category
										});
										this.props.history.push("/orders")
									}}
								>
									Confirm
								</Material.Button>
								<Material.Button
									size={"large"}
									onClick={this.props.history.goBack}
								>
									Cancel
								</Material.Button>
							</Material.Box>
						</Material.Grid>
					</Material.Grid>
				</Material.Paper>
			</Material.Box>
		);
	}
}

export default withRouter(CheckOut);
