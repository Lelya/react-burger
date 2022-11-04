import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import appStyle from './App.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import './App.css'
import {URL_GET_DATA} from "../../constants/burger-constants";

export default function App() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getIngredients();
    }, [])


    const getIngredients = () => {
        setIsLoading(true);
        fetch(URL_GET_DATA)
            .then(res => res.json())
            .then(data => {
                setData(data.data);
                setIsLoading(false);
            })
            .catch(e => {
                setHasError(true);
                setIsLoading(false);
            })
    };


    return (
      <div className={appStyle.rootDiv}>
        <AppHeader />
        <div className={appStyle.wrapper}>
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {!isLoading &&
                !hasError &&
                data.length &&
                <>
                    <BurgerIngredients data={data}/>
                    <BurgerConstructor data={data}/>
                </>
            }
        </div>
      </div>
  );
}

