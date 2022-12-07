import {Route, Redirect, useLocation} from 'react-router-dom';
import { useSelector} from "react-redux";

export const ProtectedRouter = ({children, onlyAuth,...rest}) => {
    const location = useLocation();
    const authChecked = useSelector(store => store.userInfo.userLoggedIn)
    const nextPage = location.state?.from || '/';

    if (onlyAuth) {
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