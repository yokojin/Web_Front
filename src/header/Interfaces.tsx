import React from "react";



export interface DataUser {
    UserId: string| null;
    WhatNewinDay: string;  
    NewKnoledge: string;
    DayPhilosophy: string;   
    WhatDone: string;   
    WhatNotDone: string;   
    Сonclusions: string;    
    //Day: number;  
}


export interface FirstFixData{
    UserId: string | null;
    WhatNewinDay: string;
   // Day: number;
    IsFixedStart: boolean;
    IsFixedEnd: boolean;
   
  }


  export interface RefTimeData{
    UserId: string | null;
    WhatNewinDay: string;
    Day: number; 
    IsFixedStart: boolean;
    IsFixedEnd: boolean;
  }

  export interface IConclusions{
  UserId: string| null; 
  WhatDone: string;   
  WhatNotDone: string;  
  Conclusions: string; 
  }


  export interface KnowledgeInterface{
    UserId: string | null;
    Know: string;
  }

  export interface PhilosoInterface{
    UserId: string | null;
    PhiloMind: string;
  }

  export interface RefreshTime{
    UserId: string | null;
    TimeZone: string | null;
    Day: number; 
    onOffTimer: boolean;
    whnd: string | null;
    isDayFixed: boolean;
  };