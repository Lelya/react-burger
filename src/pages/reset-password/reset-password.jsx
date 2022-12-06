import React, {useState} from 'react';
import styles from '../pages.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {postRequest} from "../../services/api";
import {RASSWORD_RESET_URL} from "../../constants/burger-constants";

export function ResetPassword() {
    const [values, setValue] = useState({
        password: "",
        token: ""
    })
    const [error, setError] = useState({
        message: "",
        value: false
    })
    const history = useHistory();

    const handleChange = (e) => {
        setValue({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    const handleReset = (e) => {
        e.preventDefault();
        postRequest(RASSWORD_RESET_URL, values )
            .then(result => {
                if (result.success) {
                    alert('Пароль обновлен!');
                    history.replace({ pathname: '/login' });
                } else {
                    setError({
                        message: result.message,
                        value: result.success,
                    })
                }
            })
            .catch(error => {
                setError({
                    message: error,
                    value: true,
                })
            })
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
                    <form onSubmit={(e) => handleReset(e)}>
                        <PasswordInput
                            name={'password'}
                            placeholder="Введите новый пароль"
                            value={values.password}
                            onChange={handleChange}
                            extraClass="mb-2 pb-6"
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            name={'token'}
                            value={values.token}
                            onChange={handleChange}
                            error={false}
                            size={'default'}
                            extraClass="mb-2 pb-6"
                        />
                        {!error.value && (
                            <div className={`${styles.text_error} mb-2`}>
                                <span className="text text_type_main-default">{error.message}</span>
                            </div>
                        )}
                        <div className="pb-20">
                             <Button htmlType="submit" type="primary" size="medium">
                                 Сохранить
                             </Button>
                         </div>
                    </form>
                    <div className={styles.login_bottom}>
                        <p>
                            <span className="text text_type_main-default text_color_inactive">
                                Вспомнили пароль?
                            </span>
                            <Link className="text text_type_main-default" to="/login">
                                 Войти
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}