import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Proverka from './Study';
import {RegistrationForm} from './components/RegistrationForm'
import { MainSite } from './components/Main';

//import App from './App';
//import Tester from './Study';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  
    <RegistrationForm />
);



//Подготовка
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

