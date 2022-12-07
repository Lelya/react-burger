import React, {useState} from 'react';
import styles from '../pages.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {postRequest} from "../../services/api";
import {LOGIN_URL} from "../../constants/burger-constants";
import {useDispatch, useSelector} from "react-redux";
import {USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../../services/actions";

export function Login() {
    const [values, setValue] = useState({
        email: "",
        password: "",
    })
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const errorLogin = useSelector(store => store.userInfo.loginError);

    const handleChange = (e) => {
        setValue({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        postRequest(LOGIN_URL, values )
            .then(result => {
                if (result.success) {
                    const accessToken = result.accessToken.split('Bearer ')[1];
                    const refreshToken = result.refreshToken;
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        user: result.user,
                    })
                    history.replace({ pathname: '/' });
                } else {
                    dispatch({
                        type: USER_LOGIN_ERROR
                    })
                    setErrorMessage(result.message)
                }
            })
            .catch(error => {
                dispatch({
                    type: USER_LOGIN_ERROR
                })
                setErrorMessage(error)
            })
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <h2 className="text text_type_main-medium pb-6">Вход</h2>
                    <form onSubmit={(e) => handleLogin(e)}>
                         <EmailInput
                             name={'email'}
                             placeholder="Логин"
                             isIcon={true}
                             value={values.email}
                             onChange={handleChange}
                             extraClass="mb-2 pb-6"
                         />
                         <PasswordInput
                             name={'password'}
                             value={values.password}
                             onChange={handleChange}
                             extraClass="mb-2 pb-6"
                         />
                        {errorLogin && (
                            <div className={`${styles.text_error} mb-2`}>
                                <span className="text text_type_main-default">{errorMessage}</span>
                            </div>
                        )}
                        <div className="pb-20">
                             <Button htmlType="submit" type="primary" size="medium" >
                                 Войти
                             </Button>
                         </div>
                    </form>
                    <div className={styles.login_bottom}>
                        <p>
                            <span className="text text_type_main-default text_color_inactive">
                                Вы — новый пользователь?
                            </span>
                            <Link className="text text_type_main-default" to="/register">
                                 Зарегистрироваться
                            </Link>
                        </p>
                    </div>
                    <div className={styles.login_bottom}>
                        <p>
                            <span className="text text_type_main-default text_color_inactive">
                                забыли пароль?
                            </span>
                            <Link className="text text_type_main-default" to="/forgot-password">
                                Восстановить пароль
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}