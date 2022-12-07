import React, {useState} from 'react';
import styles from '../pages.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, Redirect} from "react-router-dom";
import {postRequest} from "../../services/api";
import {REGISTER_URL} from "../../constants/burger-constants";
import {useDispatch, useSelector} from "react-redux";
import {REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS} from "../../services/actions";

export function Register() {
    const [values, setValue] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const errorRegister = useSelector(store => store.userInfo.registerError);

    const userLoggedIn = useSelector(store => store.userInfo.userLoggedIn);

    if (userLoggedIn) {
        return <Redirect to={'/'} />;
    }
    const handleChange = (e) => {
        setValue({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch({
            type: REGISTER_REQUEST
        })
        postRequest(REGISTER_URL, values )
            .then(result => {
                if (result.success) {
                    alert('Регистрация прошла успешно!');
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: result.user,
                    })
                    history.replace({ pathname: '/login' });
                } else {
                    dispatch({
                        type: REGISTER_ERROR,
                    })
                    setErrorMessage(result.message)
                }
            })
            .catch(error => {
                dispatch({
                    type: REGISTER_ERROR,
                })
                setErrorMessage(error)
            })
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
                    <form onSubmit={(e) => handleRegister(e)}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            icon={'CurrencyIcon'}
                            name={'name'}
                            error={false}
                            size={'default'}
                            value={values.name}
                            onChange={handleChange}
                            extraClass="mb-2 pb-6"
                        />
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
                        {!errorRegister && (
                            <div className={`${styles.text_error} mb-2`}>
                                <span className="text text_type_main-default">{errorMessage}</span>
                            </div>
                        )}
                        <div className="pb-20">
                             <Button htmlType="submit" type="primary" size="medium">
                                 Зарегистрироваться
                             </Button>
                         </div>
                    </form>
                    <div className={styles.login_bottom}>
                        <p>
                            <span className="text text_type_main-default text_color_inactive">
                                Вы уже зарегистрированы?
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