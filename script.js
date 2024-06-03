// Retrieve existing tasks from local storage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <input type="checkbox" id="task${index}" ${task.completed ? 'checked' : ''}>
            <label for="task${index}" ${task.completed ? 'class="completed"' : ''}>${task.name}</label>
            <button class="deleteBtn" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(listItem);
    });
    updateLocalStorage();
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = '';
        renderTasks();
    }
}

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to update local storage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskList').addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const index = parseInt(e.target.id.replace('task', ''));
        toggleTaskCompletion(index);
    }
});
document.getElementById('taskList').addEventListener('click', (e) => {
    if (e.target.classList.contains('deleteBtn')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        deleteTask(index);
    }
});

// Initial rendering
renderTasks();
