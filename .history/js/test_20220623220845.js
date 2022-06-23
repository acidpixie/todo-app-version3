const listContainer = document.getElementById("list-container");

const LOCAL_STORAGE_APP_KEY = 'localStorageTaskList'
let myArray = JSON.parse(localStorage.getItem(LOCAL_STORAGE_APP_KEY)) || []


function saveAndRender() {
    save()
    render()
}

save() {
    localStorage.setItem(LOCAL_STORAGE_APP_KEY, JSON.stringify(myArray))
}

function render() {
    clearElement(listContainer)
    lists.forEach( list => {
        const listElement = document.createElement("li")
        listElement.classList.add("list-name")
        listElement.innerText = list
        listContainer.appendChild(listElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }

}