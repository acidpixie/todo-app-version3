let date = new Date();
let dateHeader = date.toDateString();

const dateToday = document.getElementById('title-date');
dateToday.innerHTML = dateHeader;

const taskList = document.getElementById("task-list");

const LOCAL_STORAGE_APP_KEY = 'local-storage-task-list'
let myArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_KEY)) || []

//input variables
let taskInput = document.getElementById("input-task");
let taskInputDate = document.getElementById("input-date");
const taskInputSubmit = document.getElementById("add-new-task-button");
const emptyInput= document.getElementById("empty-input");

const clearTaskList = document.getElementById("clear-button");
const sortTaskList = document.getElementById("sort-button");

let editInputTask = "";
let editInputDate = "";
let editId = "";
let isEdit = false;



//create new task item 
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

    clearTaskList.addEventListener("click", clearTasks);
    

    function clearTasks() {
        const allTasks = document.querySelectorAll(".list-item");

        if (allTasks.length > 0) {
            allTasks.forEach(function (listItem) {
                taskList.removeChild(listItem);
            });

            saveAndRender();
            localStorage.removeItem("local-storage-task-list");
        }

    //function to add in a new task

    taskInputSubmit.addEventListener("click", addTask);


    function addTask(e) {
        e.preventDefault();

        let userInput = document.getElementById("input-task").value;
        let userInputDate = document.getElementById("input-date").value;

        let newTaskId = new Date().getTime().toString();
        let userInputTask = userInput.charAt(0).toUpperCase() + userInput.slice(1);

        emptyInput.innerHTML= "";

        if (userInputTask !== "") {
            let newTask = new Task(newTaskId, userInputTask, userInputDate);
            myArray.push(newTask);

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
            })

            saveAndRender()

        } else if (userInputTask !== "" && isEdit) {
            editInputTask.innerHTML = userInputTask;
            editInputDate.innerHTML = userInputDate;

            saveAndRender();

        } else if (userInputTask === "") {
            emptyInput.innerHTML = "task input cannot be blank";
        } else {
            emptyInput.innerHTML = "";
        }

      //  saveAndRender()

    // clear tasks

    }

    //sort tasks a-z

    sortTaskList.addEventListener("click", sortTasks);

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

    function editTask(button) {
        let x = document.getElementById("list-input");
        if (x.contentEditable == "true") {
            x.contentEditable = "false"; button.innerHTML = "SAVE";
        } else {x.contentEditable = "true"; button.innerHTML = "EDIT";
    }

}



function saveAndRender() {
    save()
    addTask() }


function save() {
    localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(myArray))
}



function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }

}}
