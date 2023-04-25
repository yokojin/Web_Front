import {useContext} from "react";
import { AuthContext } from "../header/AuthProvider";

export function useAuth (){
    
    return  useContext(AuthContext)
}