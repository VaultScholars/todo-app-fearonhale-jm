// storage.js
// Students will implement saving and loading tasks using localStorage.
// Use the key below to store the array of tasks as a JSON string.
// This file is responsible for saving and loading data
//
// Official documentation for localStorage:
// MDN Web Docs – localStorage:
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
//
// MDN Web Docs – JSON.stringify / JSON.parse (you will need both):
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
//
// You may open these links to understand how to:
// - Save a string in localStorage
// - Read a string from localStorage
// - Convert arrays/objects to JSON strings
// - Convert JSON strings back to arrays/objects

const STORAGE_KEY = "vault_scholars_todo_tasks";

// This function should:
// - Read the stored JSON string from localStorage
// - Convert it back into an array
// - Return an empty array if nothing is stored yet
function loadTasks() {
  
  // Retrieve the stored data using the storage key
  const storedData = localStorage.getItem(STORAGE_KEY);

  // If nothing exists in localStorage
  if(storedData === null) {

    //Return an empty array so that the app starts clean
    return [];
  }

  // Convert the stored string back into a JavaScript array
  return JSON.parse(storedData);
}



// This function should:
// - Convert the array of tasks into a JSON string
// - Save it to localStorage using STORAGE_KEY
function saveTasks(tasks) {
  
  // Convert the tasks into a string
  const dataToStore = JSON.stringify(tasks);

  // Save the string in localStorage using the same storage key
  localStorage.setItem(STORAGE_KEY, dataToStore);
}
