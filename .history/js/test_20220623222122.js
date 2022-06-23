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
            
            function saveAndRender() {
                save()
                render()
            };

        }


function save() {
    localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(myArray))
}

function render() {
    clearElement(taskList)
    lists.forEach( list => {
        const listElement = document.createElement("li")
        listElement.classList.add("list-item")
        listElement.innerText = list
        taskList.appendChild(listElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }

}

}