let date = new Date();
let dateHeader = date.toDateString();

const dateToday = document.getElementById('title-date');
dateToday.innerHTML = dateHeader;

const LOCAL_STORAGE_APP_KEY = "todo-app-storage-key";

//input variables
let taskInput = document.getElementById("input-task");
let taskInputDate = document.getElementById("input-date");
const taskInputSubmit = document.getElementById("add-new-task-button");

const taskList = document.getElementById("task-list");

const clearTaskList = document.getElementById("clear-button")
const sortTaskList = document.getElementById("sort-button")

