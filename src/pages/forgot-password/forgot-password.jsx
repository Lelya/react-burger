import React, {useState} from 'react';
import styles from '../pages.module.css';
import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory} from "react-router-dom";
import {FORGOT_PASSWORD_URL} from "../../constants/burger-constants";
import {postRequest} from "../../services/api";

export function ForgotPassword() {

    const [value, setValue] = useState('');
    const [error, setError] = useState({
        message: "",
        value: false
    })
    const history = useHistory();

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const handleReset = (e, value) => {
        e.preventDefault();
        postRequest(FORGOT_PASSWORD_URL, {email: value})
            .then(result => {
                if (result.success) {
                    history.replace({ pathname: '/reset-password' });
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
                    <form onSubmit={(e) => handleReset(e)}>
                         <EmailInput
                             name={'email'}
                             onChange={onChange}
                             value={value}
                             placeholder="Укажите e-mail"
                             isIcon={true}
                             extraClass="mb-2 pb-6"
                         />
                        {!error.value && (
                            <div className={styles.text_error}>
                                <span className="text text_type_main-medium">Ошибка</span>
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