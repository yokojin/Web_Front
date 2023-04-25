import ReactDOM from 'react-dom/client';
import {BrowserRouter, Link} from 'react-router-dom';
import './index.css';
import App from './App';

//import App from './App';
//import Tester from './Study';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  //Подключение маршрутизации для одностраничного сайта
  <BrowserRouter>
    <App/>
    </BrowserRouter>
);



//Подготовка
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

