/** @format */

const express = require("express");
const router = express.Router();
const AppService = require("./appliances.service");
const authorize = require("helpers/authorize");
const Role = require("helpers/role");

router.post("/create", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.get("/user/:uid",getAllById);
module.exports = router;


function create(req, res, next) {
	console.log("in Controller");
	AppService.create(req.body).then(() =>
		res.json({ message: "created Successfully" }),
	);
}

function getAll(req, res, next) {
	AppService
		.getAll()
		.then((app) => res.json(app))
		.catch((err) => next(err));
}


function getById(req, res, next) {

	AppService
		.getById(req.params.id)
		.then((app) => (app ? res.json(app) : res.sendStatus(404)))
		.catch((err) => next(err));
}


function getAllById(req, res, next) {
	AppService.getAllById(req.params.uid)
		.then((app) => (app ? res.json(app) : res.sendStatus(404)))
		.catch((err) => next(err));
}


function update(req, res, next) {
	console.log(req.body);
	AppService
		.update(req.params.id,req.body)
		.then((app) => {

			app
				? res.json(app)
				: res.status(400).json({ message: "something went wrong" });
		})
		.catch((err) => next(err));
}

function _delete(req, res, next) {
	AppService
		.delete(req.params.id)
		.then(() => res.json({ message: "deleted Successfully" }))
		.catch((err) => next(err));
}
