import jwtDecode from 'jwt-decode';
import { useEffect,  } from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

type RequireAuthProps= {
    children: React.ReactNode;
   
}

const RequireAuth =  ({children}: RequireAuthProps ) =>{
const location = useLocation();
const {flag } = useAuth();
const tokenStorage = localStorage.getItem('token');

//Нужно включать таймер для бездействия если время выходит делать выход
//нужно будет отправить access_token и userid 

const isAccessTokenExpired = (tokenStorage: string): boolean => {
    try {
      const decodedToken: any = jwtDecode(tokenStorage);
      const currentTimestamp = Math.floor(Date.now() / 1000); // Текущее время в секундах
      
      return decodedToken.exp < currentTimestamp;
    } catch (error) {
      // В случае ошибки декодирования, считаем токен недействительным
      return true;
    }
     
  };

useEffect(() => {
    console.log('myState has changed:', flag);
  }, [flag]);

  
    if (tokenStorage===null){        
        return <Navigate to="/login" state={{from: location.pathname}}/> 
    }
    else {
        
    return  <>{children}</>; 
    }
}

export {RequireAuth};