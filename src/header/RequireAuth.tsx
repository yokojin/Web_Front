import axios from 'axios';
import { access } from 'fs';
import { useContext, useEffect, useState } from 'react';
import {useLocation, Navigate} from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

type RequireAuthProps= {
    children: React.ReactNode;
   
}

const RequireAuth =  ({children}: RequireAuthProps ) =>{
const location = useLocation();
const {flag } = useAuth();
const tokenStorage = localStorage.getItem("token");

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