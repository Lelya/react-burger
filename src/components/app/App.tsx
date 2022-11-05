import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import appStyle from './App.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../services/api';
import './App.css'
import {GET_INGREDIENTS} from "../../constants/burger-constants";

export default function App() {

    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        getIngredients();
    }, [])

    const getIngredients = () => {
        setIsLoading(true);
        getData(GET_INGREDIENTS)
            .then(data => {
                setData(data.data);
                setIsLoading(false);
            })
            .catch(e => {
                setError("Возникла ошибка во время получения данных");
                setIsLoading(false);
            })
    };

    return (
      <div className={appStyle.rootDiv}>
        <AppHeader />
        <div className={appStyle.wrapper}>
            {isLoading && 'Загрузка...'}
            {(error !== "" ) && error}
            {!isLoading &&
                error === "" &&
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

