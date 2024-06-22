import React, { useEffect, useState } from 'react';
import Modal from '../../components/modal/Modal';
import Input from '../../components/input/Input';
import Button from "../../components/Button";
import List from "../../components/list/List";
import Pagination from "../../components/pagination/Pagination";

const TodoPage = () => {
    const [show, setShow] = useState(false);
    const [inputTask, setInputTask] = useState('');
    const [regex, setRegex] = useState('');
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState('all');
    const [offset, setOffset] = useState(0);

    const limit = 10;
    const BASE_URL = 'https://jsonplaceholder.typicode.com/';
    const API = 'todos';

    useEffect(() => {
        const getApi = async () => {
            const response = await fetch(`${BASE_URL}${API}?_limit=${limit}&_start=${offset}`);
            const data = await response.json();
            setTasks(data);
        };
        getApi();
    }, [offset]);

    const handleShow = () => {
        setShow(prev => !prev);
    };

    const handleChangeSearch = (event) => {
        setRegex(event.target.value);
    };

    const handleChangeTask = (event) => {
        setInputTask(event.target.value);
    };

    const handleAdd = () => {
        setTasks(prev => [
            ...prev,
            { id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, title: inputTask, completed: false }
        ]);
        setInputTask('');
        setShow(false);
    };

    const handleDone = (id) => {
        setTasks(prev =>
            prev.map(task => task.id === id ? { ...task, completed: !task.completed } : task)
        );
    };

    const handleEdit = (title, id) => {
        setTasks(prev =>
            prev.map(task => task.id === id ? { ...task, title } : task)
        );
    };

    const handleDelete = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
    };

    const searchTask = (tasks) => {
        return tasks.filter(task => task.title.match(new RegExp(regex, 'i')));
    };

    const filteredTasks = searchTask(tasks).filter(task => {
        if (filter === 'all') return true;
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
    });

    const page = Math.floor(offset / limit) + 1;

    const handlePrev = () => {
        if (offset > 0) {
            setOffset(prev => prev - limit);
        }
    };

    const handleNext = () => {
        setOffset(prev => prev + limit);
    };

    const handleClear = () => {
        setTasks([]);
        localStorage.removeItem("tasks");
    };

    return (
        <>
            <Button action={handleClear} text={'очистить все задания'} />
            <Input placeholder={'поиск'} onChange={handleChangeSearch} />
            <Button action={handleShow} text={'Открыть модалку'} />
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="all">Все таски</option>
                <option value="completed">Выполненные</option>
                <option value="incomplete">Не выполненные</option>
            </select>
            {show && (
                <Modal
                    handleShow={handleShow}
                    handleChangeTask={handleChangeTask}
                    handleAdd={handleAdd}
                />
            )}
            <List
                list={filteredTasks}
                handleDelete={handleDelete}
                handleDone={handleDone}
                handleEdit={handleEdit}
            />
            <Pagination prev={handlePrev} next={handleNext} page={page} />
        </>
    );
};

export default TodoPage;
