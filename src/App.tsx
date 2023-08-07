import { Routes, Route} from 'react-router-dom';
import  NikkiDoDaily  from './pages/NikkiDoDaily';
import { RegistrationForm } from './pages/RegistrationForm';
import { FormAuth } from './pages/FormAuthen';
import {Homepage} from './pages/Homepage';
import {Layout} from './components/Layout';
import {RequireAuth} from './header/RequireAuth';
import {AuthProvider } from './header/AuthProvider';
import { PresentPage } from './pages/PresentPage';
import { DayList } from './pages/DayListChat';
import { TimeProvider } from './header/TimeProvider';
import { ConfigProvider } from './header/BaseURL';


function  App() {
  const baseUrl = "https://localhost:7051";
  return (

    <AuthProvider>
    <TimeProvider>
    <ConfigProvider baseUrl={baseUrl}>
       {/*Есть базовый маршрут через который мы делаем переходы по маршруту */}
      <Routes>
      
      <Route path="/" element={<Layout/>}>
      <Route path="/"  element={<Homepage/>}/> 
      <Route path="/login" element={<FormAuth/>}/>     
      <Route path='registr' element={<RegistrationForm/>}/>  
      <Route path="/NikkiDo" element={   
        <RequireAuth >
          <NikkiDoDaily/>   
        </RequireAuth>
    } /> 
      <Route path="/NikkiDo/PresentPage" element={   
        <RequireAuth >
          <PresentPage/>  
        </RequireAuth>
    } /> 
    <Route path="/DayListChat" element={   
        <RequireAuth >
          <DayList/>   
        </RequireAuth>
    } />  
      <Route path='*' element={<></>}/>{/*для всех остальных случаев */}
      </Route>      
      </Routes>
    </ ConfigProvider>
      </TimeProvider>
      </AuthProvider>
      
  );
}

export default App;
