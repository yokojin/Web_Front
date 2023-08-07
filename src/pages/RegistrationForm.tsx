import { ok } from 'assert';
import axios, { AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { useURL } from '../components/useURL';





interface UserRegistr {
  FirstName: string; 
  LastName: string;
  EmailAddres: string;   
  Password: string;   
  PasswordSec: string;
  TimeZone: string;
  
  //Day: number;  
 }

 function getTimeLeft(date: Date) {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );
  const diff = midnight.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
 // const timerzone = Intl.DateTimeFormat().resolvedOptions().timeZoneName;

return ({ hours, minutes, seconds});
}



  const RegistrationForm = () =>{
  const [isRegistered, setIsRegistered] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const baseUrl = useURL();
  
    //Переменная для установки данных
    // Ещё нужно передать время
    const [UserReg, setUserReg]=useState<UserRegistr>({
      FirstName: "",
      LastName: "",
      EmailAddres: "",
      Password: "",
      PasswordSec:"",
       TimeZone: "",
     });
   
     const [name, setName] = useState<string | null>(null);
       //useState для установки пароля
     const [pass, setPass]=useState<string| null>(null);
      
      
     const handleChangeInput =  async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {  
      //Применяет изменение при сохранений предыдущего объетка
        const {name, value}=event.target;
        setUserReg((prevUserReg,) => ({
          ...prevUserReg,
          [name]:value,
        }))     
        const newTime = {  TimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone};            
        setUserReg(prevState => ({ ...prevState, TimeZone: newTime.TimeZone})); //Меняем часовой пояс для передачи
      }

      
        //Отправка данных для регистрации на сервер
        const HandleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {    
          
                  
          if(UserReg.FirstName==="" || UserReg.LastName==="" ||
            UserReg.EmailAddres==="" ||  UserReg.Password==="" || UserReg.PasswordSec==="" ){
              setErrorMessage("Заполните все поля!"); 
              setIsError(true); setTimeout(() => {
               setIsError(false);                                                    
              }, 2000);
            event.preventDefault();           
                 
          }
          else{
            
            event.preventDefault();
            
            
           // UserReg.TimeNow.Hours=newTime.Hours;      
            console.log("Данные которые отправляются \n" + UserReg.FirstName + 
            '\n' + UserReg.LastName + '\n' + UserReg.EmailAddres + '\n' + UserReg.Password + '\n'  + UserReg.PasswordSec + '\n' 
            + UserReg.TimeZone + '\n');
 
            
            //Отправка формы
            try {             
              setIsRegistered(false);
              const response = await axios.post(`${baseUrl}/Reg/UpdateReg`, 
                 JSON.stringify(UserReg),{
                 //Передача объетка в на сервер
                 headers:{
                  "Content-Type": "application/json",
                 },
        
               }
                  
              );            
              console.log(response.data + " это с сервера"); // Обработка успешного ответа сервера для отслеживания
              await navigate('/login', {replace: true});              
            } catch (error: any ) {               
              //Если регистрация не удаётся 
              setIsError(true);
              setErrorMessage(error.response.data);
              alert(error.response.data);
                console.log(error.response.data);              
                setTimeout(() => {
                  setIsError(false);
                  setIsRegistered(true);
                  setUserReg({
                    ...UserReg,
                  FirstName: "",
                  LastName:"",
                  EmailAddres:"",
                  Password:"",
                  PasswordSec:"",  
                  TimeZone: "",                      
                });
                
                }, 1000);
                             
                console.error(error);
                
            }
           
          }         
        }
        
    return (
      <>
<div className="container-fluid w-50 vh-75 mt-0 p-2 mb-0">

        <div className="col-10 p-3 mt-0">
        
            <div className="jumbotron m-4 d-flex flex-column justify-content-center rounded" style={{backgroundColor: 'indigo', minWidth:'300px'}}>
            
                <h1 className="display-7 px-5 m-1 mt-3 text-light">Form Registration </h1>
                
                <form action="" className="py-3"  onSubmit={HandleSubmit} >   
          <div className="p-5 w-100 py-1">
       <label htmlFor="" className="form-label text-light">Name</label>
    <input type="Name" className="form-control" id="Log" name="FirstName" aria-describedby="logiN" placeholder='Name' disabled={!isRegistered} value={UserReg.FirstName} onChange={handleChangeInput}/>
         <div id="logiN" className="form-text text-warning">Введите ваше имя</div>
     </div>
     <div className="p-5 w-100 py-0">
       <label htmlFor="" className="form-label text-light">Last Name</label>
    <input type="lastName" name="LastName" className="form-control" id="Las" aria-describedby="lastName" placeholder='Last Name' disabled={!isRegistered} value={UserReg.LastName} onChange={handleChangeInput}/>
         <div id="lastName" className="form-text text-warning">Введите вашу фамилию</div>
     </div>
     <div className="p-5 w-100 py-0">
       <label htmlFor="exampleInputEmail1" className="form-label text-light">Email Address</label>
    <input type="email" name="EmailAddres" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled={!isRegistered} placeholder='Enter email' value={UserReg.EmailAddres} onChange={handleChangeInput}/>
         <div id="emailHelp" className="form-text text-warning">Введите адрес электронной почты.</div>
     </div>
  <div className="px-5 w-100 py-2">
    <label htmlFor="exampleInputPassword1" className="form-label text-light" >Пароль</label>
       <input type="password" className="form-control" name="Password" id="InputPassword1" placeholder='Password' disabled={!isRegistered} value={UserReg.Password} onChange={handleChangeInput} />
          </div>      
  <div className="px-5 w-100 py-3">
  <label htmlFor="confirmPassword" className="form-label text-light" >Подтвердите пароль</label>
    <input type="password" className="form-control" id="confirmPassword" name="PasswordSec"  placeholder='PasswordSec' disabled={!isRegistered} value={UserReg.PasswordSec} onChange={handleChangeInput}/>
      </div>    

      
  <button type="submit" className="btn btn-primary float-end mx-5"  disabled={!isRegistered} >Принять</button>
  {isError && <div className="alert alert-danger m-5 py-1 w-50 mt-0 mb-0" role="alert">{errorMessage}</div>}
  </form>
  
      </div>
        </div>
    
</div>
           <footer style={{backgroundColor: 'indigo'}} >
           <div className="text-center p-3 text-warning fixed-bottom"  style={{backgroundColor: 'indigo'}}>
             © 2023 My Website
           </div>
         </footer></>
                    
)

}
export {RegistrationForm}
