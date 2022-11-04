import React from 'react';
import './App.module.css';
import AppHeader from '../app-header/app-header';
import appStyle from './App.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import './App.css'

import data from '../../utils/data.json';

function App() {
    return (
      <div className={appStyle.rootDiv}>
        <AppHeader />
        <div className={appStyle.wrapper}>
            <BurgerIngredients data={data}/>
            <BurgerConstructor data={data} />
        </div>
      </div>
  );
}

export default App;
