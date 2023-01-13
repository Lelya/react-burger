import React, {FormEvent} from 'react';
import styles from '../pages.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect} from "react-router-dom";
import {useDispatch, useSelectorTS} from "../../utils/types";
import {registerThunk} from "../../services/actions/user-actions";
import {useForm} from "../../hooks/useForm";

export function Register() {
    const { values, handleChange } = useForm({
        email: "",
        password: "",
        name: ""
    });
    const dispatch = useDispatch();
    const errorRegister = useSelectorTS(store => store.userInfo.registerError);
    const userLoggedIn = useSelectorTS(store => store.userInfo.userLoggedIn);

    if (userLoggedIn) {
        return <Redirect to={'/'} />;
    }

    const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(registerThunk(values));
    }

    return (
        <>
            <div className={styles.wrapper_form}>
                <div className={styles.block}>
                    <h2 className="text text_type_main-medium pb-6">Регистрация</h2>
                    <form onSubmit={handleRegister}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            icon={'CurrencyIcon'}
                            name={'name'}
                            error={false}
                            size={'default'}
                            value={values.name || ""}
                            onChange={handleChange}
                            extraClass="mb-2 pb-6"
                        />
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
                        {errorRegister && (
                            <div className={`${styles.text_error} mb-2`}>
                                <span className="text text_type_main-default">Ошибка регистрации</span>
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