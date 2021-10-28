/** @format */
import { authHeader, handleResponse } from "helpers";
import { authenticationService } from "services";
import axios from "axios";
const OrderService = {
	getAll,
	getById,
	getByCustomer,
	getByOwner,
	create,
	update,
	delete: _delete,
};

function getAll() {
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios.get(`services`, requestOptions).catch(handleResponse);
}

function create(service) {
	const requestOptions = {
		method: "POST",
		headers: { ...authHeader(), "Content-Type": "application/json" },
	};

	return axios
		.post(
			`orders/create`,
			JSON.stringify({
				customerID: authenticationService.currentUserValue._id,
				...service,
			}),
			requestOptions,
		)
		.catch(handleResponse);
}

function getByCustomer() {
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios
		.get(
			`orders/customer/${authenticationService.currentUserValue._id}`,
			requestOptions,
		)
		.catch(handleResponse);
}
function getByOwner() {
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios
		.get(
			`orders/owner/${authenticationService.currentUserValue._id}`,
			requestOptions,
		)
		.catch(handleResponse);
}

function getById(id) {
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios.get(`orders/${id}`, requestOptions).catch(handleResponse);
}

async function update(order,getServices) {
	const requestOptions = {
		headers: { ...authHeader(), "Content-Type": "application/json" },
	};

	const { id, ...data } = order;
	console.log(data);

	
	return await axios
		.put(`orders/${order.id}`, JSON.stringify(data), requestOptions)
		.catch(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	return axios
		.delete(`orders/${id}`, { headers: authHeader() })
		.catch(handleResponse);
}

export default OrderService;
