import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import 'bootstrap/dist/js/bootstrap';



export function MainNavBar(){
   
    return (

      <><body><div className="container-fluid-md">
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
            {/*<form className="d-flex">
<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
<button className="btn btn-outline-success" type="submit">Search</button>
</form>*/}
          </div>

          <div className="dropdown">
            <button className="btn btn-primary btn-sm dropdown-toggle p-2 px-4 rounded border  m-0" type="button" id="dropdownMenuButton1"
              style={{ backgroundColor: 'indigo' }} data-bs-toggle="dropdown" aria-expanded="false">
              Menu
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton1">
              <li><a className="dropdown-item" href="#">Sprint to the goal</a></li>
              <li><a className="dropdown-item" href="#">Chat</a></li>
              <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li>
            </ul>
          </div>
        </nav>
      </div>
      </body>
      <div className="d-flex justify-content-center align-items-center shadow-lg p-3 mb-5  rounded" style={{height: '70vh'}}>
      <div className="text-center border-0 rounded-5 w-50 h-50 overflow-hidden" style={{backgroundColor: 'indigo'}}>
        <h1 className='mt-3 text-warning m-3 p-5'>Добро пожаловать! Страница запущена с целью изучения front и backend разработки</h1>
      </div>
    </div>
    <footer className="bg-light text-center text-lg-start">
  <div className="container p-4">
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

  <div className="text-center p-4 text-warning" style={{backgroundColor: 'indigo'}}>
    © 2023 My Website
  </div>
</footer>
        </>

    )
}