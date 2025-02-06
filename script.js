let input = document.getElementById("input");
let list = document.getElementById("list");

function addTask() {
	let task = input.value;
	if (task === "") {
		alert("Please enter a task.");
		return;
	} else {
		let li = document.createElement("li");
		li.innerHTML = task + "<button class='delete' onclick='deleteTask(this)'>Delete</button>";
		list.appendChild(li);
		input.value = "";
		input.focus();
	}
}
function addTaskEnter(event) {
	if (event.keyCode === 13) {
		addTask();
	}
}
input.addEventListener("keydown", addTaskEnter);

function deleteTask(element) {
	element.parentElement.remove();
}
