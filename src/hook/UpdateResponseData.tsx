import React from "react"
import { FirstFixData, DataUser,PhilosoInterface, RefreshTime, KnowledgeInterface  } from "../header/Interfaces";


export const updateStateData = async (
    response: any, // Замените ResponseType на конкретный тип вашего response
  setFirstFixD: React.Dispatch<React.SetStateAction<FirstFixData>>,
  setDayPhilos: React.Dispatch<React.SetStateAction<PhilosoInterface>>,
  setKnowledge: React.Dispatch<React.SetStateAction<KnowledgeInterface>>,
  setrefreshTime: React.Dispatch<React.SetStateAction<RefreshTime>>,
  setFormData: React.Dispatch<React.SetStateAction<DataUser>>,
  FirstFixD:FirstFixData,
  DayPhilos:PhilosoInterface,
  Knowledge:KnowledgeInterface,
  refreshTime:RefreshTime,
  formData:DataUser
) => {

 setFirstFixD({
    ...FirstFixD,
    WhatNewinDay: response.data.whnd,
  });
  setDayPhilos({
    ...DayPhilos,
    PhiloMind: response.data.philMind,
  });
  setKnowledge({
    ...Knowledge,
    Know: response.data.knowledge,
  });
  setrefreshTime({
    ...refreshTime,
    Day: response.data.day,
  });
  setFormData({
    ...formData,
    WhatDone: response.data.whatDone,
    WhatNotDone: response.data.whatNotDone,
    Сonclusions: response.data.conclusions,
  });
  
  


  return (
    <></>
  )
}


