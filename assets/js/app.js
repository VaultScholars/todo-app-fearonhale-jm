// app.js
// This file controls what the app does.
// Students will fill in the logic for adding, updating, and deleting tasks.

// The array where all tasks will be stored
let tasks = [];

// ID counter for new tasks
let nextTaskId = 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-task-form");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");

  // Load saved tasks from localStorage using storage.js
  tasks = loadTasks();

  // If there are already tasks saved
  if (tasks.length > 0) {
    // Find the highest existing tasks ID
    const highestID = Math.max(...tasks.map(task => task.id));

    // Set the nextTaskID to one more than the highest ID
    nextTaskId = highestID + 1;
  }

  // Display the tasks on the page using dom.js
  renderTasks(tasks, taskList, emptyState);

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // When the user submits the form to add a task:
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Read the task title from the input field
    const title = document.getElementById("task-title").value.trim();

    // Read the task's category
    const category = document.getElementById("task-category").value;

    // Read the task's due date
    const dueDate = document.getElementById("task-due-date").value;

    // If the title is empty, do nothing
    if (title === ""){
      return;
    }

    //Create a new task object
    const newTask = {
      id: nextTaskId, 
      title: title,   
      category: category,
      dueDate: dueDate,
      completed: false  // Tasks start as not completed
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Increase the ID counter so the next gets a new ID
    nextTaskId++;

    // Save the updated tasks array to localStorage
    saveTasks(tasks);

    // Update the page to show the next task
    renderTasks(tasks, taskList, emptyState);

    // Clear the form and focus the title input
    clearTaskForm(form);

  });

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // When clicking inside the task list (“event delegation”):
  taskList.addEventListener("click", (event) => {
    const target = event.target;
    const listItem = target.closest(".task-item");
    if (!listItem) return;

    const taskId = Number(listItem.dataset.id);

    // If the checkbox was clicked:
    if (target.classList.contains("task-checkbox")) {

      // Find the tasks that has the same ID as the clicked item
      const task = tasks.find(task => task.id === taskId);

      // Flip the completed value (true becomes false, false becomes true)
      task.completed = !task.completed;

      // Save the updated tasks array
      saveTasks(tasks);

      // Update the page to reflect the change
      renderTasks(tasks, taskList, emptyState);

      return;
    }

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

    // If the delete button was clicked:
    if (target.classList.contains("task-delete-button")) {

      // Remove the task with the matching ID
      tasks = tasks.filter(task => task.id !== taskId);

      // Save the updated tasks array
      saveTasks(tasks);

      // Update the page so the task disappears
      renderTasks(tasks, taskList, emptyState);

      return;
    }
  });
});
