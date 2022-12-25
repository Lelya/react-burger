import React, {FormEvent} from 'react';
import styles from '../pages.module.css';
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {resetPassword} from "../../services/actions/user-actions";

export function ResetPassword() {
    const { values, handleChange } = useForm({
        password: "",
        token: ""
    });
    const dispatch = useDispatch();
    // @ts-ignore
    const errorResetPassword = useSelector(store => store.userInfo.resetPasswordError);
    // @ts-ignore
    const userLoggedIn = useSelector(store => store.userInfo.userLoggedIn);
    debugger;
    // @ts-ignore
    const forgotPasswordVisited = useSelector(store => store.userInfo.forgotPasswordVisited);

    if (userLoggedIn) {
        return <Redirect to={'/'} />;
    }

    if (!forgotPasswordVisited) {
        return <Redirect to={'/forgot-password'} />;
    }

    const handleResetPassword = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        // @ts-ignore
        dispatch(resetPassword(values));
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <h2 className="text text_type_main-medium pb-6">Восстановление пароля</h2>
                    <form onSubmit={handleResetPassword}>
                        <PasswordInput
                            name={'password'}
                            placeholder="Введите новый пароль"
                            value={values.password || ""}
                            onChange={handleChange}
                            extraClass="mb-2 pb-6"
                        />
                        <Input
                            type={'text'}
                            placeholder={'Введите код из письма'}
                            name={'token'}
                            value={values.token || ""}
                            onChange={handleChange}
                            error={false}
                            size={'default'}
                            extraClass="mb-2 pb-6"
                        />
                        {errorResetPassword && (
                            <div className={`${styles.text_error} mb-2`}>
                                <span className="text text_type_main-default">Ошибка сброса пароля</span>
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