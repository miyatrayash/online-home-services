import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { authHeader } from 'helpers';

axios.defaults.baseURL = "http://localhost:4000/";
axios.defaults.headers =  authHeader();
axios.interceptors.response.use((response) => {
	//console.log("Response:", JSON.stringify(response, null, 2));
	return response;
});
ReactDOM.render(
	<React.StrictMode>
		
		<App />
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
