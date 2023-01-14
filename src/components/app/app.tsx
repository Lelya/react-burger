import React, {useEffect} from 'react';
import {Route, Switch, useHistory, useLocation} from 'react-router-dom';
import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import {Main} from "../../pages/main/main";
import {Login} from "../../pages/login/login";
import {useDispatch} from "../../utils/types";
import {getIngredientsThunk} from "../../services/actions/order-actions";
import {Register} from "../../pages/register/register";
import {ForgotPassword} from "../../pages/forgot-password/forgot-password";
import {ResetPassword} from "../../pages/reset-password/reset-password";
import {Profile} from "../../pages/profile/profile";
import {Feed} from "../../pages/feed/feed";
import {ProtectedRouter} from "../protected-router/protected-router";
import IngredientCard from "../ingredient-card/ingredient-card";
import Modal from "../modal/modal";
import Error404 from "../../pages/error-404/error-404";
import {getUserDataThunk} from "../../services/actions/user-actions";
import {TModalBackground} from "../../utils/types";
import OrderCard from "../order-card/order-card";
import ProfileOrders from "../../pages/profile-orders/profile-orders";
import OrderCardUser from "../order-card-user/order-card-user";

const App: React.FC = () => {

    const history = useHistory();
    const location = useLocation<TModalBackground>();
    const dispatch = useDispatch();
    let background = location.state && location.state.background;

    const closeModal = () => {
        history.goBack();
        background = null;
    };

    useEffect(() => {
        dispatch(getIngredientsThunk());
        dispatch(getUserDataThunk());
    },[dispatch]);


    return (
        <div className={appStyle.root}>
            <div className={appStyle.rootDiv}>
                <AppHeader />
                <Switch location={background || location}>
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
                    <ProtectedRouter onlyAuth={true} path='/profile/orders' exact>
                        <ProfileOrders />
                    </ProtectedRouter>
                    <Route exact path="/ingredients/:id">
                        <IngredientCard/>
                    </Route>
                    <Route exact path="/feed/:id">
                        <OrderCard/>
                    </Route>
                    <ProtectedRouter onlyAuth={true}  path="/profile/orders/:id" exact>
                        <OrderCardUser/>
                    </ProtectedRouter>
                    <Route exact path="/feed">
                        <Feed />
                    </Route>
                    <Route>
                        <Error404 />
                    </Route>
                </Switch>
                { background &&
                    <Route exact path='/ingredients/:id'>
                        <Modal handlerClose={closeModal} isOpen>
                            <IngredientCard background={true}/>
                        </Modal>
                    </Route>
                }
                { background &&
                    <Route exact path='/feed/:id'>
                        <Modal handlerClose={closeModal} isOpen>
                            <OrderCard background={true}/>
                        </Modal>
                    </Route>
                }
                { background &&
                    <ProtectedRouter onlyAuth={true} exact path='/profile/orders/:id'>
                        <Modal handlerClose={closeModal} isOpen>
                            <OrderCardUser background={true}/>
                        </Modal>
                    </ProtectedRouter>
                }
            </div>
        </div>
  );
}

export default App;