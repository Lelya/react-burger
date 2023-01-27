import React, {ChangeEvent, useState} from 'react';
import styles from './profile.module.css';
import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelectorTS} from "../../utils/types";
import {updateUserDataThunk} from "../../services/actions/user-actions";
import {Redirect} from "react-router-dom";
import appStyle from "../../components/app/app.module.css";
import stylesProfileOrders from "../profile-orders/profile-orders.module.css";
import ProfileTab from "../../components/profile-tab/profile-tab";

export function Profile() {

    const dispatch = useDispatch();
    const emailUser = useSelectorTS(store => store.userInfo.email);
    const nameUser = useSelectorTS(store => store.userInfo.name);
    const userLoaded = useSelectorTS(store => store.userInfo.userLoaded);
    const updateUserInfoError = useSelectorTS(store => store.userInfo.updateUserInfoError);
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

    if (!userLoaded) {
        return <Redirect to={'/'} />;
    }

    return (
        <>
            <div className={`${appStyle.wrapper} mt-25`}>
                <div className={stylesProfileOrders.wrapper_profile_tab}>
                    <ProfileTab text={"В этом разделе вы можете изменить свои персональные данные"}/>
                </div>
                <div className={`${styles.orderListUserWrapper}`}>
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
                    </form>
                </div>
            </div>
        </>
    )
}