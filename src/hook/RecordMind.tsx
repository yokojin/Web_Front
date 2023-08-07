import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from "axios";
import React, { useEffect, useState,} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HandleMind } from './HandleOtherRecord';
import { useURL } from '../components/useURL';
import  { PhilosoInterface}  from '../header/Interfaces';
import RefreshAccessToken from './getAccTok';
import { useNavigate } from 'react-router-dom';

 

  
  interface RMindProps {
    endFix: boolean; // Пропс endFix
    textareaEditableMind: boolean;
    setTextareaEditable: React.Dispatch<React.SetStateAction<boolean>>;
    DayPhilos:PhilosoInterface;
    setDayPhilos: (value:React.SetStateAction<PhilosoInterface>) => void
  }

   const RMind: React.FC <RMindProps> = ({ endFix, textareaEditableMind,setTextareaEditable, DayPhilos, setDayPhilos }) => {
    const baseUrl = useURL();
    const [showModal, setShowModal] = useState(false);
    const[buttonText, setbuttonText]=useState("Редактировать");
    const [inOut, setinOut]=useState<boolean>(false);
    const navigate=useNavigate();
    // Остальной код функционального компонента RMind...

  const handleModalConfirm = async () => {

    await HandleMind(DayPhilos, baseUrl);
    setShowModal(false);
    
  };
  
  // Обработка отмены в модальном окне
  const handleModalCancel = () => {
    setShowModal(false);
  };

//Записать данные в колонку пользователя в мудрость дня
  const HandleRecordWisdom = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const result = await RefreshAccessToken(inOut);
    if (result !== undefined) {
      setinOut(result);
      if (!result) {
        navigate('/login', { replace: true });
      }
    }
    if (buttonText === "Редактировать") {
      // Если endFix равно true и buttonText равно 'Редактировать', то запрещаем редактирование textarea
      setTextareaEditable(true);
      setbuttonText("Запись")
     
    }  if (buttonText === 'Запись') {
      setShowModal(true);
      // Если endFix равно true и buttonText равно 'Запись', то разрешаем редактирование textarea
     // await HandleMind(DayPhilos,setDayPhilos);
      setTextareaEditable(false);
      setbuttonText("Редактировать")     
    } else {
      // Если endFix равно false, то блокируем textarea и кнопку
    
    }
  };

  const handleChangeWisdom =  async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => { 
    const {name, value}=event.target;
    setDayPhilos((prevDayPhilos) => ({
      ...prevDayPhilos,
      PhiloMind:value,
    }))
    if (!textareaEditableMind) {
      event.preventDefault();     
    } else {     
     // setTextareaValue(event.target.value);
    }
  };
return (
    <>
<textarea  className="form-control  rounded shadow p-3  mx-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif" }}  name="PhiloMind" value={DayPhilos.PhiloMind || ""}  onChange={handleChangeWisdom}  disabled={!textareaEditableMind}></textarea>
                     <button className="btn p-1 px-1 py-3 rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '95%', marginTop: "2%" }}  aria-expanded="false" disabled={endFix}  onClick={HandleRecordWisdom} > {buttonText}   </button>                   
<Modal show={showModal} onHide={handleModalCancel} centered>
  <Modal.Header closeButton>
    <Modal.Title>Подтверждение</Modal.Title>
  </Modal.Header>
  <Modal.Body>Вы уверены, что хотите сохранить изменения?</Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleModalCancel}>
      Отмена
    </Button>
    <Button variant="primary" onClick={handleModalConfirm}>
      ОК
    </Button>
  </Modal.Footer>
</Modal>

</>
)
};

export default RMind;