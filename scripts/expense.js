const Tracker=JSON.parse(localStorage.getItem('Tracker')) || [];

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

   const total=calculateTotal();
   document.querySelector('.js-final-expense-amount').innerHTML=total;
    document.querySelector('.js-remain-amount').innerHTML=getSalary()-total;


   document.querySelectorAll('.js-remove-button').forEach((button)=>{
       button.addEventListener('click',()=>{
        const clickIndex=Number(button.dataset.index);

        Tracker.splice(clickIndex,1);
        
              storage();
          renderFunction();         
       })

   })
   
}
renderFunction();

    document.querySelector('.js-ok-button').addEventListener('click',()=>{
        const inputSalary=document.querySelector('.js-salary-bar').value;
        function showMessage1(message){
            document.querySelector('.js-salary-message').innerHTML=message;

            setTimeout(()=>{
                document.querySelector('.js-salary-message').innerHTML='';
            },3000)
        }
        
        if(inputSalary === '' || inputSalary<=0){
            showMessage1('!Enter valid amount');
            return;
        }

         document.querySelector('.js-salary-bar').value='';
         document.querySelector('.js-actual-money').innerHTML=inputSalary;
         salStorage(inputSalary);
        renderFunction();

    });

    document.querySelector('.js-add-button').addEventListener('click',()=>{

        const inputName=document.querySelector('.js-task-name').value;
        const inputPrice=Number(document.querySelector('.js-task-price').value);
      
        const total=calculateTotal();   
        const savedSalary = getSalary();

        function showMessage(message){
            document.querySelector('.js-message').innerHTML=message;

            setTimeout(()=>{
                document.querySelector('.js-message').innerHTML='';
            },3000)
        }

        if(inputName === '' || inputPrice <= 0){
            showMessage('!Enter valid task and amount');
            return;
        }

         if(total+inputPrice > savedSalary){
           showMessage('!Expense money is greater than Actual money so it will leads to debts');
           return;
        }

         if(total+inputPrice > (0.75*savedSalary)){
            showMessage('!use your money carefully');
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

    


   
