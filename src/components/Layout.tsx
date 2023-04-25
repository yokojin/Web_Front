import {useState, useEffect} from 'react';
import {Link,Navigate,Route,Routes,useLocation, useNavigate} from 'react-router-dom';
import {Outlet} from 'react-router-dom';
import { useAuth } from '../hook/useAuth';



 const Layout = () => {  
     const {signout}=useAuth();
     const navigate=useNavigate();
    const locccc= useLocation();
    const [isLogin, setisLogin]= useState<boolean>(false);
    const tokenStorage = localStorage.getItem("token");
    const {flag}=useAuth();
    console.log(locccc);
   
  const handleLogOut = (e: React.MouseEvent<HTMLButtonElement>): void => {  
    signout(()=> navigate('/', {replace: true}))    
  };     
      if(tokenStorage!=null){           
        return (          
          <>         
          <div className="container-fluid-md p-0">
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
              <a className="navbar-brand px-3" href="#">Дневник в стиле Никки До</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Можно использовать для ссылка</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"> Справка</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Возможно ссылка</a>
                  </li>
                </ul>
                {/*<form className="d-flex">
<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
<button className="btn btn-outline-success" type="submit">Search</button>
</form>*/}
              </div>
              <div className="dropdown" >
                <button className="btn btn-primary btn-sm dropdown-toggle p-2 px-4 rounded border  m-0" type="button" id="dropdownMenuButton1"
                  style={{ backgroundColor: 'indigo' }} data-bs-toggle="dropdown" aria-expanded="false">
                  Menu
                </button>
                <ul className="dropdown-menu dropdown-menu-lg-end p-0   bg-secondary" aria-labelledby="dropdownMenuButton1">
                <li className="btn btn-warning btn-m rounded-0 w-100 mt-0 p-2"><Link to="NikkiDo" style={{textDecoration: "none"}}>Дневник NikkiDo</Link></li>
                  <li style={{textDecoration: "none"}}><a className="btn btn-warning btn-m rounded-0 w-100 mt-0 p-2"  href="#">Chat</a></li>
                  <li className="btn btn-warning btn-m rounded-0 w-100 mt-0 p-2"><Link to="NikkiDo/PresentPage" style={{textDecoration: "none"}}>Переход</Link></li>
                  <li ><button className="btn btn-warning btn-m rounded-0 w-100 mt-0 p-2" onClick={handleLogOut}>Выход</button></li>
                </ul>
              </div>
            </nav>
          </div><main className="container-fluid p-0">
              <Outlet />
            </main></>

        );
      }
     else {
      
    return (
        <>
        <div className="container-fluid-md ">
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
          <a className="navbar-brand px-3" href="#">Welcome</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>

              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a>
              </li>
            </ul>
          </div>
          {/* //Дописать кнопку при переключении изменять */}
          <button className="btn btn-primary btn-sm  p-2 px-4 rounded border  m-0" type="button" id="dropdownMenuButton1"
              style={{ backgroundColor: 'indigo' }} data-bs-toggle="" aria-expanded="false" >
              <Link to="/login" style={{textDecoration: "none", color: "white"}} >Log in</Link>
            </button>      
        </nav>
      </div>
        {/* В Outlet происходит вся динамика */}
      <main className="container-fluid p-0 mt-0 pb-2 py-5">
        <Outlet/>
      </main>      
      </>    
    );
     }
}
export {Layout}