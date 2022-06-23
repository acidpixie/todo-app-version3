//today's date function
let date = new Date();
let dateHeader = date.toDateString();

const dateToday = document.getElementById('title-date');
dateToday.innerHTML = dateHeader;

const LOCAL_STORAGE_APP_KEY = "todo-app-storage-key";
let taskArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_KEY)) || [];

console.log(typeof taskArray)

//input variables
let taskInput = document.getElementById("input-task");
let taskInputDate = document.getElementById("input-date");
const taskInputSubmit = document.getElementById("add-new-task-button");
const emptyInput= document.getElementById("empty-input");

const taskList = document.getElementById("task-list");

const clearTaskList = document.getElementById("clear-button");
const sortTaskList = document.getElementById("sort-button");

let editInputTask = "";
let editInputDate = "";
let editId = "";
let isEdit = false;

// let taskArray = [];

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
    clearTaskList.addEventListener("click", clearTasks);
    sortTaskList.addEventListener("click", sortTasks);

    //function to add in a new task

    function addTask(e) {
        e.preventDefault();

        let userInput = document.getElementById("input-task").value;
        let userInputDate = document.getElementById("input-date").value;

        let newTaskId = new Date().getTime().toString();
        let userInputTask = userInput.charAt(0).toUpperCase() + userInput.slice(1);

        emptyInput.innerHTML= "";

        if (userInputTask !== "" && !isEdit) {
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
            const editButton = listElement.querySelector(".edit-item");
            
           deleteButton.addEventListener("click", deleteTask);
           editButton.addEventListener("click", editTask);

            taskList.appendChild(listElement);

            taskContent.addEventListener("dblclick", function(){
                taskContent.classList.toggle("completed-task");
                listElement.classList.toggle("completed");
            });

            saveAndRender();

        } else if (userInputTask !== "" && isEdit) {
            editInputTask.innerHTML = userInputTask;
            editInputDate.innerHTML = userInputDate;

            saveAndRender();

        } else if (userInputTask === "") {
            emptyInput.innerHTML = "task input cannot be blank";
        } else {
            emptyInput.innerHTML = "";
        }
    }

    // clear tasks

    function clearTasks() {
        const allTasks = document.querySelectorAll(".list-item");

        if (allTasks.length > 0) {
            allTasks.forEach(function (listItem) {
                taskList.removeChild(listItem);
            });

            saveAndRender();
            localStorage.removeItem("todo-app-storage-key");
        }
    }

    //sort tasks a-z

    function sortTasks() {
        [...taskList.children]
        .sort((a, b) => (a.innerText > b.innerText ? 1 : -1))
        .forEach((node) => taskList.appendChild(node));
    }

    //delete tasks

    function deleteTask(event) {
        let element = event.currentTarget.parentElement.parentElement;
        const id = element.dataset.id;
        taskList.removeChild(element);

        saveAndRender()
    }

    // edit tasks 

 //  function editTask(event) {
 //   let element = event.currentTarget.parentElement.parentElement;
 //   const attrE = document.createAttribute("contenteditable");
 //   attrE.value = true;
 //   element.setAttributeNode(attrE);

 //   editId = element.dataset.id;
 //   isEdit = true;


 function editTask(button) {
    let x = document.getElementById("list-input");
    if (x.contentEditable == "true") {
        x.contentEditable = "false"; button.innerHTML = "SAVE";
    } else {x.contentEditable = "true"; button.innerHTML = "EDIT";
}

 }

 function saveAndRender() {
    saveToLocalStorage()
    setToDefault()
 }

     
    function setToDefault() {
        taskInput.value = "";
        taskInputDate.value = "";
        isEdit = false;
        editId = "";
    }

 function saveToLocalStorage() {
   taskArray = JSON.stringify(taskArray);
   localStorage.setItem(LOCAL_STORAGE_APP_KEY, taskArray);
   taskArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_KEY));
   
  
 //  function saveToLocalStorage() {
 //   localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(taskArray))

}

