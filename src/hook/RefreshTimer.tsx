import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from "axios";
import React from 'react';
import { FirstFixData, RefreshTime } from '../header/Interfaces';
import RefreshAccessToken from './getAccTok';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router-dom';
import { useURL } from '../components/useURL';



export const  RefreshComponent = async (
    setFirstFixD:(value:React.SetStateAction<FirstFixData>) => void,
    setrefreshTime: (value:React.SetStateAction<RefreshTime>) => void, 
    setStartFix: (value: boolean) => void,
    setEndFix: (value: boolean) => void,
    setTimeZ: (timeZone: string | null) => void,
    refreshTime: RefreshTime,
    navigate: NavigateFunction,
    setIsDayFixed: (value: boolean) => void,
    baseUrl: string,
     
) => {
  

  //  const [startFix, setStartFix]=useState<boolean>(true);
    const token=localStorage.getItem('token');
   // const navigate=useNavigate();
try {        
    console.log('Нахожусь в  ReshreshComponent\n'); 
    const response = await  axios.post(`${baseUrl}/RefreshTime/TimeChecker`,
     JSON.stringify(refreshTime),           
     {
       headers: {
         'Content-Type': `application/json`,
         'Authorization': `Bearer ${token}`,
       },
     }
   );                 
     console.log(response);                                                                                      
     console.log("timeZOne: "+ response.data.timeZone +"\n");
     console.log(response.data.day + " это рефреш компоент");

     setTimeZ(response.data.timeZone);

    
    if(response.data.isDayFixed==false){
      setIsDayFixed(true);
      setStartFix(false);
      
      
  } else{
    setStartFix(true);
    setEndFix(false);
    setIsDayFixed(false);
  }
  if(response.data.isDayFixed==true && response.data.onOffTimer==false){

    setEndFix(true);
    setStartFix(true);
    setIsDayFixed(true);
  }
  if(response.data.isDayFixed==null){
    setStartFix(false);
    setEndFix(true);

  }
     if(response.data.whnd===null){}
       else{           
     setFirstFixD((prevState)=>({
       ...prevState,  // копируем текущее состояние объекта
      WhatNewinDay: response.data.whnd,  // изменяем значение свойства Day
     }));
   }
   if(response.data.day==0) {
              console.log(response.data.day + " Проверка числа в refreshComponent");
    setrefreshTime({
      ...refreshTime,  // копируем текущее состояние объекта
      Day: response.data.day,  // изменяем значение свойства Day
    });
   // setStartFix(false);
   // setEndFix(true);
  } 
  //  setStartFix(true);
    
    console.log(response.data.day + "Проверка числа в refreshComponent сл условие");
    setrefreshTime((prevState)=>({
      ...prevState,  // копируем текущее состояние объекта
      Day: response.data.day,  // изменяем значение свойства Day
    }));
    

     console.log(response.data+"\n"); // Обработка успешного ответа сервера 
     console.log("Данные которые пришли при нажатии")
     // Другая логика, основанная на данных из response когда токен не валиден отправить на страницу log in 
   } catch(error: any) {                        
     if(error.request.status===401){
       console.log("Время ref_token истекло " + error.request.status);   
                                    
       await  navigate("/login", { replace: true });
                  
    } 
    }   
 
   
}


export default RefreshComponent;