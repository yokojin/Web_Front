import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import axios from "axios";
import React, { useEffect, useState,} from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HandleKnowledge } from './HandleOtherRecord';
import { useURL } from '../components/useURL';
import  { KnowledgeInterface}  from '../header/Interfaces';
import RefreshAccessToken from './getAccTok';
import { useNavigate } from 'react-router-dom';

 

  
  interface RKnowProps {
    endFix: boolean; // Пропс endFix
    textareaEditableKnow: boolean;
    setTextareaEditableKnow: React.Dispatch<React.SetStateAction<boolean>>;
    Knowledge:KnowledgeInterface;
    setKnowledge: (value:React.SetStateAction<KnowledgeInterface>) => void
  }

   const RKnow: React.FC <RKnowProps> = ({ endFix, textareaEditableKnow,setTextareaEditableKnow, Knowledge, setKnowledge }) => {
    const baseUrl = useURL();
    const [showModal, setShowModal] = useState(false);
    const[ButtonTextKnowledge, setButtonTextKnowledge]=useState("Редактировать");
    const [inOut, setinOut]=useState<boolean>(false);
    const navigate=useNavigate();
    // Остальной код функционального компонента RMind...

  const handleModalConfirm = async () => {

    await HandleKnowledge(Knowledge, setKnowledge, baseUrl);
    setShowModal(false);
    
  };
  
  // Обработка отмены в модальном окне
  const handleModalCancel = () => {
    setShowModal(false);
  };

//Записать данные в колонку пользователя в мудрость дня
  const HandleRecordKnow = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const result = await RefreshAccessToken(inOut);
    if (result !== undefined) {
      setinOut(result);
      if (!result) {
        navigate('/login', { replace: true });
      }
    }
   
    if (ButtonTextKnowledge === "Редактировать") {
      // Если endFix равно true и buttonText равно 'Редактировать', то запрещаем редактирование textarea
      setTextareaEditableKnow(true);
      setButtonTextKnowledge("Запись")
     
    }  if (ButtonTextKnowledge === 'Запись') {
      setShowModal(true);
      // Если endFix равно true и buttonText равно 'Запись', то разрешаем редактирование textarea
     // await HandleMind(DayPhilos,setDayPhilos);
     setTextareaEditableKnow(false);
     setButtonTextKnowledge("Редактировать")     
    } else {
      // Если endFix равно false, то блокируем textarea и кнопку
    
    }
  };

  const handleChangeKnowledge =  async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => { 
    const {name, value}=event.target;
    setKnowledge((prevKnowledge) => ({
      ...prevKnowledge,
      Know:value,
    }))
    if (!textareaEditableKnow) {
      event.preventDefault();     
    } else {     
     // setTextareaValue(event.target.value);
    }
  };

  
  return (
    <>
<textarea  className="form-control shadow rounded  p-3 mx-3" placeholder="Введите текст" style={{width: "30vw", height: "15vh", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif"}} id="username"  name="Know" value={Knowledge.Know || ""} onChange={handleChangeKnowledge}  disabled={!textareaEditableKnow} ></textarea>
               <button className="btn p-1 px-1 py-3  rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '95%', marginTop: "2%",marginBottom: "5%" }}  aria-expanded="false" disabled={endFix}  onClick={HandleRecordKnow}>{ButtonTextKnowledge}  </button>                   
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

export default RKnow;