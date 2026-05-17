const Tracker=JSON.parse(localStorage.getItem('Tracker')) || [{
    task:'current Bill',
    Amount:500
},
{
    task:'House Rent',
    Amount:5000

}];
// imp for the feature i.e when we update the salary it should compare the values of new salary
//instead of old salary
function getSalary(){
   return Number(localStorage.getItem('inputSalary')) || 0;
}

document.querySelector('.js-actual-money').innerHTML=getSalary();

function calculateTotal(){
    let total=0;
     Tracker.forEach((tracker)=>{
    total+=Number(tracker.Amount);
      
 })
 return total;
}

function storage(){
  localStorage.setItem('Tracker',JSON.stringify(Tracker))
}

function salStorage(inputSalary){
    localStorage.setItem('inputSalary',JSON.stringify(Number(inputSalary)));
}

function renderFunction(){
  
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

   document.querySelectorAll('.js-remove-button').forEach((button)=>{
       button.addEventListener('click',()=>{
        const clickIndex=button.dataset.index;
        Tracker.splice(clickIndex,1);
              storage();
              renderFunction();         
       })

   })
   
}
renderFunction();

    document.querySelector('.js-ok-button').addEventListener('click',()=>{
        const inputSalary=document.querySelector('.js-salary-bar').value;
        
         document.querySelector('.js-salary-bar').value='';
         document.querySelector('.js-actual-money').innerHTML=inputSalary;
         salStorage(inputSalary);
       //  renderFunction();

    });

    document.querySelector('.js-add-button').addEventListener('click',()=>{

        const inputName=document.querySelector('.js-task-name').value;
        const inputPrice=Number(document.querySelector('.js-task-price').value);
      
        const total=calculateTotal();

         const savedSalary = getSalary();
         if(total+inputPrice > savedSalary){
           alert('Expense money is greater than Actual money so it will leads to debts');
           return;
        }

         if(total+inputPrice > (0.75*savedSalary)){
            alert('use your money carefully');
       }
          Tracker.push({
            task :inputName,
            Amount:inputPrice
        })
        
       storage();
       renderFunction();
        document.querySelector('.js-task-name').value='';
        document.querySelector('.js-task-price').value='';
    })

    


   
