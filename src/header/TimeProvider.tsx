import axios from "axios";
import { createContext,  useState} from "react";
import { useNavigate } from "react-router-dom";

// типизация данных
interface TimeContextValue {  
    TimeZone: string | null;
    setTimeZ: (TimeZone: string | null) => void;
   
}

export const TimeContext = createContext<TimeContextValue>({TimeZone:null, setTimeZ: (TimeZone: string | null) => {} });
//Интерфейс для узлов
interface TimeProviderProps {
    children: React.ReactNode;
}

export const TimeProvider  =  ({children}: TimeProviderProps)=>{

    const [TimeZone,setTimeZone]=useState<string| null>(null);
    

     const setTimeZ=  (TimeZone: string | null) =>{
    
        // Вызываем функцию setTimeZone из TimeProvider и передаем новое значение
        setTimeZone(TimeZone);
      };

    const TimeContextValue= {TimeZone, setTimeZ};
    



    return <>  
    <TimeContext.Provider value={TimeContextValue}>
        <>{children}</>
    </TimeContext.Provider></>
    
}