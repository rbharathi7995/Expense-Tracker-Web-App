export function showMessage(selector,message,color){
            document.querySelector(selector).innerHTML=message;
            document.querySelector(selector).style.color=color;

            setTimeout(()=>{
                document.querySelector(selector).innerHTML='';
            },3000)
        }