import {Route, Redirect, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import { THistoryFrom, IProtectedRouteProps } from '../../utils/types';

export const ProtectedRouter = ({children, onlyAuth = false,...rest}: IProtectedRouteProps) => {

    const location = useLocation<THistoryFrom>();
    // @ts-ignore
    const authChecked = useSelector(store => store.userInfo.userLoggedIn);
    const nextPage = location.state?.from || '/';

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