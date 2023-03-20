function createEmployeeRecord(employeeArray) {
    let employeeInfo = {
       firstName: employeeArray[0],
       familyName: employeeArray[1],
       title:employeeArray[2],
       payPerHour: employeeArray[3],
       timeInEvents:[],
       timeOutEvents:[],
   }
   return employeeInfo;
}

function createEmployeeRecords(array){
   // console.log("This is the array argument: ",array);
   let newArray = [];
   for (let index = 0; index < array.length; index++) {
       // console.log('Loop number: ',index);
       let newObject = createEmployeeRecord(array[index]);
       newArray.push(newObject);        
   }
   return newArray;
   
}

function createTimeInEvent(employee,dateStamp){
   let newArray = dateStamp.split(' ');
   let newObject = {
       type: 'TimeIn',
       hour: parseInt(newArray[1],10),
       date: newArray[0],
   }
   employee['timeInEvents'].push(newObject);
   return employee;
}

function createTimeOutEvent(employee,dateStamp){
   let newArray = dateStamp.split(' ');
   let newObject = {
       type: 'TimeOut',
       hour: parseInt(newArray[1]),
       date: newArray[0],
   }
   employee['timeOutEvents'].push(newObject);
   return employee;

}

function hoursWorkedOnDate(employee,date) {
   let timeInObject = employee.timeInEvents.find(obj=>obj.date===date);
   let timeOutObject = employee.timeOutEvents.find(obj=>obj.date===date);
   let inHourStamp = timeInObject['hour'];
   let outHourStamp = timeOutObject['hour'];
   let res = parseInt((outHourStamp-inHourStamp)/100);
   return res;
   
}

function wagesEarnedOnDate(employee,date) {
   let payRate = employee['payPerHour'];
   let hours = hoursWorkedOnDate(employee,date);
   let totalPay = payRate * hours;
   return totalPay;
}

function allWagesFor(employee){
   let count = employee['timeInEvents'].reduce((accumulator, obj) => {
       return wagesEarnedOnDate(employee,obj.date)+accumulator;
   },0);
   return count;
}

function calculatePayroll(employee){
   let count = employee.reduce((accumulator,obj)=>{
       return allWagesFor(employee)+accumulator;
   },0);
   return count;
   
}

// function findEmployeeByFirstName(array,firstName){
//     // use find();
//     console.log(firstName);
//     console.log(array);
//     let result = array.find(function(object){
//         if (object.firstName === firstName){
//             return true;
//         } else{
//             return false;
//         }
//     });
//     if (result === undefined) {
//         return undefined;
//     }
//     return result.year;
// }

   // function superbowlWin(years){
   //     let result = years.find(function(object) {
   //       if (object.result === 'W') {
   //         return true;
   //       } else{
   //         return false;
   //       }
   //     });
   //     if (result === undefined) {
   //       return undefined;
   //     }
   //     return result.year;
   //   }
     



