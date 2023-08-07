import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useTimeZone } from "./useTimeZone";
import moment from "moment-timezone";






//передать параметры для проверкаи и вывод данных
//Проверка наступил ли следующий день 
const CheckDataClient = async () => {


    // try {
    //     const response = await axios.post(baseUrl +'/CheckDataClient/CheckDataClientController',
    //       null,
    //       {
    //         params: {
    //           userId: localStorage.getItem('userId'),
    //         },
    //         headers: {        
    //           'Content-Type': 'application/json',
    //            Authorization: `Bearer ${token}`,                                             
    //         },
    //       }         
    //     );
    //     const userId = response.data.userid;
    //      token = response.data.access_token;       
    //     console.log('получили токен: ' + token);
    //      localStorage.setItem('userId', userId);       
    //       localStorage.setItem('token', token);
    //     // await  navigate('/NikkiDo', { replace: true });
    //   } catch (error: any) {
    //     if (error.response.request.status === 401) {
    //       console.log('Время ref_token истекло ' + error.response.request.status);
    //       localStorage.removeItem('token');
    //     localStorage.removeItem('userId');
    //     await  navigate('/login', { replace: true });
    //     }
    //   }
    // };



<>
</>
}



export default CheckDataClient;