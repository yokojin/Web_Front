
 import axios from "axios";
import React, { useState, useEffect, useCallback } from "react";
import { useTimeZone } from "./useTimeZone";
import moment from "moment-timezone";
import refreshAccessToken from "./getAccTok";
//Отображение таймера в обратную сторону
const Countdown: React.FC= () => { 
  const timeZ=useTimeZone();
  const timeZoneString = timeZ.TimeZone ? timeZ.TimeZone.toString() : "";
 
  const [timeLeft, setTimeLeft] = useState<string>(""); // Хранит форматированное время
    useEffect(() => {
      const interval = setInterval( async () => {
      const now = moment().tz(timeZoneString);  
      console.log(`${timeZoneString}  Часовой пояс который пришёл`);
      const targetDate = moment().tz(timeZoneString).endOf('day');
      console.log(targetDate+ " что сюда пришло");
      const duration = moment.duration(targetDate.diff(now));
      const hours = duration.hours().toString().padStart(2, '0');
      const minutes = duration.minutes().toString().padStart(2, '0');
      const seconds = duration.seconds().toString().padStart(2, '0');
      const timeLeftFormatted = `${hours}:${minutes}:${seconds}`;
      if(seconds==="00" && minutes==="00" && hours==="00"){
        console.log("Сработала фукнция обновления токена");
      // await  refreshAccessToken();  
      }
        setTimeLeft(timeLeftFormatted);
      }, 1000);  
      return () => clearInterval(interval);
    }, [timeZoneString]);  
      
    return (       
        <>
      <div>      
      До конца дня:  {timeLeft}    
      </div>      
      </>    
    );
  };  
  export default Countdown;
