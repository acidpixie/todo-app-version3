let date = new Date();
let dateHeader = date.toDateString();

const dateToday = document.getElementById('title-date');
dateToday.innerHTML = dateHeader;

const LOCAL_STORAGE_APP_KEY = "todo-app-storage-key";

//input variables
let taskInput = document.getElementById("input-task");
let taskInputDate = document.getElementById("input-date");
const taskInputSubmit = document.getElementById("add-new-task-button");
const emptyInput= document.getElementById("empty-input");

const taskList = document.getElementById("task-list");

const clearTaskList = document.getElementById("clear-button");
const sortTaskList = document.getElementById("sort-button");

let taskArray = [];

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

    //event listeners

    taskInputSubmit.addEventListener("click", addTask);
    // clearTaskList.addEventListener("click", clearTasks);
   //  sortTaskList.addEventListener("click", sortTasks);

    //function to add in a new task

    function addTask(e) {
        e.preventDefault();

        let userInput = document.getElementById("input-task").value;
        let userInputDate = document.getElementById("input-date").value;

        let newTaskId = new Date().getTime().toString();
        let userInputTask = userInput.charAt(0).toUpperCase() + userInput.slice(1);

        emptyInput,innerHTML= "";

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
            <span class="list-input" id="list-input">${newTask.taskname}</span>
            <span class="list-date-input" id="list-date-input">${newTask.taskdate}</span>
            </div>
            <div class="list-buttons">
            <button class="edit-item" id="edit-item">EDIT</button>
            <button class="delete-item" id="delete-item">DEL</button>
            </div>
            `;

            //variables and event listeners for buttons in new li element created
            const taskContent = listElement.querySelector(".list-container");
            const deleteButton = listElement.querySelector(".delete-item");
          //  const editButton = listElement.querySelector(".edit-item");
            
           deleteButton.addEventListener("click", deleteTask);
         //   editButton.addEventListener("click", editTask);

            taskList.appendChild(listElement);
        }
    }

    function deleteTask(event) {
   
        const element = event.currentTarget.parentElement.parentElement;
        const id = element.dataset.id;
        taskList.removeChild(element);

        setToDefault();


    }


    function setToDefault() {
        taskInput.value = "";
        taskInputDate.value = "";
    }





