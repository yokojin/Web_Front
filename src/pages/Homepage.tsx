import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';


const  Homepage = () =>{
   
  const isAuthentification =false;

    return (

      /*<><body><div className="container-fluid-md">
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
          <a className="navbar-brand px-3" href="#">Страница входа</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
              </li>
            </ul>
            
          </div>

          

          <button className="btn btn-primary btn-sm  p-2 px-4 rounded border  m-0" type="button" id="dropdownMenuButton1"
              style={{ backgroundColor: 'indigo' }} data-bs-toggle="" aria-expanded="false">
              Log in
            </button>
           
          
           
            
        </nav>
      </div>
      </body>
      */
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