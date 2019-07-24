let addMessage = document.querySelector('.message'),
		addButton = document.querySelector('.add'),
		todo = document.querySelector('.todo');

let todoList = [];

if(localStorage.getItem('todo')) {
	todoList = JSON.parse(localStorage.getItem('todo'));
	displayMessage();
}

addButton.addEventListener('click', function () {
	if(!addMessage.value) return;
	let newTodo = {
		todo: addMessage.value,
		checked: false,
		important: false
	};

	todoList.push(newTodo);
	displayMessage();
	localStorage.setItem('todo', JSON.stringify(todoList));
	addMessage.value = '';
});

function displayMessage(){
	let displayMessage = '';
	if(todoList.length === 0) todo.innerHTML = '';
	todoList.forEach(function(item, index){
		displayMessage += `
			<li>
				<input type="checkbox" id="item_${index}" ${item.checked ? "checked" : "" }>
				<label for="item_${index}" class="${item.important ? 'important' : ''}">${item.todo}</label>
			</li>
		`;
		todo.innerHTML = displayMessage;
	});
}

todo.addEventListener('change', function(event) {
	 let idInput = event.target.getAttribute('id');
	 let forLabel = todo.querySelector('[for=' + idInput + ']');
	 let valueLabel = forLabel.innerHTML;
	 
	todoList.forEach(function(item) {
		if (item.todo === valueLabel){
			item.checked = !item.checked;
			localStorage.setItem('todo', JSON.stringify(todoList));
		}
	});
});

todo.addEventListener('contextmenu', function(event){
	event.preventDefault();
	todoList.forEach(function(item, index){
		if(item.todo === event.target.innerHTML){
			if(event.ctrlKey || event.metaKey) {
				todoList.splice(index, 1);
			} else {
				item.important = !item.important;
			}
			displayMessage();
			localStorage.setItem('todo', JSON.stringify(todoList));
		}
	});
});