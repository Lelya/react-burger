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
import {ProtectedRouter} from "../protected-router/protected-router";

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
                <ProtectedRouter onlyAuth={false} path='/login' exact>
                    <Login />
                </ProtectedRouter>
                <ProtectedRouter onlyAuth={false} path='/register' exact>
                    <Register />
                </ProtectedRouter>
                <ProtectedRouter onlyAuth={false} path='/forgot-password' exact>
                    <ForgotPassword />
                </ProtectedRouter>
                <ProtectedRouter onlyAuth={false} path='/reset-password' exact>
                    <ResetPassword />
                </ProtectedRouter>
                <ProtectedRouter onlyAuth={true} path="/profile" exact>
                    <Profile />
                </ProtectedRouter>
            </Switch>
        </div>
  );
}