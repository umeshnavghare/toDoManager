import { LightningElement } from 'lwc';

export default class ToDOManager extends LightningElement {

taskName="";
taskDate = null;
completetask =[];
incompletetask= [];

    changeHnadler(event){

        let{name, value}= event.target;
        if(name === "taskName"){
this.taskName = value;

        }else if(name === "taskDate"){
        this.taskDate = value;
        }
        }

        resetHandler(event){
 
            this.taskName = null;
            this.taskDate = null;
        }
addHandler(event){
//if end date is missing , then populate todays date 

if(!this.taskDate){
this.taskDate = new Date().toISOString().slice(0,10);

   }
if(this.validateTAsk()){
    this.incompletetask =[
        ...this.incompletetask,
        {
            taskName: this.taskName,
            taskDate : this.taskDate
        }
    ];
    this.taskName = "";
    this.taskDate = null;
    this.resetHandler();
    this.sortedArray = this.sortTask(this.incompletetask);
    this.incompletetask=[...this.sortedArray];
    console.log("this.incompltearay", this.incompletetask);
}
  }
  validateTAsk(){

    let isValid = true;
    let element = this.template.querySelector(".taskname");
    //conditin1 -- checck if task is empty
    // condition1 -- if task is nt empty then check for duplicate

    if(!this.taskName){

        isValid = false;
        element.setCustomValidity("Task name cabbot be empty");
    }else{
// if find method, will find an item in array it iell return task item if not found ity  will return undefided
      let taskItem=  this.incompletetask.find(currItem => currItem.taskName === this.taskName && 
            currItem.taskDate ===this.taskDate
            );
        if(taskItem){
            isValid = false;
            element.setCustomValidity("Task is already avalilable")
        }
        }
        if(isValid){
            element.setCustomValidity("");
        }
        element.reportValidity();
        return isValid;
    }

    sortTask(inputArr){
    let sortedArray =    inputArr.sort((a,b) =>{
            const dateA = new Date(a.taskDate);
            const dateB = new Date(b.taskDate);
            return dateA- dateB;
        });

        return sortedArray;
    }
  }

