/** @format */

import React from "react";
import "./Button.css";

function Button({ value, type, onClick=()=>{} }) {
	return <input type={type} value={value} className=" btn  " onClick={() => onClick()}/>;
}

export default Button;
