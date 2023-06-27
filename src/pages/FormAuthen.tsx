import axios, { AxiosResponse } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import { useAuth } from '../hook/useAuth';


// Лоигка с состоянием для проверки пароля
const FormAuth = () =>{ 
  const [loggedIn, setLoggedIn] = useState(false);
  //useState для установки имя 
  const [name, setName] = useState<string | null>();
  //useState для установки пароля
  const [pass, setPass]=useState<string| null>();
  
  //передача контекста во вход
  const {signin}= useAuth();
  
  
  console.log("Имя получено: "  + name +  " Пароль получен: " + pass); 
  //Получаем имя из поля имя
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value!);
    
  };
  //Получаем пароль из поля пароль
  const handlePassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value!);
  };
  

const navigate = useNavigate();
const  location = useLocation();

//откуда мы пришли
const fromPage = location.state?.from?.pathname || '/';

 const HandleSubmit =  async (event: { preventDefault: () => void; })=> {
  event.preventDefault();
  console.log("Отправка в функцию " + `AuthProvider => signin` + location.pathname);      
     signin(name!,  pass!, false, ()=> navigate(location.state, {replace: true}));
    
};
   return    (    
      <>
      
<div className="container-fluid w-50  pb-5 mb-5" style={{marginBottom: ""}}>
    
        <div className="col-10 p-4 py-5 my-5">
            <div className="jumbotron m-4 d-flex flex-column justify-content-center rounded" style={{backgroundColor: 'indigo', minWidth:'300px'}}>
                <h1 className="display-6 m-3 mx-5 text-light">Log In</h1>
                <form action="" className='mb-3' onSubmit={HandleSubmit}>   
          <div className="p-5 w-100 py-3">
       <label htmlFor="" className="form-label text-light">Имя</label>
    <input className="form-control" id="Log" aria-describedby="logiN" name="username" placeholder='Name' onChange={handleNameChange}/>
         <div id="login" className="form-text text-warning">Введите ваше имя</div>
     </div>
  <div className="px-5 w-100 py-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-light"  >Пароль</label>
       <input type="password" className="form-control" id="InputPassword1" name="password"  placeholder='Password' onChange={handlePassChange}/>
       <div id="login" className="form-text text-warning">Введите пароль</div>
          </div>  
          <button type="submit" className="btn btn-primary float-end mx-5 px-4 my-3">Войти</button>    
  <button type="button" className="btn btn-primary float-start px-3 mx-5 my-3"  ><a href="registr" style={{textDecoration: "none", color: "white"}}>Зарегистрироватся</a></button>
  </form>
      </div>
        </div>
    
</div>
<footer>
  <div className="text-center p-2 py-2 fixed-bottom  text-warning" style={{backgroundColor: 'indigo'}}>
    © 2023 My Website
  </div>
</footer>
</>
);
    
};
export {FormAuth}

