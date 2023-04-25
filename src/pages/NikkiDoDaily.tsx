import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from "axios";
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


interface DataUser {
 WhatNewinDay: string;  
 NewKnoledge: string;
 DayPhilosophy: string;   
 WhatDone: string;   
 WhatNotDone: string;   
 Сonclusions: string;    
 //Day: number;  
}




export function NikkiDoDaily() {
 
  const {signout}=useAuth();
  const navigate=useNavigate();
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

  //  const [NewKnoledge, setNewKnoledge] = useState<string | null>();
  //  const [DayPhilosophy, setDayPhilosophy] = useState<string | null>();
  //  const [WhatDone, setWhatDone] = useState<string | null>();
  //  const [WhatNotDone, setWhatNotDone] = useState<string | null>();
  //  const [Сonclusions, setСonclusions] = useState<string | null>();


  //  const data={
  //   textarea1:WhatNewinDay,
  //   textarea2:NewKnoledge,
  //   textarea3:DayPhilosophy,
  //   textarea4:WhatDone,
  //   textarea5:WhatNotDone,
  //   textarea6:Сonclusions
  //  };


  const HandleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    try {
      const response = await axios.post('https://localhost:7051/Test/Index', 
         JSON.stringify(formData),{
         //Передача объетка в на сервер
         headers:{
          "Content-Type": "application/json",
         },

       }
          
      );
  
      console.log(response.data); // Обработка успешного ответа сервера
    } catch (error) {
      console.error(error); // Обработка ошибки сервера
    }
  
  }



  const handleChange =  async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    
    // setWhatNewinDay(event.target.value);
    // setNewKnoledge (event.target.value);
    // setDayPhilosophy(event.target.value);
    // setWhatDone(event.target.value);
    // setWhatNotDone (event.target.value);
    // setСonclusions (event.target.value);
    // setTestIn(event.target.value);

      const {name, value}=event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]:value,
      }))


    // try {
    //   const response = await axios.post('https://localhost:7051/Test/Index', {
    //     whatWant,
    //   });

    //   console.log(response.data); // Обработка успешного ответа сервера
    // } catch (error) {
    //   console.error(error); // Обработка ошибки сервера
    // }


  };
   console.log(  formData.WhatNewinDay + " " + formData.NewKnoledge + " " + formData.DayPhilosophy + " " +formData.WhatDone + " " +formData.WhatNotDone + " " +formData.Сonclusions + " переданный текст");

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
<form  onSubmit={HandleSubmit}>
<div className="container-fluid p-3">
     <div className="row align-items-center my-0  bg-secondary" style={{height: "100%"}}>
         <div className='d-flex'>
               <h1 className='text-md-start text-warning px-3' style={{marginBottom: "4%"}}>День {/*Вывод дня*/}</h1>
                  <div className='position-absolute top-2 end-0 text-center'>
                    {/*здесь будет вывод даты*/}
                      <h2 className='mx-5 text-warning'>Число 12{} Месяц 06{} Год 2023{}</h2>
                 </div>
              </div>  
                    <div className="col text-start" style={{marginRight: "4%"}}>                     
                        <h5 className='text-center text-warning'>Что хотелось бы узнать или сделать за день</h5>
                              <div className="input-group mb-3" style={{padding: "1%", paddingLeft: "1%", paddingTop:"1%", width:"35vw"}}>       
                                   <textarea  className="form-control shadow p-3"  placeholder="Введите текст" style={{ width: "20vw", height: "20vh", marginLeft:"2%", marginRight:"0%", resize:"none"}} value={formData.WhatNewinDay} name="WhatNewinDay"  onChange={handleChange} ></textarea>
                                        <button  className="btn  text-warning" type="submit" id="basic-addon2" style={{backgroundColor: "indigo"}} value=""  >Кнопка</button>
                        <div className='col-4 w-100 py-5 text-center'>
                           <h5 className="text-warning ">План дальнейших действий выводы и соображения</h5>
                              <div className="container mt-4">
                         <div className="row">
                   <div className="col-6"><label><h5 className='text-warning'>Что получилось</h5></label><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", paddingTop:"1%", width:"15vw", height:"100%", resize:"none"}} 
                   value={formData.WhatDone}  onChange={handleChange}></textarea> </div>
                <div className="col-6"><label><h5 className='text-warning'>Что не получилось</h5></label><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"10%", width:"15vw", height:"100%", resize:"none"}} 
                value={formData.WhatNotDone} onChange={handleChange}></textarea></div> 
             <div className="w-100 mt-5"><h5 className='text-warning'>Выводы</h5></div>
          <div className="col-6"><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"", width:"34vw", height: "10vh", resize:"none"}}
          value={formData.Сonclusions} onChange={handleChange}></textarea>
              </div>
                     </div>
                  </div>
                </div>
              </div>
            </div>
  <div className="col text-center text-warning mb-5 pb-5 "><h5 className=' rounded p-5 shadow p-3' style={{textAlign:'center', marginBottom: "50%", backgroundColor: 'indigo'}}>Здесь буду афоризмы или философские изречения</h5>
  </div>
      <div className="col-4 text-center text-warning" style={{marginBottom: "15%"}}>
           <h5 className="font-italic">Записать новое знание обретённое за день</h5>
               <textarea  className="form-control-right rounded shadow p-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none"}} value={formData.NewKnoledge} name="NewKnoledge" onChange={handleChange}></textarea>
                 <h5>Мудрость дня</h5>
                     <textarea  className="form-control-right rounded shadow p-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none"}} onChange={handleChange}></textarea>
                       <button className="btn  btn-sm  p-2 px-4 rounded text-warning" type="button" id="" style={{ backgroundColor: 'indigo' }}  aria-expanded="false"> Button
                    </button>
                   </div>
                   <footer style={{backgroundColor: 'indigo'}} >
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


