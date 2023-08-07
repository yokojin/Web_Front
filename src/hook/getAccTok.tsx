import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


//Написать функцию для обновления токена
interface identy{
  userId: string | null;
  access_token: string | null;
};


const RefreshAccessToken = async (inOut: boolean) => {
//  const navigate=useNavigate();
 
 // const navigate = useNavigate();
  const userID= localStorage.getItem('userId');
  const token = localStorage.getItem('token');
 
 
 //console.log(`${idIdenty}`+ "  " + `${token}`)
  
   // console.log('Обращение к контроллеру');     
    
      try {
        const response = await axios.post('https://localhost:7051/RefreshToken/RefreshToken',
         {},
         {
            headers: {        
              'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`,                                             
            },
            params: {
              userId: userID,
            },
          }         
        );
        const userId = response.data.userid;
        const  tokend = response.data.access_token;       
       // console.log('получили токен: ' + token);
         localStorage.setItem('userId', userId);       
         localStorage.setItem('token', tokend);
         inOut=true
         return inOut;
        // await  navigate('/NikkiDo', { replace: true });
      } catch (error: any) {
        if (error.response.request.status === 401) {
         // console.log('Время ref_token истекло ' + error.response.request.status);
          localStorage.removeItem('token');
        localStorage.removeItem('userId');
        inOut=false
         return inOut;
      //  await  navigate('/login', { replace: true });
        }
      }
  


 

  // или верните любой другой JSX, если нужно
};

export default RefreshAccessToken;
