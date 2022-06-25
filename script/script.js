const items = [{
    id: 1,
    item: 'TV Stand',
    createdDate: new Date(),
    isCompleted: false
}]

localStorage.setItem('allItems', JSON.stringify(items));
const storedItems = JSON.parse(localStorage.allItems);

let result = storedItems.map(items => items.item);


const listDiv = document.querySelector(".to-do-list")


const todoForm = document.querySelector('.to-do-form');

const todoInput = document.querySelector('.form-input');

const todoItemsList = document.querySelector('.to-do-list');

todoForm.addEventListener('submit', function(event) {

    event.preventDefault();
    addTodo(todoInput.value);
});

let todos = [];

function addTodo(item) {
    const task = document.querySelector('#Todo').value;
    const Todo = {
        item: task,
        id: Todo.length + 1,
    };
    if (item !== '') {
        let todo = {
            id: s4(),
            item: item,
            createdDate: new Date(),
            isCompleted: false
        };

        todos.push(todo);
        addToLocalStorage(todos);
        todoInput.value = '';
    }
}

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

function addToLocalStorage(todos) {

    localStorage.setItem('todos', JSON.stringify(todos));

    renderTodos(todos);
}

function getFromLocalStorage() {
    let reference = localStorage.getItem('todos');

    if (reference) {

        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}

function toggle(id) {
    todos.forEach(function(item) {

        if (item.id == id) {

            item.isCompleted = !item.isCompleted;
        }
    });
    addToLocalStorage(todos);
}

function deleteTodo(id) {
    todos = todos.filter(function(item) {

        return item.id != id;
    });
    addToLocalStorage(todos);
}
getFromLocalStorage();
todoItemsList.addEventListener('click', function(event) {

    if (event.target.type === 'checkbox') {

        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-button')) {

        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
});