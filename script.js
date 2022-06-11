let todoList = document.getElementById("todo-list");
let addTask = document.getElementById("add-task");

let banc = [];

let getBanc = () => JSON.parse(localStorage.getItem ("todoList")) ?? [];

let setBanc = function(banc) {
    localStorage.setItem("todoList", JSON.stringify(banc));
}

let makeItem =  function(task, status, index) {   
    let item = document.createElement("label");
    
    item.classList.add("container-task");
    item.innerHTML = 
        `<input class="text" type="checkbox" ${status} data-index = ${index}>
        <p>${task}</p>
        <input class="x" type="button" value="X" data-index = ${index}>`;

        todoList.appendChild(item);

}

let cleaningTask = function() {
    let cleaningTodoList = todoList;
    while(cleaningTodoList.firstChild) {
        cleaningTodoList.removeChild(cleaningTodoList.lastChild);
    }
}

let rander = function() {
    cleaningTask();
    let banc = getBanc();
    banc.forEach((item, index) => makeItem (item.task, item.status, index));
}

let insertItemKeyBoard = function(event) {

    let tecla = event.key;
    let text = addTask.value;
    if(tecla === "Enter"){
        let banc = getBanc();
        banc.push({"task" : text, "status" : ""});
        setBanc(banc);
        rander();
        addTask.value = "";}
    
}

let insertItem = function() {
    let text = addTask.value;
    let banc = getBanc();
    banc.push({"task" : text, "status" : ""})
    setBanc(banc);
    rander();
    addTask.value = "";
}

let removeItem = function(index) {
    let banc = getBanc();
    banc.splice (index, 1);
    setBanc(banc);
    rander();
}

let atualizeItems = function(index) {
    let banc = getBanc();
    banc[index].status = banc[index].status === "" ? "checked" : "";
    setBanc(banc);
    rander();
}

let clickItem = function(event) {
    let eventTarget = event.target;
    if(eventTarget.type === "button") {
        let index =  eventTarget.dataset.index;
        removeItem(index);
    } else if (eventTarget.type === "checkbox") {
        let index = eventTarget.dataset.index;
        atualizeItems(index);
    }
}

addTask.addEventListener("keypress",insertItemKeyBoard);
todoList.addEventListener("click", clickItem);

function addNewTask() {
    insertItem();
    rander();
}

rander();
