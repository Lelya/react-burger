import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from './app-header.module.css';

export default function AppHeader () {
    return (
        <header className={headerStyle.header}>
            <nav className={headerStyle.navigation}>
                <ul>
                    <li>
                        <button className={`${headerStyle.navButton}`}>
                            <BurgerIcon type={"primary"} />
                            <span className={'text text_type_main-default'}>Конструктор</span>
                        </button>
                    </li>
                    <li>
                        <button className={`${headerStyle.navButton} `}>
                            <ListIcon type={"secondary"} />
                            <span className={'text text_type_main-default text_color_inactive'}>Лента заказов</span>
                        </button>
                    </li>
                    <li className={headerStyle.logo}><Logo /></li>
                    <li>
                        <button className={`${headerStyle.navButton} `}>
                            <ProfileIcon type={"secondary"} />
                            <span className={'text text_type_main-default text_color_inactive'}>Личный кабинет</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}