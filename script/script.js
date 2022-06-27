const items = [{
    id: 1,
    item: 'TV Stand',
    createdDate: new Date(),
    isCompleted: false
}]

// localStorage.setItem('allItems', JSON.stringify(items));
// const storedItems = JSON.parse(localStorage.allItems);

// let result = storedItems.map(items => items.item);


// const listDiv = document.querySelector(".to-do-list")

// select everything
// select the todo-form
const todoForm = document.querySelector('.to-do-form');
// select the input box
const todoInput = document.querySelector('.form-input');
// select the <ul> with class="todo-items"
const todoItemsList = document.querySelector('.to-do-list');

// add an eventListener on form, and listen for submit event
todoForm.addEventListener('submit', function(event) {
    // prevent the page from reloading when submitting the form
    event.preventDefault();
    addTodo(todoInput.value); // call addTodo function with input box current value
});

// function to add todo
let todos = [];

function addTodo(item) {
    // if item is not empty
    if (item !== '') {
        let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            // make a todo object, which has id, name, and completed properties
        let todo = {
            id: s4(),
            item: item,
            createdDate: new Date(),
            isCompleted: false
        };
        // then add it to todos array
        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    }
}

// function to render given todos to screen
function renderTodos(todos) {
    todos.forEach(function(item) {
        const checked = item.isCompleted ? 'checked' : null;
        const li = document.createElement("div")
        li.setAttribute('class', 'form-control to-do-item');
        li.setAttribute('data-key', item.id);
        if (item.isCompleted === true) {
            li.classList.add('checked');
        }
        li.innerHTML = `
        <div class="col-3">
        <input type="checkbox" class="checkbox" ${checked}>
        </div>
        <div class="col-3">
        <p class="todo-text"> ${item.item} </p>
        </div>
        <div class="col-3">
        <i class='bi bi-x-octagon-fill delete-button'></i>
        </div>
      `;
        todoItemsList.append(li);
    });
}

// function to add todos to local storage
function addToLocalStorage(todos) {
    // conver the array to string then store it.
    localStorage.setItem('todos', JSON.stringify(todos));
    // render them to screen
    renderTodos(todos);
}

function getFromLocalStorage() {
    let reference = localStorage.getItem('todos');
    // if reference exists
    if (reference) {
        // converts back to array and store it in todos array
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

// toggle the value to completed and not completed
function toggle(id) {
    todos.forEach(function(item) {
        // use == not ===, because here types are different. One is number and other is string
        if (item.id == id) {
            // toggle the value
            item.isCompleted = !item.isCompleted;
        }
    });
    addToLocalStorage(todos);
}
// deletes a todo from todos array, then updates localstorage and renders updated list to screen
function deleteTodo(id) {
    // filters out the <li> with the id and updates the todos array
    todos = todos.filter(function(item) {
        // use != not !==, because here types are different. One is number and other is string
        return item.id != id;
    });
    // update the localStorage
    addToLocalStorage(todos);
}

// initially get everything from localStorage
getFromLocalStorage();

// after that addEventListener <ul> with class=todoItems. Because we need to listen for click event in all delete-button and checkbox
todoItemsList.addEventListener('click', function(event) {
    // check if the event is on checkbox
    if (event.target.type === 'checkbox') {
        // toggle the state
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    // check if that is a delete-button
    if (event.target.classList.contains('delete-button')) {
        // get id from data-key attribute's value of parent <li> where the delete-button is present
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});