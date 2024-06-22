import React from 'react';


const Button = ({text, action, className}) => {
    return (
        <button className={className} onClick={action}>{text}</button>
    );
};


export default Button;