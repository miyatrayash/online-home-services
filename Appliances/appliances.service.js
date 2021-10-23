/** @format */

const db = require("../helpers/db");
const Appliances = db.Appliances;

module.exports = {
	create,
	getAll,
	getById,
	getAllById,
	update,
	delete: _delete,
};

async function getAll() {
	return await Appliances.find({});
}

async function getById(id) {
	return await Appliances.findById(id);
}
async function getAllById(id) {
	return await Appliances.find({ owner: id });
}

async function create(params) {
	console.log("in Services");
	const appliance = new Appliances(params);
	console.log(params);

	appliance.loc.type = "Point";
	appliance.loc.coordinates = [params.lat, params.lng];

	await appliance.save();
}

async function update(id, params) {
	const appliance = await Appliances.findById(id);

	// validate
	if (!appliance) throw "service not found";

	Object.assign(appliance, params);
	appliance.loc.type = "Point";
	appliance.loc.coordinates = [params.lat, params.lng];

	await appliance.save();

	return appliance.toJSON();
}

async function _delete(id) {
	await Appliances.findByIdAndRemove(id);
}
