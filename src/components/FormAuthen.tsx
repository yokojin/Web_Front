import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';


export function FormAuth(){
    const [count,setCount]=useState(0);
    return (
  
<div className="container w-50 vh-100">
    
        <div className="col-10 p-4">
            <div className="jumbotron m-4 d-flex flex-column justify-content-center rounded" style={{backgroundColor: 'indigo', minWidth:'300px'}}>
                <h1 className="display-6 m-5 text-light">Form Registration {count}</h1>
                <form action="" className='mb-3'>   
          <div className="p-5 w-100 py-0">
       <label htmlFor="" className="form-label text-light">Name</label>
    <input type="Name" className="form-control" id="Log" aria-describedby="logiN" placeholder='Name'/>
         <div id="logiN" className="form-text text-warning">Введите ваше имя</div>
     </div>
     <div className="p-5 w-100 py-0">
       <label htmlFor="" className="form-label text-light">Last Name</label>
    <input type="lastName" className="form-control" id="Las" aria-describedby="lastName" placeholder='Last Name'/>
         <div id="lastName" className="form-text text-warning">Введите вашу фамилию</div>
     </div>
     <div className="p-5 w-100 py-0">
       <label htmlFor="exampleInputEmail1" className="form-label text-light">Email Address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter email'/>
         <div id="emailHelp" className="form-text text-warning">Введите адрес электронной почты.</div>
     </div>
  <div className="px-5 w-100 py-3">
    <label htmlFor="exampleInputPassword1" className="form-label text-light" >Пароль</label>
       <input type="password" className="form-control" id="InputPassword1" placeholder='Password'/>
          </div>      
  <div className="px-5 w-100 py-3">
  <label htmlFor="confirmPassword" className="form-label text-light" >Подтвердите пароль</label>
    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" placeholder='Password'/>
      </div>    
  <button type="button" className="btn btn-primary float-end mx-5" onClick={()=>(setCount(count +1),console.log("Clicked"))}>Отправить</button>
  </form>
      </div>
        </div>
    
</div>)
}