
import { showMessage } from "./message.js";
import { salStorage } from "./storage.js";

  document.querySelector('.js-ok-button').addEventListener('click',()=>{
      handleSalary();

    });
  document.querySelector('.js-salary-bar').addEventListener('keydown',(event)=>{
            if(event.key === 'Enter'){
                handleSalary();
            }
        })


 function handleSalary(){

    const inputSalary=document.querySelector('.js-salary-bar').value;

        if(inputSalary === '' || inputSalary<=0){
            showMessage('.js-salary-message','!Enter valid amount','red');
            return;
        }
         document.querySelector('.js-salary-bar').value='';
         //document.querySelector('.js-actual-money').innerHTML=inputSalary;
         salStorage(inputSalary);

         window.location.href='expense.html';
 }