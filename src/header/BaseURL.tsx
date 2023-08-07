import{ createContext, useContext} from "react";
 
interface Config {
  baseUrl: string;
}

export const ConfigContext = createContext<Config | undefined>(undefined);

export function ConfigProvider({ baseUrl, children }: { baseUrl: string; children: React.ReactNode }) {
  return <ConfigContext.Provider value={{ baseUrl }}>{children}</ConfigContext.Provider>;
}