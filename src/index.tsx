import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./components/app/App";
import {store} from "./services/store/store";
// @ts-ignore
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
