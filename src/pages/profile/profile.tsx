import React, {ChangeEvent, useState} from 'react';
import styles from './profile.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {logoutUserThunk, updateUserDataThunk} from "../../services/actions/user-actions";
import {NavLink, Redirect} from "react-router-dom";

export function Profile() {

    const dispatch = useDispatch();
    // @ts-ignore
    const emailUser = useSelector(store => store.userInfo.email);
    // @ts-ignore
    const nameUser = useSelector(store => store.userInfo.name);
    // @ts-ignore
    const errorUser = useSelector(store => store.userInfo.getUserError);
    // @ts-ignore
    const userLoaded = useSelector(store => store.userInfo.userLoaded);
    // @ts-ignore
    const updateUserInfoError = useSelector(store => store.userInfo.updateUserInfoError);
    const passwordUser = '12345';
    const [hasChanged, setChanged] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState("");
    //хук useForm не могу тут использовать, из-за другого handleChange
    const [values, setValue] = useState({
        name: nameUser,
        email: emailUser,
        password: passwordUser,
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setChanged(true);
        setMessageSuccess("");
        setValue({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        dispatch(updateUserDataThunk(values.email, values.name));
        setMessageSuccess(!updateUserInfoError ? "Данные изменены" : "Произошла ошибка");
        setChanged(false);
    }

    const logoutHandler = () => {
        dispatch(logoutUserThunk())
    };

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
                            <NavLink
                                to="/profile"
                                exact
                                className={`${styles.profile_link}  pb-6`}
                                activeClassName={styles.profile_link_active}
                            >
                                <span className="text text_type_main-medium">Профиль</span>
                            </NavLink>
                            <NavLink
                                to="/profile/orders"
                                exact
                                className={`${styles.profile_link}  pb-6`}
                                activeClassName={styles.profile_link_active}
                            >
                                <span className="text text_type_main-medium  pb-6">История заказов</span>
                            </NavLink>

                            <h2
                                onClick={logoutHandler}
                                className={`${styles.profile_logout} text text_type_main-medium text_color_inactive pb-20`}
                            >
                                Выход
                            </h2>
                            <p className="text text_type_main-default text_color_inactive">
                                В этом разделе вы можете изменить свои персональные данные
                            </p>
                        </div>
                        <div>
                            <form onSubmit={handleSave} >
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
                                        <Button type="primary" size="medium" htmlType="submit">
                                            Сохранить
                                        </Button>
                                    </>
                                }
                                {errorUser && (
                                    <div className={`${styles.text_error} mb-2`}>
                                        <span className="text text_type_main-default">Авторизуйтесь в системе</span>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}