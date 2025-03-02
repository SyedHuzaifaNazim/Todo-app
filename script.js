let input = document.getElementById("input");
let list = document.getElementById("list");

function addTask() {
    let task = input.value;
    if (task === "") {
        alert("Please enter a task.");
        return;
    } else {
        let li = document.createElement("li");
        li.innerHTML = task + "<div class='container'><input type='checkbox' id='cbx' style='display: none;'><label for='cbx' class='check'><svg width='18px' height='18px' viewBox='0 0 18 18'><path d='M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z'></path><polyline points='1 9 7 14 15 4'></polyline></svg></label></div>" + "<button class='delete' onclick='deleteTask(this)'>Delete</button>";
        list.appendChild(li);
        saveTasks();
        input.value = "";
        input.focus();
    }
}

function addTaskEnter(event) {
    if (event.keyCode === 13) {
        addTask();
    }
}

function saveTasks() {
    let tasks = [];
    for (let i = 0; i < list.children.length; i++) {
        tasks.push(list.children[i].innerText.replace("Delete", "").trim());
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        for (let task of tasks) {
            let li = document.createElement("li");
            li.innerHTML = task + "<div class='container'><input type='checkbox' id='cbx' style='display: none;'><label for='cbx' class='check'><svg width='18px' height='18px' viewBox='0 0 18 18'><path d='M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z'></path><polyline points='1 9 7 14 15 4'></polyline></svg></label></div>" + "<button class='delete' onclick='deleteTask(this)'>Delete</button>";
            list.appendChild(li);
        }
    }
}

function deleteTask(button) {
    let li = button.parentElement;
    list.removeChild(li);
    saveTasks();
}
function clearList() {
	list.innerHTML = "";
	saveTasks();
}

input.addEventListener("keydown", addTaskEnter);
window.addEventListener("load", loadTasks);

// Drag and Drop

const sortableList =
    document.getElementById("list");
let draggedItem = null;

sortableList.addEventListener(
    "dragstart",
    (e) => {
        draggedItem = e.target;
        setTimeout(() => {
            e.target.style.display =
                "none";
        }, 0);
});

sortableList.addEventListener(
    "dragend",
    (e) => {
        setTimeout(() => {
            e.target.style.display = "";
            draggedItem = null;
        }, 0);
});

sortableList.addEventListener(
    "dragover",
    (e) => {
        e.preventDefault();
        const afterElement =
            getDragAfterElement(
                sortableList,
                e.clientY);
        const currentElement =
            document.querySelector(
                ".dragging");
        if (afterElement == null, currentElement != null) {
            sortableList.appendChild(
                draggedItem
            );} 
        else {
            sortableList.insertBefore(
                draggedItem,
                afterElement
            );}
    });

const getDragAfterElement = (
    container, y
) => {
    const draggableElements = [
        ...container.querySelectorAll(
            "li:not(.dragging)"
        ),];

    return draggableElements.reduce(
        (closest, child) => {
            const box =
                child.getBoundingClientRect();
            const offset =
                y - box.top - box.height / 2;
            if (
                offset < 0 &&
                offset > closest.offset) {
                return {
                    offset: offset,
                    element: child,
                };} 
            else {
                return closest;
            }},
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
};