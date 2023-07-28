import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


//Написать функцию для обновления токена
interface identy{
  userId: string | null;
  access_token: string | null;
};


const RefreshAccessToken = async () => {
  const navigate=useNavigate();
  const [identy, setidenty]=useState<identy>({ 
    userId: localStorage.getItem('userId'),
    access_token: localStorage.getItem('token'),
   } );
 // const navigate = useNavigate();
  const idIdenty= localStorage.getItem('userId');
  const token = localStorage.getItem('token');

 
 //console.log(`${idIdenty}`+ "  " + `${token}`)
  
    console.log('Обращение к контроллеру');     
    const RefToken = async (token: any) => {   
      try {
        const response = await axios.post('https://localhost:7051/RefreshToken/RefreshToken',
          identy,
          {
              params: {
              userId: localStorage.getItem('userId'),
            },
            headers: {        
              'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,                                             
            },
          }         
        );
        const userId = response.data.userid;
         token = response.data.access_token;       
       // console.log('получили токен: ' + token);
         localStorage.setItem('userId', userId);       
         localStorage.setItem('token', token);
        // await  navigate('/NikkiDo', { replace: true });
      } catch (error: any) {
        if (error.response.request.status === 401) {
         // console.log('Время ref_token истекло ' + error.response.request.status);
          localStorage.removeItem('token');
        localStorage.removeItem('userId');
        await  navigate('/login', { replace: true });
        }
      }
    };

  await  RefToken(token);
 

  return null; // или верните любой другой JSX, если нужно
};

export default RefreshAccessToken;
