import React from 'react';
import classes from "./Todo.modal.css";

const Todo = ({todo}) => {
    return (
        <div>
            <li className={classes.todo}>
                <p>id: {todo.id}</p>
                <p>title: {todo.title}</p>
                <p>completed: {todo.completed ? 'выполнено' : 'не выполнено'}</p>
            </li>
        </div>
    );
};

export default Todo;