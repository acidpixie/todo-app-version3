//today's date function
let date = new Date();
let dateHeader = date.toDateString();

const dateToday = document.getElementById('title-date');
dateToday.innerHTML = dateHeader;

//input variables
// let taskInput = document.getElementById("input-task");
// let taskInputDate = document.getElementById("input-date");
// const taskInputSubmit = document.getElementById("add-new-task-button");
// const emptyInput= document.getElementById("empty-input");

// const taskList = document.getElementById("task-list");

// const clearTaskList = document.getElementById("clear-button");
// const sortTaskList = document.getElementById("sort-button");

//class for adding tasks

class Task {
    constructor(taskid, taskname, taskdate) {
        this._taskid = taskid;
        this._taskname = taskname;
        this._taskdate = taskdate;
    }

    get taskid() {
        return this._taskid;
      }
    
      set taskid(newTaskId) {
        this._taskid = newTaskId;
      }
    
      get taskname() {
        return this._taskname;
      }
    
      set taskname(newTaskName) {
        this._taskname = newTaskName;
      }
    
      get taskdate() {
        return this._taskdate;
      }
    
      set taskdate(newTaskDate) {
        this._taskdate = newTaskDate;
      }
    }

    let myTasks = [];

    function addTask() {
      let taskInput = document.getElementById("input-task").value;
      let dateInput = document.getElementById("input-date").value;
      myTasks.push(new Task(name, date));
      display();

    }

    function display() {
      for(let i=0; i < myTasks.length; i++) {
        console.log(myTasks[i].taskname);
        console.log(myTasks[i].taskdate);
      }
    }

    function checkLocalStorage() {
      if (localStorage.getItem("myStorage") !== null) {
        myTasks = JSON.parse(localStorage.getItem("myStorage"));
      }
      else {
        myTasks = [];
      }
    }