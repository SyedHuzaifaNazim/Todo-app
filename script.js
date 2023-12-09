let input = document.getElementById("input");
let list = document.getElementById("list");

function addTask() {
	let task = input.value;
	if (task === "") {
		alert("Please enter a task.");
	} else {
		let li = document.createElement("li");
		li.innerHTML = task + "<button class='delete' onclick='deleteTask(this)'>Delete</button>";
		list.appendChild(li);
		input.value = "";
	}
}

function deleteTask(element) {
	element.parentElement.remove();
}
