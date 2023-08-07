import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useURL } from "../components/useURL";
import  {KnowledgeInterface, PhilosoInterface,}  from '../header/Interfaces';
import { DataUser } from "../header/Interfaces";



export const HandleKnowledge= async( 
Knowledge: KnowledgeInterface,
setKnowledge: (value:React.SetStateAction<KnowledgeInterface>) => void,
baseUrl:string,

) =>{

   console.log("Work HandleKnowledge!\n")
    // изменяем значение свойства Day 
    try {   
        const token=localStorage.getItem('token');    
        const response = await axios.post(`${baseUrl}/OtherRecord/KnowledgeRecord`,       
                     JSON.stringify(Knowledge),{
            //Передача объетка в на сервер
            headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
             },
            
               }       
            );
           
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

    
     export const HandleMind= async( 
      DayPhilos: PhilosoInterface,
      baseUrl:string,
      ) =>{
        
        console.log("Work HandleMind!\n")
          // изменяем значение свойства Day 
          try {   
            
              const token=localStorage.getItem('token');    

              console.log(DayPhilos.PhiloMind + "отправляю данные\n");

              const response = await axios.post(`${baseUrl}/OtherRecord/WisdomRecord`,       
                           DayPhilos,{
                  //Передача объетка в на сервер
                  headers:{
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${token}`,
                   },
                  
                     }       
                  );
                  
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


           export const HandleConclus= async( 
            formData: DataUser,           
            baseUrl:string,
            ) =>{
              
              console.log("Work HandleConclusions!\n")
                // изменяем значение свойства Day 
                try {   
                  
                    const token=localStorage.getItem('token');    
      
                    console.log(formData + "отправляю данные\n");
      
                    const response = await axios.post(`${baseUrl}/OtherRecord/ConclusionsRecord`,       
                    formData,{
                        //Передача объетка в на сервер
                        headers:{
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                         },
                        
                           }       
                        );
                        
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

