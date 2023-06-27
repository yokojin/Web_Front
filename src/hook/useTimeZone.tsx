import {useContext} from "react";
import { TimeContext } from "../header/TimeProvider";

export function useTimeZone (){   
   
    
    return  useContext(TimeContext);
}
