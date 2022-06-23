/* 
Created with passion by Corné Adema / 0xcorne
GitHub: https://github.com/0xcorne
*/

// Grabbing elements from the DOM
const formElement = document.getElementById('form_id');
const inputElement = document.getElementById('input');
const listElementMkr = document.getElementById('ul_list');

// Function to submit tasks
const submitTask = (task) => {
  let taskText = inputElement.value;
  
  if (task) {
    taskText = task.text;
  }

  if (taskText) {
    const createLiElement = document.createElement('li');
    if(task && task.completed_task) {
      createLiElement.classList.add('completed_task')
    }
    createLiElement.innerHTML = taskText;

    listElementMkr.appendChild(createLiElement);

    inputElement.value = '';

    // Event listener for marking task complete
    createLiElement.addEventListener('click', () => {
      createLiElement.classList.toggle('completed_task');
      TaskStorage();
    });
    // Event listener to remove task
    createLiElement.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      createLiElement.remove();
      TaskStorage();
    });
  }

  TaskStorage();
};

// Function that stores tasks in array, and saves them in localStorage.
const TaskStorage = () => {
  const taskElement = document.querySelectorAll('li');
  const tasks = [];

  for (const task of taskElement) {
    tasks.push({
      text: task.innerHTML,
      completed_task: task.classList.contains('completed_task'),
    });
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const tasks = JSON.parse(localStorage.getItem('tasks'));

// If there are any tasks, this for-of loop will go through all of them and add them with the submitTask function.
if(tasks) {
    for (tsk of tasks)
      submitTask(tsk)
    };
  



// Global Event listener, attached to form input
formElement.addEventListener('submit', (ob) => {
  ob.preventDefault();

  submitTask();
});
