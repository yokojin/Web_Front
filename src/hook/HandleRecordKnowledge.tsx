import axios from "axios";
import React, { useEffect, useState } from 'react';
import  {Knowledge}  from '../pages/NikkiDoDaily';



export const HandleRecordKnowledge = async( 
Knowledge: Knowledge,
setKnowledge: (value:React.SetStateAction<Knowledge>) => void,

) =>{
   
    // изменяем значение свойства Day 
    try {   
        const token=localStorage.getItem('token');    
        const response = await axios.post('https://localhost:7051/RecordKnowledge/Knowledge',       
                     JSON.stringify(Knowledge),{
            //Передача объетка в на сервер
            headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
             },
            
               }       
            );
            console.log(Knowledge.Know + " this is send !");
            /*
            setKnowledge((prevState)=>({
                ...prevState,  // копируем текущее состояние объекта
                Knowledge: response.data.whnd,  // изменяем значение свойства Day
              }));
              */
              console.log(response);
          //  setKnowledge({ ...Knowledge, Know: response.data });
           
            //await RefreshComponent(setFirstFixD,setrefreshTime,setStartFix,setEndFix, setTimeZ, refreshTime,navigate,setIsDayFixed);
            console.log(response.data); // Обработка успешного ответа сервера
            } catch (error) {
            console.error(error); // Обработка ошибки сервера
            }
     }

    