//today's date function
let date = new Date();
let dateHeader = date.toDateString();

const dateToday = document.getElementById('title-date');
dateToday.innerHTML = dateHeader;

//input variables
let taskInput = document.getElementById("input-task");
let taskInputDate = document.getElementById("input-date");
const taskInputSubmit = document.getElementById("add-new-task-button");
const emptyInput= document.getElementById("empty-input");

const taskList = document.getElementById("task-list");

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

    function addTask(e) {
      e.preventDefault();
      let userInput = document.getElementById("input-task").value;
      let userInputDate = document.getElementById("input-date").value;

      let newTaskId = new Date().getTime().toString();
      let userInputTask = userInput.charAt(0).toUpperCase() + userInput.slice(1);

      myTasks.push(new Task(newTaskId, userInputTask, userInputDate));
      localStorage.setItem("myStorage", JSON.stringify(myTasks))
      display();

      emptyInput.innerHTML= "";

        if (userInputTask !== "") {
            let newTask = new Task(newTaskId, userInputTask, userInputDate);
            taskArray.push(newTask);

            const listElement = document.createElement("li");
            listElement.classList.add("list-item");
            const attr = document.createAttribute("data-id");
            attr.value = newTaskId;
            listElement.setAttributeNode(attr);

            //template literal to add in list inputs
            listElement.innerHTML = `
            <div class="list-container">
            <span class="list-input" id="list-input" contenteditable="true">${newTask.taskname}</span>
            <span class="list-date-input" id="list-date-input" contenteditable="true">${newTask.taskdate}</span>
            </div>
            <div class="list-buttons">
            <button class="edit-item" id="edit-item"></button>
            <img src="images/del.png" class="delete-item" id="delete-item"></img>
            </div>
            `;

            //variables and event listeners for buttons created in new li element
            const taskContent = listElement.querySelector(".list-container");
            const deleteButton = listElement.querySelector(".delete-item");
                        
            deleteButton.addEventListener("click", deleteTask);
           

            taskList.appendChild(listElement);

            taskContent.addEventListener("dblclick", function(){
                taskContent.classList.toggle("completed-task");
                listElement.classList.toggle("completed");
            });
            
            checkLocalStorage()
            display()


        } else if (userInputTask === "") {
            emptyInput.innerHTML = "task input cannot be blank";
        } else {
            emptyInput.innerHTML = "";
        }

    }

    function display() {
      for(let i = 0; i < myTasks.length; i++) {
        console.log(myTasks[i].taskid);
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