import React from 'react';
import classes from './modal.module.css';
import Button from "../Button";
import Input from "../input/Input";


const Modal = ({handleShow , handleChangeTask , handleAdd}) => {
    return (
        <>
            <div className={classes.modalWrapper} onClick={handleShow}/>
            <div className={classes.modalContent}>
                <Button action={handleShow} text={'close'}/>
                <Input onChange={handleChangeTask} placeholder={"введите название задания"}/>
                <Button action={handleAdd} text={"add"}/>
            </div>
        </>
    );
};

export default Modal;