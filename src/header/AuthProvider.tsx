import axios from "axios";
import { createContext,  useState} from "react";
import { useNavigate } from "react-router-dom";

// типизация данных
interface AuthContextValue {
    user: string | null;
    password: string | null;
    flag: boolean;
    signin: (newUser: string | null, password: string | null, flag:boolean,  cb: () => void) => void;
    signout: (cb: any) => void;  
}
interface DataResponse{
    message: string;
};
 //Создание контекста
export const AuthContext = createContext<AuthContextValue>({user: null,  password:null, flag: false,  signin: () => {}, signout: () => {}});
//Интерфейс для узлов
interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider =({children}: AuthProviderProps)=>{
    const [user,setUser]=useState<string| null>(null);
    const [password, setPassword]=useState<string| null>(null);
    const [flag, setFlag]=useState<boolean>(false);    
    const setToken = async (token: string) => {
        
        localStorage.setItem('token', token);
        const savedToken = localStorage.getItem('token');
       
        if (savedToken !== token) {
          console.error('Ошибка при сохранении токена в localStorage');         
        } else{
            setFlag(true);               
            console.log("Успех!");            
        }
    }

    const removeToken = async () => {
        localStorage.removeItem('token');
        setFlag(false);
        console.log("Token has been delete");
        
    }

    console.log("Попадание в провайдер");
    const navigate=useNavigate();
    const signin= async (newUser: string | null,   password: string | null, flag: boolean, cb: () => void) => {   
        //  const tokenKey = "accessToken";
        // Функция для отправки запроса на авторизацию
        // Функция для получения данных   
        const Request = async (user: {username: string | null, flag: boolean, password: string | null}) => {              
           
            try {               
                const token="your token";
                const response = await axios.post(`https://localhost:7051/login`, user,{
                    headers: {
                        'Content-Type':'application/json',                                   
                    },
                    params: {
                        access_token: token,                       
                    }                          
                } );     
                   await setToken(response.data.access_token); 
                   await  navigate("/NikkiDo", { replace: true });
                    console.log("Тест_2: "+ flag);
                console.log("Получение " +response.data.access_token);  
                
                 // Обработка успешного ответа сервера
              } catch (error) {
                
                console.error(error); // Обработка ошибки сервера
              }            
            }

        cb =  async () => {
            //Логика для порверки пользователя будет тут           
            setUser(newUser);
            setPassword(password);
            Request({ username: newUser, flag, password: password })         
          };
               
          if (cb) {
          await cb();
          }
    }
    
    const signout= async (cb: any) => {  
       await removeToken();
       navigate("/", { replace: true });
        //cb();
    }     
    const authContextValue= {user, password, flag, signin, signout,};

    console.log("пришло имя ===== " + user + " контескт " +AuthContext +" flag " + flag);
  
    return <>  
    <AuthContext.Provider value={authContextValue}>
        <>{children}</>
    </AuthContext.Provider></>
    
}



