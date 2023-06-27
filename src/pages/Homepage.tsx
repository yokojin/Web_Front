import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';


const  Homepage = () =>{
   
  const isAuthentification =false;

    return (
     <>
     
      <div className="d-flex justify-content-center align-items-center shadow-lg mb-5 m-5 my-5 rounded text-break" style={{height: '68vh'}}>
      <div className="text-center border-0 rounded-5  overflow-hidden p-5" style={{backgroundColor: 'indigo'}} >
        <h3 className='mt-3 text-warning m-2 mb-4 p-3'>Добро пожаловать на мой личный сайт!</h3>  <p className='fs-5 text-warning'>Вы можете вести свой дневник,<br/>  чтобы записывать знание или мудрости приобретённые за день.<br/> 
        А также оставлять отзывы и общатся.<br/>Постепенно функционал будет расширятся.<br/>Спасибо за участие!!!</p>
        
      </div>
    </div>
    <footer className="bg-light text-center text-lg-start pt-0">
  <div className="container p-0">
    <div className="row">
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Attention</h5>
        <p>
          Если вам не сложно зарегестрируйтесь или оставте отзыв)))!!!
        </p>
      </div>
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase">Links</h5>
        <ul className="list-unstyled mb-0">
          <li>
            <a href="#!" className="text-dark">Link 1</a>
          </li>             
        </ul>
      </div>
      <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
        <h5 className="text-uppercase mb-0">Links</h5>

        <ul className="list-unstyled">
          <li>
            <a href="#!" className="text-dark">Link 1</a>
          </li>        
        </ul>
      </div>
    </div>
  </div>

  <div className="text-center  text-warning fixed-bottom" style={{backgroundColor: 'indigo'}}>
    © 2023 My Website
  </div>
</footer>
        </>

    )
}
export  {Homepage}