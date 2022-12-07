import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from './app-header.module.css';
import {Link, Redirect} from "react-router-dom";
import {useSelector} from "react-redux";

export default function AppHeader () {
    const userLoggedIn = useSelector(store => store.userInfo.userLoggedIn);
    const linkUrl = userLoggedIn ? '/profile' : '/login';
    return (
        <header className={headerStyle.header}>
            <nav className={headerStyle.navigation}>
                <ul>
                    <li>
                        <Link to="/">
                            <button className={`${headerStyle.navButton}`}>
                                <BurgerIcon type={"primary"} />
                                <span className={'text text_type_main-default'}>Конструктор</span>
                            </button>
                        </Link>
                    </li>
                    <li>
                        <button className={`${headerStyle.navButton} `}>
                            <ListIcon type={"secondary"} />
                            <span className={'text text_type_main-default text_color_inactive'}>Лента заказов</span>
                        </button>
                    </li>
                    <li className={headerStyle.logo}><Logo /></li>
                    <li>
                        <Link to={linkUrl}>
                            <button className={`${headerStyle.navButton} `}>
                                <ProfileIcon type={"secondary"} />
                                <span className={'text text_type_main-default text_color_inactive'}>Личный кабинет</span>
                            </button>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}