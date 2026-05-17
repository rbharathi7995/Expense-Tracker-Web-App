import { showMessage } from "./message.js";
import { getSalary,storage,salStorage } from "./storage.js";
import { calculateTotal } from "./utils.js";

const Tracker=JSON.parse(localStorage.getItem('Tracker')) || [];

document.querySelector('.js-actual-money').innerHTML=getSalary();




export function renderFunction(){
  
    let listHtml='';
    Tracker.forEach((tracker,index)=>{
   
    listHtml+=`
    <div class="expense-row">
       <div class="task-name">${tracker.task}</div>
       <div class="task-amount">${tracker.Amount}</div>
       <button class="remove-button js-remove-button" data-index="${index}">Remove</button>
    </div>
    `;

    })

   document.querySelector('.js-tracker-container').innerHTML=listHtml;

   const total=calculateTotal(Tracker);
   document.querySelector('.js-final-expense-amount').innerHTML=total;
    document.querySelector('.js-remain-amount').innerHTML=getSalary()-total;


   document.querySelectorAll('.js-remove-button').forEach((button)=>{
       button.addEventListener('click',()=>{
        const clickIndex=Number(button.dataset.index);

        Tracker.splice(clickIndex,1);
        
              storage(Tracker);
          renderFunction();         
       })

   })
   
}
renderFunction();

 

    document.querySelector('.js-add-button').addEventListener('click',()=>{

        const inputName=document.querySelector('.js-task-name').value;
        const inputPrice=Number(document.querySelector('.js-task-price').value);
      
        const total=calculateTotal(Tracker);   
        const savedSalary = getSalary();


        if(inputName === '' || inputPrice <= 0){
            showMessage('.js-message','!Enter valid task and amount');
            return;
        }

         if(total+inputPrice > savedSalary){
           showMessage('.js-message','!Expense money is greater than Actual money so it will leads to debts');
           return;
        }

         if(total+inputPrice > (0.75*savedSalary)){
            showMessage('.js-message','!use your money carefully');
       }
          Tracker.push({
            task :inputName,
            Amount:inputPrice
        })
 
       storage(Tracker);
       renderFunction();
    
        document.querySelector('.js-task-name').value='';
        document.querySelector('.js-task-price').value='';
    })

    document.querySelector('.js-salary-change').addEventListener('click',()=>{
        window.location.href='index.html'
    })

    


   
