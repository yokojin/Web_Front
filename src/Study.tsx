
import React, { useEffect, useState } from 'react';
import { FormAuth } from './components/FormAuthen';

function fomateName(user:string | any){
    return user.firstName + ' ' + user.lastName + ' '+ user.age 
}


const name ='Ivan';
const element = <h1>Hello, {name}</h1>

const user = {
  firstName: 'Марья',
  lastName: 'Моревна',
  age: 13
};


function Proverka() {

return <div>
    
    {element}
    
    </div>
   


}



export default Proverka;