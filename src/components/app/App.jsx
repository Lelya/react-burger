import React, {useEffect} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import appStyle from './App.module.css';
import AppHeader from '../app-header/app-header';
import './App.css'
import {Main} from "../../pages/main/main";
import {Login} from "../../pages/login/login";
import {useDispatch} from "react-redux";
import {getIngredients} from "../../services/actions";
import {Register} from "../../pages/register/register";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Profile} from "../../pages/profile/profile";

export default function App() {
    // const location = useLocation<ILocation>();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    },[dispatch]);

    return (
        <div className={appStyle.rootDiv}>
            <AppHeader />
            <Switch>
                <Route exact path="/">
                    <Main />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/forgot-password">
                    <ForgotPassword />
                </Route>
                <Route path="/reset-password">
                    <ResetPassword />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
        </div>
  );
}