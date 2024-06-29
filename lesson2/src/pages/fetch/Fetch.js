import React, {useEffect, useState} from 'react';
import classes from "./Fetch.module.css";
import axios from "axios";
const BASE_URL = 'http://localhost:5000/'

export const postAxios = async (API , student)=>{
    const {id, name , surname , groupId} = data
    const response = await axios.post(`${BASE_URL}${API}` , {id, name , surname , groupId})
    const data = response.data
    console.log(data)
}
const Fetch = () => {
    const [students , setStudents] = useState([])
    console.log(students)
    const [refresh , setRefresh] = useState(false)
    const getApi = async (API) => {
        const response = await fetch(`${BASE_URL}${API}`)
        const data = await response.json()
        return data
    }
    const postApi = async (API) => {
        const response = await fetch(`${BASE_URL}${API}`,{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({surname: 'Sariev' , name: 'Beka' , id: '200' , groupId: 2})
        })
        const data = await response.json()
        console.log(data)
    }
    const patchApi = async (API , id) => {
        const response = await fetch(`${BASE_URL}${API}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({surname: 'Kemelov'})
        })
        const data = await response.json()
        console.log(data)
    }
    const deleteApi = async (API , id) => {
        const response = await fetch(`${BASE_URL}${API}/${id}`,{
            method: 'DELETE',
        })
        const data = await response.json()
        await setRefresh(prev=>!prev)
        console.log(data)
    }

    const getAxios = async (API)=>{
        const response = await axios(`${BASE_URL}${API}`)
        const data = response.data
        console.log(data)
    }


    useEffect(()=>{
        getApi('student').then(data => setStudents(data))
    },[refresh])
    return (
        <div className={classes.wrapper}>
            <button className={classes.btn} onClick={()=>getAxios('student')}>getAxios</button>
            <button className={classes.btn} onClick={()=>postAxios('student')}>postAxios</button>
            <button className={classes.btn} onClick={()=>getApi('student').then(data => setStudents(data))}>getApi</button>
            <button className={classes.btn} onClick={()=>postApi('student')}>postApi</button>
            <button className={classes.btn} onClick={()=>patchApi('student' , '1')}>patchApi</button>
            <button className={classes.btn} onClick={()=>deleteApi('student' , '200')}>deleteApi</button>
            {
                students.map(student=> <div key={student.id}>
                    <p>{student.id} {student.name}</p> <button className={classes.btn} onClick={()=>deleteApi('student' , student.id)}>deleteApi</button>
                </div>)
            }
        </div>
    );
};

export default Fetch;