/** @format */

import "./Input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Input({ type, placeholder, icon, onChange, value, className }) {
	console.log(icon);

	return (
		<div className="input-field">
			<FontAwesomeIcon icon={icon} className="i"></FontAwesomeIcon>
			<input
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				value={value}
				className={className}
			></input>
		</div>
	);
}

export default Input;
