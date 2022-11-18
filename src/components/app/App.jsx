import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import appStyle from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import './App.css'
import { getIngredients } from "../../services/actions";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


export default function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getIngredients());
    },[dispatch]);

    return (
      <div className={appStyle.rootDiv}>
        <AppHeader />
            <div className={appStyle.wrapper}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                    <BurgerConstructor/>
                </DndProvider>
            </div>
      </div>
  );
}

