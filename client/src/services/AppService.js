/** @format */
import { authHeader, handleResponse } from "helpers";
import { authenticationService } from "services";
import axios from "axios";
const AppService = {
	getAll,
	getById,
    getAllByUser,
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
		.post(`services/create`, JSON.stringify({owner:authenticationService.currentUserValue._id,...service}), requestOptions)
		.catch(handleResponse);
}


function getAllByUser() {
    
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios.get(`services/user/${authenticationService.currentUserValue._id}`, requestOptions).catch(handleResponse);
}

function getById(id) {
	const requestOptions = { method: "GET", headers: authHeader() };
	return axios.get(`services/${id}`, requestOptions).catch(handleResponse);
}
function update(service) {
	const requestOptions = {
		headers: { ...authHeader(), "Content-Type": "application/json" }
	};

	const { _id, ...data} = service;
	console.log(data);
	return axios
		.put(`services/${service._id}`, JSON.stringify(data),requestOptions)
		.catch(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
	return axios
		.delete(`services/${id}`, { headers: authHeader() })
		.catch(handleResponse);
}

export default AppService;
