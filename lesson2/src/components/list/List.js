import React from 'react';
import Todo from "../todo/Todo";
import classes from "./List.modal.css";

const List = ({list}) => {
    return (
        <ul className={classes}>
            {
                list.map(item => <Todo todo={item}/>)
            }
        </ul>
    );
};

export default List;