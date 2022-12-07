import React, {useState} from 'react';
import styles from '../pages.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {postRequest} from "../../services/api";
import {RASSWORD_RESET_URL} from "../../constants/burger-constants";
import {useDispatch, useSelector} from "react-redux";
import {RESET_PASSWORD, RESET_PASSWORD_ERROR} from "../../services/actions";

export function ResetPassword() {
    const [values, setValue] = useState({
        password: "",
        token: ""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const errorResetPassword = useSelector(store => store.userInfo.resetPasswordError);
    const userLoggedIn = useSelector(store => store.userInfo.userLoggedIn);
    const forgotPasswordVisited = useSelector(store => store.userInfo.forgotPasswordVisited);

    if (userLoggedIn) {
        return <Redirect to={'/'} />;
    }

    if (!forgotPasswordVisited) {
        return <Redirect to={'/forgot-password'} />;
    }
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
                    dispatch({
                        type: RESET_PASSWORD,
                    });
                    history.replace({ pathname: '/login' });
                } else {
                    dispatch({
                        type: RESET_PASSWORD_ERROR,
                    });
                    setErrorMessage(result.message)
                }
            })
            .catch(error => {
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                });
                setErrorMessage(error);
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
                        {errorResetPassword && (
                            <div className={`${styles.text_error} mb-2`}>
                                <span className="text text_type_main-default">{errorMessage}</span>
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