import React, {useState, useEffect} from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import appStyle from './App.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getData } from '../../services/api';
import './App.css'
import { GET_INGREDIENTS } from "../../constants/burger-constants";
import { IngredientsContext } from '../../services/burgerContext';
import ErrorModal from "../error-modal/error-modal";

export default function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        getIngredients();
    }, [])

    const getIngredients = () => {
        setIsLoading(true);
        getData(GET_INGREDIENTS)
            .then(data => {
                setIngredients(data.data);
                setIsLoading(false);
            })
            .catch(e => {
                setError("Возникла ошибка во время получения данных");
                setIsLoading(false);
                setIsOpenModal(true);
            })
    };

    return (
      <div className={appStyle.rootDiv}>
        <AppHeader />
            <IngredientsContext.Provider value={{ ingredients }} >
                <div className={appStyle.wrapper}>
                    {isLoading && 'Загрузка...'}
                    {!isLoading &&
                        error === "" &&
                        ingredients.length &&
                        <>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </>
                    }
                    {isOpenModal &&
                        <ErrorModal handlerClose={() => setIsOpenModal(false)} error={error} isOpenModal={isOpenModal}/>
                    }
                </div>
            </IngredientsContext.Provider>
      </div>
  );
}

