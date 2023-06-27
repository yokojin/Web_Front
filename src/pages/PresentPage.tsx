import React from "react";
import { Image } from "react-bootstrap";
import { useAuth } from "../hook/useAuth";

type RequireAuthProps= {
  children: React.ReactNode
}

//Страница на которой можно остовлять отзывы
//

function PresentPage(){
  console.log("открыта станица по ссылке");
  
 
return(
  
<>

<div className="container w-50 vh-100">
    
    <div className="col-10 p-4">
        <div className="jumbotron m-4 d-flex flex-column justify-content-center rounded" style={{backgroundColor: 'indigo', minWidth:'300px'}}>
            <h1 className="display-6 m-5 text-light">Form Registration </h1>
            <form action="" className='mb-3'>   
      <div className="p-5 w-100 py-0">
   <label htmlFor="" className="form-label text-light">Name</label>
<input type="Name" className="form-control" id="Log" aria-describedby="logiN" placeholder='Name'/>
     <div id="logiN" className="form-text text-warning">Введите ваше имя</div>
 </div>
<button type="button" className="btn btn-primary float-end mx-5" >Отправить</button>
</form>
  </div>
    </div>
  </div>
  <footer>
  <div className="text-center p-1 py-1 text-warning" style={{backgroundColor: 'indigo'}}>
    © 2023 My Website
  </div>
</footer>

        </>
  
)


}



export{PresentPage}

