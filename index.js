/** @format */

const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

// Connect to the database
mongoose
	.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log("Database connected successfully"))
	.catch((err) => console.log(err));

// Since mongoose's Promise is deprecated, we override it with Node's Promise
mongoose.Promise = global.Promise;
app.use(cors());

app.use((req, res, next) => {
	res.setHeader(
		"Access-Control-Allow-Origin",
		req.header("origin") ||
			req.header("x-forwarded-host") ||
			req.header("referer") ||
			req.header("host"),
	);
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Credentials", true);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"COntent-Type",true
	);
	next();
});


app.use(bodyParser.json());

app.use("/", require("./routes/authentication"));

app.use((err, req, res, next) => {
	console.log(err);
	next();
});

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
