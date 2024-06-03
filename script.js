// Get references to DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Add click event listener to mark task as completed
        taskItem.addEventListener('click', () => {
            taskItem.classList.toggle('completed');
        });

        // Add delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.addEventListener('click', () => {
            taskItem.remove();
        });
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        taskInput.value = ''; // Clear input field
    }
}

// Add task event listener
addTaskBtn.addEventListener('click', addTask);

// Handle pressing Enter key to add task
taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
