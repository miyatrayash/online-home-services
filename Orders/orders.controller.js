/** @format */

const express = require("express");
const router = express.Router();
const OrderService = require("./orders.services");

router.post("/create", create);
router.get("/", getAll);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
router.get("/customer/:id", getByCustomerId);
router.get("/owner/:id", getAllById);
router.get("/service/:id", getByServiceId);

module.exports = router;

function create(req, res, next) {
	OrderService.create(req.body)
		.then(() => {
			res.json({ message: "Order Created" });
		})
		.catch((err) => next(err));
}

function getAll(req, res, next) {
	OrderService.getAll()
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => next(err));
}
function getById(req, res, next) {
	OrderService.getById(req.params.id)
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => next(err));
}
function update(req, res, next) {

	OrderService.update(req.params.id, req.body)
		.then((order) => res.json(order))
		.catch((err) => next(err));
}
function _delete(req, res, next) {
	OrderService.delete(req.params.id)
		.then((order) => res.json(order))
		.catch((err) => next(err));
}
function getAllById(req, res, next) {
	OrderService.getAllById(req.params.id)
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => next(err));
}
function getByServiceId(req, res, next) {
	OrderService.getByServiceId(req.params.id)
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => next(err));
}
function getByCustomerId(req, res, next) {
	OrderService.getByCustomerId(req.params.id)
		.then((orders) => {
			res.json(orders);
		})
		.catch((err) => next(err));
}
