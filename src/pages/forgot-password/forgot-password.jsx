import React, {useState} from 'react';
import styles from '../pages.module.css';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {forgotPassword} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "../../hooks/useForm";

export function ForgotPassword() {

    const { values, handleChange } = useForm({
        email: '',
    });
    const [errorMessage] = useState("");
    const dispatch = useDispatch();
    const errorForgotPassword = useSelector(store => store.userInfo.forgotPasswordError);
    const userLoggedIn = useSelector(store => store.userInfo.userLoggedIn);

    if (userLoggedIn) {
        return <Redirect to={'/'} />;
    }

    const handleForgotPassword = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(values.email));
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <form onSubmit={handleForgotPassword}>
                         <EmailInput
                             name={'email'}
                             onChange={handleChange}
                             value={values.email}
                             placeholder="Укажите e-mail"
                             isIcon={true}
                             extraClass="mb-2 pb-6"
                         />
                        {errorForgotPassword && (
                            <div className={styles.text_error}>
                                <span className="text text_type_main-medium">{errorMessage}</span>
                            </div>
                        )}
                        <div className="pb-20">
                             <Button htmlType="submit" type="primary" size="medium">
                                 Восстановить
                             </Button>
                         </div>
                    </form>
                    <div className={styles.login_bottom}>
                        <p>
                            <span className="text text_type_main-default">
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