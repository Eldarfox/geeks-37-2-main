import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import classes from './FormAxios.module.css';
import button from '../../components/Button';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import input from '../../components/input/Input';
import {postAxios} from "../fetch/Fetch";


const regExpAge = new RegExp(/^(100|[1-9][0-9]?|0)$/);
export const schema = Yup.object().shape({
    id: Yup.string().trim().required('обязательное поле').min(1, 'необходимо минимум 1 символа'),
    surname: Yup.string().trim().required('обязательное поле').min(3, 'необходимо минимум 3 символа'),
    name: Yup.string().trim().required('обязательное поле').min(3, 'необходимо минимум 3 символа'),
    groupId: Yup.string().trim().required('обязательное поле').min(1, 'необходимо минимум 1 символа'),
});

const FormAxios = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm(
        {
            resolver: yupResolver(schema)
        }
    );

    const submit = (data) => {
        postAxios('student',data)
        console.log(data);
    };
    const error = (data) => {
        console.log(data);
    };

    const name = watch('name');

    const isName = () => {
        console.log('Вызвана');
        return true;
    };

    return (
        <form onSubmit={handleSubmit(submit, error)}>
            <p style={{ fontSize: 20, color: 'red' }}>{name}</p>
            <input className={classes.input}
                   type={'text'}
                   aria-invalid={errors.id ? true : false}
                   {...register('id',)}/>
            <input type={'text'}
                   aria-invalid={errors.name ? true : false}
                   {...register('name')}/>
            <input className={classes.input}
                   type={'text'}
                   aria-invalid={errors.surname ? true : false}
                   {...register('surname',)}/>
            <input className={classes.input}
                   type={'text'}
                   aria-invalid={errors.groupId ? true : false}
                   {...register('groupId',)}/>
            <button>send</button>
        </form>
    );
};

export default FormAxios;