import React, {useEffect, useState} from 'react';
import styles from './profile.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, getUserData, updateUserData} from "../../services/actions";
import {Redirect} from "react-router-dom";

export function Profile() {

    const dispatch = useDispatch();
    const emailUser = useSelector(store => store.userInfo.email);
    const nameUser = useSelector(store => store.userInfo.name);
    const errorUser = useSelector(store => store.userInfo.getUserError);
    const userLoaded = useSelector(store => store.userInfo.userLoaded);
    const updateUserInfoError = useSelector(store => store.userInfo.updateUserInfoError);
    const passwordUser = '12345';
    const [hasChanged, setChanged] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");
    const [values, setValue] = useState({
        name: nameUser,
        email: emailUser,
        password: passwordUser,
    })

    const handleChange = (e) => {
        setChanged(true);
        setMessageSuccess("");
        setValue({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    const handleSave = (e) => {
        dispatch(updateUserData(values.email, values.name));
        setMessageSuccess(!updateUserInfoError ? "Данные изменены" : "Произошла ошибка");
        setChanged(false);
    }

    if (!userLoaded) {
        return <Redirect to={'/'} />;
    }

    return (
        <>
            {!userLoaded ? (
                <div className={`${styles.text_error} mt-10`}>
                    <span className="text text_type_main-default">Авторизуйтесь в системе</span>
                </div>
            ) : (
                <div className={styles.wrapper_profile}>
                    <div className={styles.wrapper_profile_box}>
                        <div className={`${styles.profile_tab} mr-4`}>
                            <h2 className="text text_type_main-medium pb-6">Профиль</h2>
                            <h2 className="text text_type_main-medium text_color_inactive pb-6">История заказов</h2>
                            <h2
                                onClick={() => dispatch(logoutUser())}
                                className={`${styles.profile_logout} text text_type_main-medium text_color_inactive pb-20`}
                            >
                                Выход
                            </h2>
                            <p className="text text_type_main-default text_color_inactive">
                                В этом разделе вы можете изменить свои персональные данные
                            </p>
                        </div>
                        <div className={styles.profile_info}>
                            <Input
                                type={'text'}
                                placeholder={'Имя'}
                                icon={'EditIcon'}
                                name={'name'}
                                error={false}
                                size={'default'}
                                extraClass="mb-2 pb-6"
                                value={values.name}
                                onChange={handleChange}
                            />
                            <EmailInput
                                name={'email'}
                                icon={'EditIcon'}
                                placeholder="Логин"
                                isIcon={true}
                                extraClass="mb-2 pb-6"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <PasswordInput
                                name={'password'}
                                value={values.password}
                                extraClass="mb-2 pb-6"
                                onChange={handleChange}
                            />
                            { messageSuccess !== "" &&
                                <span className="text text_type_main-default m-3">{messageSuccess}</span>
                            }
                            { hasChanged &&
                                <>
                                    <Button htmlType="button" size="medium" onClick={() => handleSave()}>Сохранить</Button>
                                </>
                            }
                            {errorUser && (
                                <div className={`${styles.text_error} mb-2`}>
                                    <span className="text text_type_main-default">Авторизуйтесь в системе</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}