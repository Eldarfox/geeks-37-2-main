import React, { useState } from 'react';
import User from '../../components/user/User';
import Content from '../../components/content/content';
import Example from '../../components/example/Example';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from "../../components/Button";
import List from "../../components/list/List";



const Main = () => {
    const [show, setShow] = useState(false)
    const [inputValue, setInputValue] = useState('')
    console.log(show,'show');
    const list = [
        {
            id: 1,
            title: 'coding',
            completed: false
        },
        {
            id: 2,
            title: 'eat',
            completed: false
        },
        {
            id: 3,
            title: 'sleep',
            completed: false
        }
    ]

    const handleShow = () => {
        setShow(!show)
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setInputValue(event.target.value)
    }
    return (
        <>
            <h1>hello</h1>
            <List list={list}/>
            <User name={'Bakyt'} age={18} phone={468465165146}/>
            <Content text={'Bakyt'} number={18} boolean={true}/>
            <Example>
                <p style={{ color: 'yellowgreen' }}>Bakyt</p>
            </Example>
            <Button action={handleShow} text={'Открыть модалку'}/>
            {
                show && <Modal action={handleShow}>
                   content
                </Modal>
            }
            <Input placeholder={'напишите текст'} onChange={handleChange}/>
            <Input placeholder={'напишите текст'} onChange={handleChange}/>
            <Input placeholder={'напишите текст'} onChange={handleChange}/>
            <Input placeholder={'напишите текст'} onChange={handleChange}/>
            <Input placeholder={'напишите текст'} onChange={handleChange}/>
            <h1 style={{fontSize: '20px', color: 'red'}}> {inputValue}</h1>
        </>
    );
};

export default Main;