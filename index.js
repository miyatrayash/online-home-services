/** @format */

require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("helpers/jwt");
const errorHandler = require("helpers/error-handler");

app.use(express.json({ limit: "16mb", extended: true }));
app.use(express.urlencoded({ limit: "16mb", extended: true }));
app.use(cors());
app.use(jwt());

// api routes
app.use("/users", require("./users/user.controller"));
app.use("/services", require("./Appliances/appliances.controller"));
app.use("/orders", require("./Orders/orders.controller"))

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === "production" ? 80 : 4000;
const server = app.listen(port, function () {
	console.log("Server listening on port " + port);
});
