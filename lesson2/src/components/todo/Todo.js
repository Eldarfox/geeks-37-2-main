import React, {useState} from 'react';
import classes from "./Todo.module.css";
import Button from "../Button";
import Input from "../input/Input";

const Todo = ({todo , handleDelete ,handleDone , handleEdit , currentEdit , isEdit}) => {
    const [input , setInput] = useState('')

    return (
        <>
            <li className={classes.todo}>
                <p>id: {todo.id}</p>
                <p>title: {todo.title}</p>
                <p>completed: {todo.completed ? 'выполнено' : 'не выполнено'}</p>
                <Button text={'edit'} action={() => handleEdit(todo.id )}/>
                <Button text={'delete'} action={() => handleDelete(todo.id )}/>
                <Button text={'done'} action={() => handleDone(todo.id )}/>
            </li>
            {
                isEdit && <div>
                    <Input onChange={event=> setInput(event.target.value)} placeholder={"введите новое название"}/>
                    <Button action={()=>{

                    }} text={'save'}/>
                    <Button action={()=>{

                    }} text={'cancel'}/>
                </div>
            }
        </>
    );
};

export default Todo;