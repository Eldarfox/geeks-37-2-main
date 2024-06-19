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
    const [inputTask , setInputTask] = useState('')
    const [regex, setRegex] = useState('')
    const [tasks , setTasks] = useState ([
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
    ])

    const handleShow = () => {
        setShow(!show)
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setInputValue(event.target.value)
    }

    const handleChangeTask = (event) => {
        console.log(event.target.value)
        setInputValue(event.target.value)
    }

    const handleChangeSearch = (event) => {
        console.log(event.target.value)
        setRegex(event.target.value)
    }


    const handleAdd = () => {
        setTasks([...tasks , {
            id: tasks.length>0 ? tasks[tasks.length-1].id+1 : 1,
            title: inputTask ,
            completed: false
        }])
    }

    const handleDelete = (id) => {
        setTasks(tasks.filter(task =>task.id!==id))
    }

    const handleDone = (id) => {
        tasks.map(task => {
            if(task.id===id){
                return task.completed=!task.completed
            }
        })
        setTasks([...tasks])
    }

    const searchTask = () => {
        return tasks.filter(task => task.title.match(regex))
    }
    const filterTasks = searchTask()
    return (
        <>
            <h1>hello</h1>
            <List list={filterTasks} handleDelete={handleDelete} handleDone={handleDone}/>
            <User name={'Bakyt'} age={18} phone={468465165146}/>
            <Content text={'Bakyt'} number={18} boolean={true}/>
            <Example>
                <p style={{ color: 'yellowgreen' }}>Bakyt</p>
            </Example>
            <Input onChange={handleChangeSearch} placeholder={"search"}/>
            <Button action={handleShow} text={'Открыть модалку'}/>

            {
                show && <Modal handleShow={handleShow}
                               handleAdd={handleAdd}
                               handleChangeTask={handleChangeTask}

                />
            }
            {/*<Input placeholder={'напишите текст'} onChange={handleChange}/>*/}
            {/*<Input placeholder={'напишите текст'} onChange={handleChange}/>*/}
            {/*<Input placeholder={'напишите текст'} onChange={handleChange}/>*/}
            {/*<Input placeholder={'напишите текст'} onChange={handleChange}/>*/}
            {/*<Input placeholder={'напишите текст'} onChange={handleChange}/>*/}
            <h1 style={{fontSize: '20px', color: 'red'}}> {inputValue}</h1>
        </>
    );
};

export default Main;