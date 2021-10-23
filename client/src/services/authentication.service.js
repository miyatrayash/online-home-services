/** @format */

import { BehaviorSubject } from "rxjs";

import { handleResponse } from "helpers";
import axios from "axios";

const currentUserSubject = new BehaviorSubject(
	JSON.parse(localStorage.getItem("currentUser")),
);

const authenticationService = {
	login,
	logout,
	register,
	currentUser: currentUserSubject.asObservable(),
	get currentUserValue() {
		return currentUserSubject.value;
	},
};

async function login(username, password) {
	return axios
		.post(
			"users/authenticate",
			{ username, password },
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		)
		.catch(handleResponse)
		.then((response) => {
			console.log("here");
			localStorage.setItem("currentUser", JSON.stringify(response.data));
			currentUserSubject.next(response.data);
			return response.data;
		})
		.catch((error) => {
			return Promise.reject(error);
		});
}
async function register(user) {
	return axios
		.post("users/register", user, {
			headers: {
				"Content-Type": "application/json",
			},
		})
		.catch(handleResponse);
}

function logout() {
	// remove user from local storage to log user out
	localStorage.removeItem("currentUser");
	currentUserSubject.next(null);
}

export default authenticationService;
