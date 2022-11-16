import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import appStyle from './App.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import './App.css'
import { getIngredients } from "../../services/actions";


export default function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    },[dispatch]);

    return (
      <div className={appStyle.rootDiv}>
        <AppHeader />
            <div className={appStyle.wrapper}>
                    <>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </>
            </div>
      </div>
  );
}

