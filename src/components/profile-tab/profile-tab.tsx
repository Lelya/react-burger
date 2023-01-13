import {NavLink} from 'react-router-dom';
import styles from "../../pages/profile/profile.module.css";
import React from "react";
import {logoutUserThunk} from "../../services/actions/user-actions";
import {useDispatch} from "../../utils/types";

export interface IProfileTab {
    text: string;
}

const ProfileTab: React.FC<IProfileTab> = ({text }) => {

    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutUserThunk())
    };

    return (
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
                {text}
            </p>
        </div>
    )
}

export default ProfileTab;