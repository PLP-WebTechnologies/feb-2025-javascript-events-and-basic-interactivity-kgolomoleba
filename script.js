// Get DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const darkModeBtn = document.getElementById("darkModeBtn");

// Task array to hold tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    // Clear current list
    taskList.innerHTML = '';
    
    // Render tasks from the array
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.toggle('completed', task.completed);
        
        li.innerHTML = `
            <span>${task.name}</span>
            <button class="deleteBtn">Delete</button>
            <button class="completeBtn">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        
        // Append task to the list
        taskList.appendChild(li);

        // Add event listeners for complete and delete buttons
        li.querySelector('.completeBtn').addEventListener('click', () => toggleTaskCompletion(index));
        li.querySelector('.deleteBtn').addEventListener('click', () => deleteTask(index));
    });
}

// Function to add a new task
addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    
    if (taskName !== "") {
        tasks.push({ name: taskName, completed: false });
        taskInput.value = ''; // Clear input field
        saveTasks();
        renderTasks();
    } else {
        alert("Please enter a task.");
    }
});

// Function to toggle task completion
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage on page load
window.addEventListener("load", () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
});

// Dark mode toggle functionality
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// BONUS: Optionally, you can add a smooth fade transition to the task list rendering for better user experience.

