import  { useContext } from "react"; // Путь к вашему файлу с ConfigProvider
import { ConfigContext } from "../header/BaseURL";


export function useURL() {
    const config = useContext(ConfigContext);
  
    if (!config) {
      throw new Error("useURL must be used within a ConfigProvider");
    }
  
    return config.baseUrl;
  }