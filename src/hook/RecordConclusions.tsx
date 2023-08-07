import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useURL } from "../components/useURL";
import { DataUser} from '../header/Interfaces';
import RefreshAccessToken from "./getAccTok";
import { HandleConclus } from "./HandleOtherRecord";





interface RKConclusionsProps {
  endFix: boolean; // Пропс endFix
  textareaEditableConclus: boolean;
  setTextareaEditableConclus: React.Dispatch<React.SetStateAction<boolean>>;
  formData:DataUser;
  setFormData: (value:React.SetStateAction<DataUser>) => void
}


const RWhatConclusions: React.FC <RKConclusionsProps> = ({ endFix, textareaEditableConclus,setTextareaEditableConclus, formData, setFormData }) => {

  const [showModal, setShowModal] = useState(false);
  const [inOut, setinOut]=useState<boolean>(false);
  const[buttonTextConclus, setbuttonTextConclus]=useState("Редактировать");
  const [whatDone, setWhatDone] = useState(formData.WhatDone);
  const [whatNotDone, setWhatNotDone] = useState(formData.WhatNotDone);
  const [conclusions, setConclusions] = useState(formData.Сonclusions);
  const baseUrl=useURL();
  const navigate=useNavigate();

  useEffect(() => {
    setWhatDone(formData.WhatDone || "");
    setWhatNotDone(formData.WhatNotDone || "");
    setConclusions(formData.Сonclusions || "");
  }, [formData]);




  const handleModalConfirm = async () => {

    await HandleConclus(formData,baseUrl);
    setShowModal(false);
    
  };
  const handleModalCancel = () => {
    setShowModal(false);
  };

  const HandleRecordCocnlucs = async(event: React.FormEvent<HTMLButtonElement>) =>{
    event.preventDefault();
    const result = await RefreshAccessToken(inOut);
    if (result !== undefined) {
      setinOut(result);
      if (!result) {
        navigate('/login', { replace: true });
      }
    }
    if (buttonTextConclus === "Редактировать") {
      // Если endFix равно true и buttonText равно 'Редактировать', то запрещаем редактирование textarea
      setTextareaEditableConclus(true);
      setbuttonTextConclus("Запись")
     
    }  if (buttonTextConclus === 'Запись') {
      setShowModal(true);
      // Если endFix равно true и buttonText равно 'Запись', то разрешаем редактирование textarea
     // await HandleMind(DayPhilos,setDayPhilos);
     setTextareaEditableConclus(false);
      setbuttonTextConclus("Редактировать")     
    } else {
      // Если endFix равно false, то блокируем textarea и кнопку
    
    }
  };

  const handleChangeWhatDone = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWhatDone(event.target.value);
    // Обновите поле WhatDone в formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      WhatDone: event.target.value,
    }));
    if (!textareaEditableConclus) {
      event.preventDefault();     
    } else {}
  };
  
  const handleChangeWhatNotDone = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWhatNotDone(event.target.value);
    // Обновите поле WhatDone в formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      WhatNotDone: event.target.value,
    }));
    if (!textareaEditableConclus) {
      event.preventDefault();     
    } else {}
  };

const handleChangeConclus =  async (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => { 
  setConclusions(event.target.value);   
    setFormData((prevformData) => ({
      ...prevformData,    
      Сonclusions: event.target.value,     
    }))
    if (!textareaEditableConclus) {
      event.preventDefault();     
    } else {}
  };
return (

<>
<div className='col-4 w-100 py-5 text-center'>
                           <h5 className="text-warning ">План дальнейших действий выводы и соображения</h5>
                              <div className="container mt-4">
                         <div className="row">
                   <div className="col-6"><h5 className='text-warning'>Что получилось</h5><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", paddingTop:"1%", width:"15vw", height:"100%", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif" }} 
                   name="whatDone" value={whatDone || ""}  onChange={handleChangeWhatDone} disabled={!textareaEditableConclus} ></textarea> </div>
                <div className="col-6"><h5 className='text-warning'>Что не получилось</h5><textarea  className="form-control shadow p-3" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"10%", width:"15vw", height:"100%", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif"}} 
                value={whatNotDone || ""} disabled={!textareaEditableConclus} onChange={handleChangeWhatNotDone}></textarea></div> 
             <div className="w-100 mt-5"><h5 className='text-warning'>Выводы</h5></div>
          <div className="col-6 mx-0"><textarea  className="form-control shadow p-3" id="" placeholder="Введите текст" style={{padding: "10%", paddingLeft: "1%", marginLeft:"", width:"34vw", height: "10vh", resize:"none", fontSize:"21px", color:"#333", fontFamily: "Arial, sans-serif"}}
          
          value={conclusions || ""} disabled={!textareaEditableConclus} onChange={handleChangeConclus}></textarea>         
              </div>
              <button className="btn p-1 mx-2  rounded text-warning" type="button"  style={{ backgroundColor: 'indigo', width: '100%', marginTop: "2%" }}  aria-expanded="false" disabled={endFix} onClick={HandleRecordCocnlucs}> {buttonTextConclus}  </button>
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
                     </div>
                  </div>
                </div>
</>
)
};

export default RWhatConclusions;