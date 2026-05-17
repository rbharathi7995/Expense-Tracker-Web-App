export function calculateTotal(Tracker){
    let total=0;
     Tracker.forEach((tracker)=>{
    total+=Number(tracker.Amount);
      
 })
 return total;
}
