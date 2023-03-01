import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import 'bootstrap/dist/js/bootstrap';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




export function MainSite(){
   
    return (
      <div className="container-fluid-md">
<nav className="navbar navbar-expand-lg navbar-light bg-light p-0"> 
    <a className="navbar-brand px-3" href="#" >Добро пожаловать</a>
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
  <button className="btn btn-primary btn-sm dropdown-toggle p-2 px-4 rounded border border-white m-0" type="button" id="dropdownMenuButton1" 
   style={{backgroundColor: 'indigo'}} data-bs-toggle="dropdown" aria-expanded="false">
    Menu
  </button>
  <ul className="dropdown-menu dropdown-menu-lg-end bg-warning" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href="#">Sprint to the goal</a></li>
    <li><a className="dropdown-item" href="#">Chat</a></li>
    <li><a className="dropdown-item" href="#">Что-то еще здесь</a></li>
  </ul>
</div>
        
  
</nav>
</div>
    )
}