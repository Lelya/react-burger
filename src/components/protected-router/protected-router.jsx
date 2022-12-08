import {Route, Redirect, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getUserData} from "../../services/actions";
import {useEffect} from "react";

export const ProtectedRouter = ({children, onlyAuth,...rest}) => {

    const location = useLocation();
    const dispatch = useDispatch();
    const authChecked = useSelector(store => store.userInfo.userLoggedIn);
    const nextPage = location.state?.from || '/';

    useEffect(() => {
        dispatch(getUserData());
    }, [dispatch]);


    if (onlyAuth ) {
        return (
            <Route {...rest}
                render={({location}) =>
                    authChecked ? (
                        children
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {from: location}
                            }}
                        />
                    )}
            />
        )
    } else {
        return (
            <Route
                {...rest}>
                {
                    authChecked ?
                        <Redirect to={nextPage}/>
                        :
                        children
                }
            </Route>
        )
    }
}