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

        // Append task to the list with animation
        taskList.appendChild(li);
        li.style.animation = "fadeInTask 0.3s forwards";

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

// Add event listener for 'Enter' key on input field
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTaskBtn.click(); // simulate click on Add Task button
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

// Dark mode toggle functionality with button text change
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.textContent = "Light Mode";
    } else {
        darkModeBtn.textContent = "Dark Mode";
    }
});

// Tab functionality
const tabButtons = document.querySelectorAll(".tab-button");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        // Add active class to clicked button and corresponding content
        button.classList.add("active");
        document.getElementById(button.dataset.tab).classList.add("active");
    });
});
