import React from 'react';
import { useForm } from 'react-hook-form';
import classes from "./Form.module.css";

const Form = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    const password = watch('password');

    return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <h2>Регистрация</h2>
            <div className={classes.formGroup}>
                <label>Имя:</label>
                <input
                    {...register('name', {
                        required: 'Имя обязательно.',
                        minLength: { value: 3, message: 'Имя должно содержать не менее 3 символов.' },
                        maxLength: { value: 30, message: 'Имя должно содержать не более 30 символов.' }
                    })}
                />
                {errors.name && <span className={classes.error}>{errors.name.message}</span>}
            </div>
            <div className={classes.formGroup}>
                <label>Электронная почта:</label>
                <input
                    type="email"
                    {...register('email', {
                        required: 'Электронная почта обязательна.',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: 'Невалидный адрес электронной почты.'
                        }
                    })}
                />
                {errors.email && <span className={classes.error}>{errors.email.message}</span>}
            </div>
            <div className={classes.formGroup}>
                <label>Пароль:</label>
                <input
                    type="password"
                    {...register('password', {
                        required: 'Пароль обязателен.',
                        minLength: { value: 8, message: 'Пароль должен содержать не менее 8 символов.' },
                        validate: {
                            hasNumber: (value) => /\d/.test(value) || 'Пароль должен содержать хотя бы одну цифру.',
                            hasUpperCase: (value) => /[A-Z]/.test(value) || 'Пароль должен содержать хотя бы одну заглавную букву.'
                        }
                    })}
                />
                {errors.password && <span className={classes.error}>{errors.password.message}</span>}
            </div>
            <div className={classes.formGroup}>
                <label>Подтверждение пароля:</label>
                <input
                    type="password"
                    {...register('confirmPassword', {
                        required: 'Подтверждение пароля обязательно.',
                        validate: (value) => value === password || 'Пароли не совпадают.'
                    })}
                />
                {errors.confirmPassword && <span className={classes.error}>{errors.confirmPassword.message}</span>}
            </div>
            <button type="submit" className={classes.submitButton}>Регистрация</button>
        </form>
    );
};

export default Form;
