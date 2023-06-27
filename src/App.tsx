import { Routes, Route} from 'react-router-dom';
import  NikkiDoDaily  from './pages/NikkiDoDaily';
import { RegistrationForm } from './pages/RegistrationForm';
import { FormAuth } from './pages/FormAuthen';
import {Homepage} from './pages/Homepage';
import {Layout} from './components/Layout';
import {RequireAuth} from './header/RequireAuth';
import {AuthProvider } from './header/AuthProvider';
import { PresentPage } from './pages/PresentPage';
import { Chat } from './pages/OpenChat';
import { TimeProvider } from './header/TimeProvider';


function  App() {
  return (

    <AuthProvider>
    <TimeProvider>
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
    <Route path="/Chat" element={   
        <RequireAuth >
          <Chat/>   
        </RequireAuth>
    } />  
      <Route path='*' element={<></>}/>{/*для всех остальных случаев */}
      </Route>      
      </Routes>
      </TimeProvider>
      </AuthProvider>
      
  );
}

export default App;
