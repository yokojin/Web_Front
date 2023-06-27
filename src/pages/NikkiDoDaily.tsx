import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from 'react';
import * as signalR from "@microsoft/signalr";
import Countdown from '../hook/useTimer';
import DateToday from '../hook/DateToday';
import { useTimeZone } from '../hook/useTimeZone';
import RefreshAccessToken from '../hook/getAccTok';
import { useNavigate } from "react-router-dom";




//Данные дневника
interface DataUser {
 WhatNewinDay: string;  
 NewKnoledge: string;
 DayPhilosophy: string;   
 WhatDone: string;   
 WhatNotDone: string;   
 Сonclusions: string;    
 //Day: number;  
}
//Данные для фиксации первого дня
interface FirstFixData{
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

interface RefreshTimer{
  UserId: string | null;
  TimeZone: string | null;
  Day: number | null; 
  onOffTimer: boolean;
  whnd: string | null;
};


interface Zona{
  timeZone: string | null;
};


type TimerProps = {
  hours: number;
  minutes: number;
  seconds: number;
};


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
 const [dayNumber, setDayNumber]=useState<number>(0);
 const {TimeZone, setTimeZ} = useTimeZone();
 const [startFix, setStartFix]=useState<boolean>(true);
 const [endFix, setEndFix]=useState<boolean>(true);
 const navigate=useNavigate();
 const usId=localStorage.getItem('userId');
 const token=localStorage.getItem('token');

 
 
// Переменные для складывания в массив
  // const [WhatNewinDay, setWhatNewinDay,] = useState<string | null>();
   const [formData, setFormData]=useState<DataUser>({
    WhatNewinDay: "",
    NewKnoledge: "",
    DayPhilosophy: "",
    WhatDone: "",
    WhatNotDone: "",
    Сonclusions: "",
   // Day: 0,
   });
   
   const [FirstFixD, setFirstFixD]=useState<FirstFixData>({
    UserId: usId,
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
   const [refreshTime, setrefreshTime]=useState<RefreshTimer>({ 
    UserId: localStorage.getItem('userId'),
    TimeZone:"",
    Day: 0,
    onOffTimer: false,
    whnd:""
   }
   );
    
  
  // RefreshAccessToken();
    //Проверка: начат ли день или нет а точнее обновление страницы 
    //Если траница обновлена то выставить таймер по часовму поясу 
    console.log('Отслеживание обновления сраницы');   
    useEffect(  () => {
      
      const FetchData = async () => {   
        //Проверка и обвноление токена           
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
           
            console.log("timeZOne: "+ response.data.timeZone +"\n");
            console.log(response.data.day);
            
            setTimeZ(response.data.timeZone);
           
            setStartFix(response.data.onOffTimer);                    
                      console.log("Запись бля: "+ response.data.whnd);
            setFirstFixD({
              ...FirstFixD,  // копируем текущее состояние объекта
             WhatNewinDay: response.data.whnd,  // изменяем значение свойства Day
            });
            setrefreshTime({
              ...refreshTime,  // копируем текущее состояние объекта
              Day: response.data.day,  // изменяем значение свойства Day
            });
           
            console.log(response.data.timeZone); // Обработка успешного ответа сервера
            
    
            // Другая логика, основанная на данных из response когда токен не валиден отправить на страницу log in 
          } catch(response: number| any) {
            
             
            if(response.request.status===401){
              console.log("Время access_token истекло " + response.request.status);
              // await  navigate("/login", { replace: true });
            //   RefreshAccessToken(); 
              
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

            FetchData();
          
         // NeedDay();
        // Логика, которую нужно выполнить при обновлении страницы
        const handlePageRefresh = (event: BeforeUnloadEvent) => {
          event.preventDefault();
         
        };   
        window.addEventListener('beforeunload', handlePageRefresh);
           
        return () => {
          window.removeEventListener('beforeunload', handlePageRefresh);
        };
         
    }, []);
    
    
 
   
   
   // if(formData.WhatNewinDay==="Введите текст")
   // {Checker();} else {}

    //   async function Checker() {  
             
    //     try {         
    //       const response = await axios.post('https://localhost:7051/NikkiDo/CheckData',       
    //          JSON.stringify(FirstFixD),{
    //          //Передача объекта в на сервер
    //          headers:{
    //           "Content-Type": "application/json",
    //           'Authorization': `Bearer ${token}`,
    //          },
    //        }         
    //       ); 
                       
    //       console.log(response.data); // Обработка успешного ответа сервера
    //      // formData.WhatNewinDay=response.data.value.whatInDay;
    //     //  setFormData( formData.WhatNewinDay= response.data.value.whatInDay);  
    //     setFormData(prevState => ({ ...prevState, WhatNewinDay: response.data.value.whatInDay}));         
    //       setDayNumber(response.data.value.day)
    //       console.log(formData.WhatNewinDay);
    //       setStartFix(false);
          
    //      // console.log(dayNumber);
    //     } catch (error) {
    //       console.error(error); // Обработка ошибки сервера
    //     }   
                  
    // }
    

   //по истечению дня день блокировать только после фиксации
   
  const HandleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
       
    event.preventDefault();  
    try {
      
      const response = await axios.post('https://localhost:7051/NikkiDo/FirstFixData',       
         JSON.stringify(refTime),{
         //Передача объетка в на сервер
         headers:{
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
         },
       }         
      );       
      console.log(response.data); // Обработка успешного ответа сервера
     // console.log(dayNumber);
    } catch (error) {
      console.error(error); // Обработка ошибки сервера
    }

  



    



  //setDayNumber(dayNumber+1);

  // setFirstFixD({
  //   ...FirstFixD,  // копируем текущее состояние объекта
  //   Day: dayNumber,  // изменяем значение свойства Day
  // });
  // }
 
  }
 
 
  //Зафиксировать Начало дня
  const HandleSubmitClick = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    //Отправляем  id,
    console.log(dayNumber);
   
    try {
         setStartFix(true);
      const response = await axios.post('https://localhost:7051/NikkiDo/FirstFixData',       
         JSON.stringify(localStorage.getItem("userid")),{
         //Передача объетка в на сервер
         headers:{
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
         },

       }
          
      );
      console.log(response.data); // Обработка успешного ответа сервера
      
     // console.log(dayNumber);
    } catch (error) {
      console.error(error); // Обработка ошибки сервера
    }
  }

//Кнопка для завершения дня
const HandleSubmitClickFix=async (event: React.FormEvent<HTMLButtonElement>) => {
  event.preventDefault();
  setEndFix(false);
  try {   
    const response = await axios.post('https://localhost:7051/NikkiDo/StopDay',       
       JSON.stringify(FirstFixD),{
       //Передача объетка в на сервер
       headers:{
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
       },

     }
        
    );
    console.log(response.data); // Обработка успешного ответа сервера
  } catch (error) {
    console.error(error); // Обработка ошибки сервера
  }
}

/*
// Кнопка фиксации дня 
  const HandleFixClick = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    console.log(dayNumber);
    setStartFix(false);
    try {   
      const response = await axios.post('https://localhost:7051/NikkiDo/FirstFixData',       
         JSON.stringify(FirstFixD),{
         //Передача объетка в на сервер
         headers:{
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
         },

       }
          
      );
      console.log(response.data); // Обработка успешного ответа сервера
     // console.log(dayNumber);
    } catch (error) {
      console.error(error); // Обработка ошибки сервера
    }
  }
*/

  
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
      setFirstFixD((prevFirstFixD) => ({
        ...prevFirstFixD,
        [name]:value,
      }))

      
  };

 //  console.log(  FirstFixD.WhatNewinDay + " " + formData.NewKnoledge + " " + formData.DayPhilosophy + " " +formData.WhatDone + " " +formData.WhatNotDone + " " +formData.Сonclusions + " переданный текст");
   
  // вместо props передан объект
 // const vivod = days.id_user_day?.toString() + ' ' + days.NewknowDay+ ' ' + days.WhatDidnt;
    return ( 
      
//       <><div className="container-fluid-md">
    
//         <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
//           <a className="navbar-brand px-3" href="#">Дневник в стиле Никки До</a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                    <a className="nav-link active" aria-current="page" href="#">Можно использовать для ссылка</a>
//                </li>
//                 <li className="nav-item">
//                    <a className="nav-link" href="#"> Справка</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Возможно ссылка</a>
//               </li>
//             </ul>
//             {/*<form className="d-flex">
// <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
// <button className="btn btn-outline-success" type="submit">Search</button>
// </form>*/}
//           </div>
//           <div className="dropdown">
//              <button className="btn btn-primary btn-sm dropdown-toggle p-2 px-4 rounded border  m-0" type="button" id="dropdownMenuButton1"
//               style={{ backgroundColor: 'indigo' }} data-bs-toggle="dropdown" aria-expanded="false">
//               Menu
//             </button>
//         <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton1">
//             <li><a className="dropdown-item" href="#">Sprint to the goal</a></li>
//               <li><a className="dropdown-item" href="#">Chat</a></li>
//                   <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li>
//                   <li><button onClick={() => signout(()=> navigate('/', {replace: true}))}>Выход</button></li>
//                 </ul>
//             </div>
//         </nav>
//    </div>

<>

<form  onSubmit={HandleSubmit} >
<div className="container-fluid p-3 py-3"  style={{}}>
     <div className="row align-items-center my-0  bg-dark" style={{height: "100%",minWidth: "900px"}}>
         <div className='d-flex'>
               <h1 className='text-md-start text-warning px-3' style={{marginBottom: "4%"}}>День  {refreshTime.Day}</h1>
                  <div className='position-absolute top-2 end-0 text-center'>
                    {/*здесь будет вывод даты*/}
                    
                      <h2 className='mx-5 text-warning'> <DateToday></DateToday></h2>
                 </div>
              </div>  
                    <div className="col text-start" style={{marginRight: "4%",minWidth: ""}}>                   
                        <h5 className='text-center text-warning'>Что хотелось бы узнать или сделать за день</h5>
                              <div className="input-group mb-3" style={{padding: "1%", paddingLeft: "1%", paddingTop:"1%", width:"35vw"}}>                            
                               <textarea  className="form-control shadow p-3"  placeholder="Введите текст"  style={{ width: "20vw", height: "20vh", marginLeft:"2%", marginRight:"0%", resize:"none"}} value={FirstFixD.WhatNewinDay} name="WhatNewinDay"   onChange={handleChange} disabled={startFix}></textarea>
                                        <button  className="btn  text-warning" style={{backgroundColor: "indigo"}} disabled={startFix} onClick={HandleSubmitClick} >Старт</button>                                 
                        <div className='col-4 w-100 py-5 text-center'>
                           <h5 className="text-warning ">План дальнейших действий выводы и соображения</h5>
                              <div className="container mt-4">
                         <div className="row">
                   <div className="col-6"><h5 className='text-warning'>Что получилось</h5><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", paddingTop:"1%", width:"15vw", height:"100%", resize:"none"}} 
                   value={formData.WhatDone}  onChange={handleChange}></textarea> </div>
                <div className="col-6"><h5 className='text-warning'>Что не получилось</h5><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"10%", width:"15vw", height:"100%", resize:"none"}} 
                value={formData.WhatNotDone} onChange={handleChange}></textarea></div> 
             <div className="w-100 mt-5"><h5 className='text-warning'>Выводы</h5></div>
          <div className="col-6"><textarea  className="form-control shadow p-3" id="" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"", width:"34vw", height: "10vh", resize:"none"}}
          value={formData.Сonclusions} onChange={handleChange}></textarea>
              </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
  <div className="col text-center text-warning mb-5 p-0 "><h5 className=' rounded p-5 shadow' style={{textAlign:'center', marginBottom: "10%", backgroundColor: 'indigo'}}>Здесь буду афоризмы или философские изречения</h5>
        {startFix && <h3><div><Countdown></Countdown></div></h3>}
  <div className="col p-5 align-self-center">
    <div className='d-flex justify-content-between rounded p-0 ' style={{textAlign:'center', marginBottom: "0%", backgroundColor: ''}}>
  <button className="btn p-4 px-5 w-50 text-start bg-secondary rounded text-warning" onClick={HandleClickPrev}> <h1>&lt;</h1></button> <span className="border border-dark bg-dark w-25" style={{borderBlockColor:""}}> </span> <button className="btn p-3 px-5 w-50 bg-secondary  text-end  rounded text-warning" onClick={HandleClickNext}><h1> &gt;</h1></button>
  </div>
  </div>
  </div>
  
      <div className="col-4 text-center text-warning" style={{marginBottom: "4%"}}>
           <h5 className="font-italic" >Записать новое знание обретённое за день</h5>
               <textarea  className="form-control-right rounded shadow p-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none"}} id="username"  name="NewKnoledge" onChange={handleChange}></textarea>
                 <h5>Мудрость дня</h5>
                     <textarea  className="form-control-right rounded shadow p-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none"}} onChange={handleChange}></textarea>
                       <button className="btn p-5 px-3  rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '95%', marginTop: "19%" }}  aria-expanded="false" disabled={!endFix} onClick={HandleSubmitClickFix} > Зафиксировать день
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