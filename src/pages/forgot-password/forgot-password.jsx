import React, {useState} from 'react';
import styles from '../pages.module.css';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory} from "react-router-dom";
import {FORGOT_PASSWORD_URL} from "../../constants/burger-constants";
import {postRequest} from "../../services/api";
import {FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_VISITED} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";

export function ForgotPassword() {

    const [value, setValue] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const errorForgotPassword = useSelector(store => store.userInfo.forgotPasswordError);
    const userLoggedIn = useSelector(store => store.userInfo.userLoggedIn);

    if (userLoggedIn) {
        return <Redirect to={'/'} />;
    }

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const handleReset = (e, value) => {
        e.preventDefault();
        postRequest(FORGOT_PASSWORD_URL, {email: value})
            .then(result => {
                if (result.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_VISITED,
                    });
                    history.replace({ pathname: '/reset-password' });
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_ERROR,
                    });
                    setErrorMessage(result.message);
                }
            })
            .catch(error => {
                dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                });
                setErrorMessage(error)
            })
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <form onSubmit={(e) => handleReset(e)}>
                         <EmailInput
                             name={'email'}
                             onChange={onChange}
                             value={value}
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