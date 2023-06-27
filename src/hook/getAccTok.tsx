import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTimeZone } from './useTimeZone';


//Написать функцию для обновления токена
interface identy{
  userId: string | null;
  access_token: string | null;
};





const RefreshAccessToken = async () => {
  
  const [identy, setidenty]=useState<identy>({ 
    userId: localStorage.getItem('userId'),
  access_token: localStorage.getItem('token'),
   } );
  const navigate = useNavigate();
  const idIdenty= localStorage.getItem('userId');
  const tokeIndenty = localStorage.getItem('token');


  
 console.log({idIdenty}+ "  " + {tokeIndenty})
  useEffect(() => {        
    const RefToken = async () => {   
      try {
        const response = await axios.post(
          'https://localhost:7051/refresh-token',
          identy,
          {
            headers: {             
              userId: localStorage.getItem('userId'),
              access_token: localStorage.getItem('token'),
              
            },
          }
          
        );
        const userId = response.data.userid;
        const access_token = response.data.access_token.result;       
        console.log('получили токен: ' + access_token);
         localStorage.setItem('userId', userId);
         localStorage.setItem('token', access_token);
        
      } catch (error: number | any) {
        if (error.response.request.status === 401) {
          console.log('Время access_token истекло ' + error.response.request.status);
        //await  navigate('/login', { replace: true });
        }
      }
    };

    RefToken();
  }, [navigate]);

  return null; // или верните любой другой JSX, если нужно
};

export default RefreshAccessToken;
