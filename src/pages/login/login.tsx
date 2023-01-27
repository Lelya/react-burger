import React, {FormEvent} from 'react';
import styles from '../pages.module.css';
import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import {useDispatch, useSelectorTS} from "../../utils/types";
import {logInThunk} from "../../services/actions/user-actions";
import {useForm} from "../../hooks/useForm";

export function Login() {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const errorLogin = useSelectorTS(store => store.userInfo.loginError);

    const handleLogin = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(logInThunk(values));
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <h2 className="text text_type_main-medium pb-6">Вход</h2>
                    <form onSubmit={handleLogin}>
                         <EmailInput
                             name={'email'}
                             placeholder="Логин"
                             isIcon={true}
                             value={values.email || ""}
                             onChange={handleChange}
                             extraClass="mb-2 pb-6"
                         />
                         <PasswordInput
                             name={'password'}
                             value={values.password || ""}
                             onChange={handleChange}
                             extraClass="mb-2 pb-6"
                         />
                        {errorLogin && (
                            <div className={`${styles.text_error} mb-2`}>
                                <span className="text text_type_main-default">Ошибка авторизации</span>
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