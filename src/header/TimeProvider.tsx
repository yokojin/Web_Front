import axios from "axios";
import { createContext,  useState} from "react";
import { useNavigate } from "react-router-dom";

// типизация данных
interface TimeContextValue {  
    timeZone: string | null;
    setTimeZ: (timeZone: string | null) => void;
   
}

export const TimeContext = createContext<TimeContextValue>({timeZone:null, setTimeZ: () => {} });
//Интерфейс для узлов
interface TimeProviderProps {
    children: React.ReactNode;
}

export const TimeProvider  =  ({children}: TimeProviderProps)=>{

    const [timeZone,setTimeZone]=useState<string| null>(null);
     const setTimeZ=  (timeZone: string | null) =>{   
        // Вызываем функцию setTimeZone из TimeProvider и передаем новое значение
        setTimeZone(timeZone);
      };
    const TimeContextValue= {timeZone, setTimeZ};   
    return <>  
    <TimeContext.Provider value={TimeContextValue}>
        <>{children}</>
    </TimeContext.Provider></>
    
}