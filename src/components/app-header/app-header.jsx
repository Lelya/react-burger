import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import headerStyle from './app-header.module.css';
import {NavLink, useRouteMatch} from "react-router-dom";

export default function AppHeader () {
    const isConstructor = useRouteMatch({ path: '/', exact: true });
    const isProfile = useRouteMatch({ path: '/profile', exact: true });

    return (
        <header className={headerStyle.header}>
            <nav className={headerStyle.navigation}>
                <ul>
                    <li className={headerStyle.navButton}>
                        <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
                        <NavLink
                            to="/"
                            exact
                            className={headerStyle.navButton_link}
                            activeClassName={headerStyle.navButton_active}
                        >
                            <p className="text text_type_main-default">Конструктор</p>
                        </NavLink>
                    </li>
                    <li>
                        <button className={`${headerStyle.navButton} `}>
                            <ListIcon type={"secondary"} />
                            <span className={'text text_type_main-default text_color_inactive'}>Лента заказов</span>
                        </button>
                    </li>
                    <li className={headerStyle.logo}><Logo /></li>
                    <li className={headerStyle.navButton}>
                        <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
                        <NavLink
                            to="/profile"
                            exact
                            className={headerStyle.navButton_link}
                            activeClassName={headerStyle.navButton_active}
                        >
                            <p className="text text_type_main-default">Личный кабинет</p>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}