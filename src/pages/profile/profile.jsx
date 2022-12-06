import React from 'react';
import styles from './profile.module.css';
import {EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyle from "../../components/ingredient-item/ingredient-item.module.css";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../services/actions";

export function Profile() {
    debugger;
    const dispatch = useDispatch();
    const emailUser = useSelector(store => store.userInfo.email);
    const nameUser = useSelector(store => store.userInfo.name);
    return (
        <>
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
                            value={nameUser}
                        />
                        <EmailInput
                            name={'email'}
                            icon={'EditIcon'}
                            placeholder="Логин"
                            isIcon={true}
                            extraClass="mb-2 pb-6"
                            value={emailUser}
                        />
                        <PasswordInput
                            name={'password'}
                            icon={'EditIcon'}
                            extraClass="mb-2 pb-6"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}