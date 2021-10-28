/** @format */

const db = require("../helpers/db");
const Order = db.Order;

module.exports = {
	create,
	getAll,
	getById,
	getAllById,
    getByCustomerId,
    getByServiceId,
	update,
	delete: _delete,
};

async function getAll() {
	return await Order.find({});
}

async function getById(id) {
	return await Order.findById(id);
}
async function getAllById(id) {
	return await Order.find({ ownerID: id });
}

async function getByServiceId(id) {
	return await Order.find({ serviceID: id });
}
async function getByCustomerId(id) {
	return await Order.find({ customerID: id });
}
async function create(params) {
    
	const appliance = new Order(params);

	await appliance.save();
}

async function update(id, params) {
	const order = await Order.findById(id);

	// validate
	if (!order) throw "service not found";

	Object.assign(order, params);

	await order.save();

	return order;
}

async function _delete(id) {
	return await Order.findByIdAndRemove(id);
}
