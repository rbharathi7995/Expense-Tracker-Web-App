export function getSalary(inputSalary){
   return Number(localStorage.getItem('inputSalary')) || 0;
}
export function storage(Tracker){
  localStorage.setItem('Tracker',JSON.stringify(Tracker))
}

export function salStorage(inputSalary){
    localStorage.setItem('inputSalary',JSON.stringify(Number(inputSalary)));
}