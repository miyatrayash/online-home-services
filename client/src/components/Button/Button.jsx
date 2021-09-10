import React from "react";
import "./Button.css"

function Button({value,type}) {
    

    return <input type={type} value={value} className="btn solid" />;
}


export default Button;