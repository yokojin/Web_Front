import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import Countdown from '../hook/useTimer';
import DateToday from '../hook/DateToday';
import { useTimeZone } from '../hook/useTimeZone';
import RefreshAccessToken from '../hook/getAccTok';
import {RefreshComponent} from '../hook/RefreshTimer';
import { useNavigate } from 'react-router-dom';
import { HandleRecordKnowledge } from '../hook/HandleRecordKnowledge';



//Данные дневника
interface DataUser {
  UserId: string| null;
 WhatNewinDay: string;  
 NewKnoledge: string;
 DayPhilosophy: string;   
 WhatDone: string;   
 WhatNotDone: string;   
 Сonclusions: string;    
 //Day: number;  
}



//Данные для фиксации первого дня
export interface FirstFixData{
  UserId: string | null;
  WhatNewinDay: string;
 // Day: number;
  IsFixedStart: boolean;
  IsFixedEnd: boolean;
 
}

//Data for endFix data to the server
interface RefTimeData{
  UserId: string | null;
  WhatNewinDay: string;
  Day: number; 
  IsFixedStart: boolean;
  IsFixedEnd: boolean;
}

export interface RefreshTime{
  UserId: string | null;
  TimeZone: string | null;
  Day: number; 
  onOffTimer: boolean;
  whnd: string | null;
  isDayFixed: boolean;
};

interface Philosophy{
  TheSay: string | null;
  Autohor: string | null; 
}

export interface Knowledge{
  UserId: string | null;
  Know: string;
 
}
//Разделить компоненты
/*
  1.Фиксировать определённые ячейки
  2.Таймер после определённого время фиксировать весь день
  3.Переход между днями сделать 30 дней 
  4.Вывод афоризмов по таймеру -- найти афоризмы и залить в базу (возможно придётся делать базе данных миграцию)
  5.Вывод даты
  6.Можно проверять аксесс токен в моменте обращения к определённым ресурсам
*/

const  NikkiDoDaily: React.FC = () =>{ 

  
 const navigate=useNavigate();
 const {timeZone, setTimeZ} = useTimeZone();
 const [startFix, setStartFix]=useState<boolean>(true);
 const [isDayFixed, setIsDayFixed]=useState<boolean>(true);
 const [endFix, setEndFix]=useState<boolean>(true);
 const [recordYesNo, setrecordYesNo]=useState<boolean>(true);// кнопка для записи
 const usId=localStorage.getItem('userId');
 const token=localStorage.getItem('token');
 
 const [textareaEditable, setTextareaEditable] = useState(true);
 const[buttonText, setbuttonText]=useState("Запись");


// Переменные для складывания в массив
  // const [WhatNewinDay, setWhatNewinDay,] = useState<string | null>();
   const [formData, setFormData]=useState<DataUser>({
    UserId: localStorage.getItem('userId'),
    WhatNewinDay: "",
    NewKnoledge: "",
    DayPhilosophy: "",
    WhatDone: "",
    WhatNotDone: "",
    Сonclusions: "",
   // Day: 0,
   });
   
   const [FirstFixD, setFirstFixD]=useState<FirstFixData>({
    UserId: localStorage.getItem('userId'),
    WhatNewinDay: "",
    IsFixedStart: true,
    IsFixedEnd: false,
   });
   //Для фиксации дня и проверки 
   const [refTime, setrefTime]=useState<RefTimeData>({
    UserId: localStorage.getItem('userId'),
    WhatNewinDay: "",
    Day: 0,
    IsFixedStart: true,
    IsFixedEnd: false,
   });
   //для таймера 
   const [refreshTime, setrefreshTime]=useState<RefreshTime>({ 
    UserId: localStorage.getItem('userId'),
    TimeZone:"",
    Day: 0,
    onOffTimer: false,
    whnd:"",
    isDayFixed: false,
   }
   );
   
   const [philosophy, setPhilosophy]=useState<Philosophy>({ 
    TheSay: "",
    Autohor:"",
   });
   
   const [Knowledge, setKnowledge]=useState<Knowledge>({ 
    UserId: localStorage.getItem('userId'),
    Know: "",
   });


    //Проверка начат ли день и проверка на фиксацию
   // CheckDataClient();
    //Проверка: начат ли день или нет а точнее обновление страницы 
    //Если траница обновлена то выставить таймер по часовму поясу 
 
    console.log('Нажал и полетел \n');     
  RefreshAccessToken(); 
    useEffect( () => {
     
      const handlePageRefresh = (event: BeforeUnloadEvent) => {
       
        event.preventDefault();  
       
      }; 
      console.log('Отслеживание обновления сраницы\n');              
       // setEndFix(true);  
       const fetchData = async ()=>{
                       // RefreshAccessToken();                    
      try {        
           const response = await  axios.post('https://localhost:7051/RefreshTime/TimeChecker',
            JSON.stringify(refreshTime),           
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            }
          );                 
            console.log(response);                                                                                                
            console.log("timeZOne: "+ response.data.timeZone +"\n");
            console.log(response.data.day);            
            setTimeZ(response.data.timeZone); 
            //Если день не зафиксирован то старт нажат остальное доступно       
              if(response.data.isDayFixed==false){
                  setIsDayFixed(true);
                  setStartFix(false);
                 // setTextareaEditable(false);                                  
              } else{
                //Иначе если день не кончился и новый не наступил
                setStartFix(true);
                setEndFix(false);
                setIsDayFixed(false);
                
              }
              //Если День зафиксирован
              if(response.data.isDayFixed==true && response.data.onOffTimer==false 
                || response.data.isDayFixed==null && response.data.onOffTimer==false){
                setEndFix(true);
                setStartFix(true);
                setIsDayFixed(true);
              //  setTextareaEditable(false);
              }
              
              if(response.data.isDayFixed==false && response.data.onOffTimer==false){
                setTextareaEditable(false);
              }
              if(response.data.isDayFixed==null){
                setStartFix(false);
                setEndFix(true);                
              }
            
            if(response.data.whnd===null){
              
            }
              else{           
            setFirstFixD({
              ...FirstFixD,  // копируем текущее состояние объекта
             WhatNewinDay: response.data.whnd,  // изменяем значение свойства Day
            });
            
          }                       
              setrefreshTime({
                ...refreshTime,  // копируем текущее состояние объекта
                Day: response.data.day,  // изменяем значение свойства Day
              });
              
              if(response.data.day>0){
              //  setStartFix(false);
              }
               
            console.log(response.data.timeZone); // Обработка успешного ответа сервера 
                       
            // Другая логика, основанная на данных из response когда токен не валиден отправить на страницу log in 
          } catch(error: any) {                        
            if(error.response && error.response.request && error.response.request.status === 401){
              console.log("Время ref_token истекло " + error.request.status);                      
              await  navigate('/login', { replace: true }); ;              
                     
            }                                            
          }
          
        };  
         
        //Здесь нужно получить день и список дней которые уже выполнены
        const NeedDay = async () => {      
          try {
               const response = await  axios.post('https://localhost:7051/RefreshTime/TimeChecker',
                JSON.stringify(refreshTime),
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );                 
                console.log(response);                               
              //  setTimeZ(response.data.timeZone);

                console.log(response.data.timeZone); // Обработка успешного ответа сервера 

                // Другая логика, основанная на данных из response
              } catch(error) {
                console.error(error); // Обработка ошибки сервера
                
              }
            };          
       
     fetchData();
   //RefreshComponent(setFirstFixD,setrefreshTime,setStartFix,setEndFix,setTimeZ,refreshTime,navigate);
   
            
        window.addEventListener('beforeunload', handlePageRefresh);  
      //  RefreshComponent(setFirstFixD,setrefreshTime,setStartFix, setTimeZ,refreshTime,navigate);

     
        return () => {
          window.removeEventListener('beforeunload', handlePageRefresh);
        };
       
    }, []);
 
    

    useEffect(  () => {
      const giveMind = async ()=>{
      try {
        const response = await  axios.post('https://localhost:7051/GetPhilosophy/GetPhi',
         JSON.stringify(philosophy),
         {
           headers: {
             'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`,
           },
         }
       );   
         console.log(response);  
         setPhilosophy({
          ...philosophy,  // копируем текущее состояние объекта
         TheSay: response.data.theSay,  // изменяем значение свойства Day
         Autohor:response.data.author
        });                                     
       } catch(error) {
         console.error(error); //          
       }
      }        
      giveMind();
       
    }, []);
 

   

    const HandleSubmitClick = async(event: React.FormEvent<HTMLButtonElement>) =>{ 
      event.preventDefault();
      //Отправляем  id,  
        
      try {
       
        const response = await axios.post('https://localhost:7051/NikkiDo/FirstFixData',       
           JSON.stringify(FirstFixD),{
           //Передача объетка  на сервер
           headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
           },
         }         
        );       
        console.log(response.data); // Обработка успешного ответа сервера
        await  RefreshComponent(setFirstFixD,setrefreshTime,setStartFix, 
          setEndFix,setTimeZ, refreshTime,navigate, setIsDayFixed); 
       // setEndFix(); 
       setStartFix(true);
       setEndFix(false);
       // console.log(dayNumber);
      } catch (error) {
        console.error(error); // Обработка ошибки сервера
      }
     
    }

   
 
  //Зафиксировать Начало дня
//Кнопка для завершения дня должна быть заблокирована пока день не стартанёт 
const HandleSubmitClickFix=async (event: React.FormEvent<HTMLButtonElement>) => {
  event.preventDefault();

const updatedEndDay = { UserId: FirstFixD.UserId, Day:refreshTime.Day, WhatNewinDay: FirstFixD.WhatNewinDay, 
                        NewKnoledge:formData.NewKnoledge, WhatDone: formData.WhatDone, 
                        WhatNotDone: formData.WhatNotDone, Сonclusions: formData.Сonclusions };
  // изменяем значение свойства Day 
  try {   
 
      console.log(updatedEndDay.UserId + " - что отправляем на сервер - " + updatedEndDay.WhatNewinDay);
      const response = await axios.post('https://localhost:7051/NikkiDo/StopDay',       
       JSON.stringify(updatedEndDay),{
       //Передача объетка в на сервер
       headers:{
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
       },

     }       
    );
    await RefreshComponent(setFirstFixD,setrefreshTime,setStartFix,setEndFix, setTimeZ, refreshTime,navigate,setIsDayFixed);
    console.log(response.data); // Обработка успешного ответа сервера
  } catch (error) {
    console.error(error); // Обработка ошибки сервера
  }
}

//Кнопка Следующий день
  const HandleClickNext = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
   
  }
//Кнопка на предыдущий день
  const HandleClickPrev = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
  }
 
  const handleChange =  async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => { 
      const {name, value}=event.target;
      const newValue = event.target.value;
       setFirstFixD((prevFirstFixD) => ({
        ...prevFirstFixD,
        [name]:value,
      }))      
     setFormData((prevformData) => ({
        ...prevformData,
        [name]:value,
        
      }))
       setKnowledge((prevKnowledge) => ({
         ...prevKnowledge,
         Know:value,
       }))
  };

  //Записать данные в колонку пользователя
  const HandleRecord = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    try {   
          
      const newData = await HandleRecordKnowledge(Knowledge, setKnowledge);
      // Обновляем состояние компонента после успешного запроса 
      
    } catch (error) {
      // Обрабатываем ошибку здесь
    }
  };




  const HandleRecordWisdom = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    if (buttonText === "Редактировать") {
      // Если endFix равно true и buttonText равно 'Редактировать', то запрещаем редактирование textarea
      setTextareaEditable(true);
      setbuttonText("Запись")
     
    }  if (buttonText === 'Запись') {
      // Если endFix равно true и buttonText равно 'Запись', то разрешаем редактирование textarea
      setTextareaEditable(false);
      setbuttonText("Редактировать")
    } else {
      // Если endFix равно false, то блокируем textarea и кнопку
    
    }
  };

  const handleChangeWisdom =  async (event: React.ChangeEvent<HTMLTextAreaElement> ) => { 
    if (!textareaEditable) {
      event.preventDefault();
    } else {
      
     // setTextareaValue(event.target.value);
    }
  };
  console.log(refreshTime.Day+ "что попадает в render");
    return (     
<>
<form >
<div className="container-fluid p-3 py-2"  style={{}}>
     <div className="row align-items-center my-0  bg-dark" style={{height: "100%",minWidth: "900px"}}>
         <div className='d-flex'>
               <h1 className='text-md-start text-warning px-3' style={{marginBottom: "4%"}}>День  {refreshTime.Day}</h1>
                  <div className='position-absolute top-2 end-0 text-center'>
                    <h2>{/*здесь будет вывод даты*/}</h2>
                    
                      <h2 className='mx-5 text-warning'> <DateToday></DateToday></h2>
                 </div>
              </div>  
                    <div className="col text-start" style={{marginRight: "4%",minWidth: ""}}>                   
                        <h5 className='text-center text-warning'>Что хотелось бы узнать или сделать за день</h5>
                              <div className="input-group mb-3" style={{padding: "1%", paddingLeft: "1%", paddingTop:"1%", width:"35vw"}}>                            
                               <textarea  className="form-control shadow p-3"  placeholder="Введите текст"  style={{ width: "20vw", height: "17vh", marginLeft:"2%", marginRight:"0%", resize:"none", fontSize:"21px", color:"#333"}} value={FirstFixD.WhatNewinDay} name="WhatNewinDay"   onChange={handleChange} disabled={startFix}></textarea>
                                        <button  className="btn  text-warning" style={{backgroundColor: "indigo"}} disabled={startFix} onClick={HandleSubmitClick} >Старт</button>                                 
                        <div className='col-4 w-100 py-5 text-center'>
                           <h5 className="text-warning ">План дальнейших действий выводы и соображения</h5>
                              <div className="container mt-4">
                         <div className="row">
                   <div className="col-6"><h5 className='text-warning'>Что получилось</h5><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", paddingTop:"1%", width:"15vw", height:"100%", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif" }} 
                   value={formData.WhatDone}  onChange={handleChange}></textarea> </div>
                <div className="col-6"><h5 className='text-warning'>Что не получилось</h5><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"10%", width:"15vw", height:"100%", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif"}} 
                value={formData.WhatNotDone} onChange={handleChange}></textarea></div> 
             <div className="w-100 mt-5"><h5 className='text-warning'>Выводы</h5></div>
          <div className="col-6 mx-0"><textarea  className="form-control shadow p-3" id="" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"", width:"34vw", height: "10vh", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif"}}
          
          value={formData.Сonclusions} onChange={handleChange}></textarea>         
              </div>
              <button className="btn p-1 mx-2  rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '100%', marginTop: "2%" }}  aria-expanded="false" disabled={endFix}> записать   </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
  <div className="col text-center text-warning mb-5 p-0 "><h5 className=' rounded p-5 shadow' style={{textAlign:'center', marginBottom: "10%", backgroundColor: 'indigo'}}>{philosophy.TheSay} <br/> <br /><p style={{ textAlign: 'right' }}>"{philosophy.Autohor}"</p></h5>
  {!startFix && refreshTime.Day >= 0 && (
  <h3>Ожидание старта</h3>
)}

{startFix && refreshTime.Day > 0 && !isDayFixed && (
  <h3><Countdown /></h3>
)}

{startFix && refreshTime.Day > 0 && isDayFixed && (
  <h3>Следующий день ещё не начался</h3>
)}
  <div className="col p-5 align-self-center">
    <div className='d-flex justify-content-between rounded p-0 ' style={{textAlign:'center', marginBottom: "0%", backgroundColor: ''}}>
  <button className="btn p-4 px-5 w-50 text-start bg-secondary rounded text-warning" onClick={HandleClickPrev}> <h1>&lt;</h1></button> <span className="border border-dark bg-dark w-25" style={{borderBlockColor:"", fontSize:"30"}}> </span> <button className="btn p-3 px-5 w-50 bg-secondary  text-end  rounded text-warning" onClick={HandleClickNext}><h1> &gt;</h1></button>
  </div>
  </div>
  </div>
  
      <div className="col-4 text-center text-warning" style={{marginBottom: "3%"}}>
           <h5 className="font-italic">Записать новое знание обретённое за день</h5>
               <textarea  className="form-control shadow rounded  p-3 mx-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif"}} id="username"  name="NewKnoledge" value={formData.NewKnoledge} onChange={handleChange}  disabled={endFix} ></textarea>
               <button className="btn p-1 px-1 py-3  rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '95%', marginTop: "2%",marginBottom: "5%" }}  aria-expanded="false" value={formData.NewKnoledge} onClick={HandleRecord}> записать-редактировать   </button>
                 <h5>Мудрость дня</h5>
                     <textarea  className="form-control  rounded shadow p-3  mx-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif" }} onChange={handleChangeWisdom}  disabled={!textareaEditable}></textarea>
                     <button className="btn p-1 px-1 py-3 rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '95%', marginTop: "2%" }}  aria-expanded="false" disabled={endFix}  onClick={HandleRecordWisdom} > {buttonText}   </button>
                       <button className="btn p-4 px-3  rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '95%', marginTop: "9%" }}  aria-expanded="false" disabled={endFix} onClick={HandleSubmitClickFix} > Зафиксировать день
                    </button>
                   </div>
                   <footer className="fixed-bottom" style={{backgroundColor: 'indigo'}} >
  <div className="text-center py-3 text-warning " style={{backgroundColor: 'indigo'}}>
    © 2023 My Website
  </div>
</footer>
       </div>
    </div>
</form>
        </>      
    )
    
}


export default NikkiDoDaily;


