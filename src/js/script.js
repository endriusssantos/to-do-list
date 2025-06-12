const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const error = document.getElementById("error");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    li.innerHTML = `
      <label class="custom-checkbox">
        <input type="checkbox" ${
          task.done ? "checked" : ""
        } data-index="${index}">
        <span class="checkmark"></span>
        <span class="task-text">${task.text}</span>
      </label>
      <button class="x-icon" aria-label="Excluir tarefa" data-index="${index}"></button>
    `;

    taskList.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = input.value.trim();

  if (inputValue) {
    error.style.display = "none";
    tasks.push({ text: inputValue, done: false });
    input.value = "";
    saveTasks();
    renderTasks();
  } else {
    error.style.display = "block";
  }
});

taskList.addEventListener("click", (e) => {
  const index = e.target.dataset.index;

  if (e.target.matches(".x-icon")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  if (e.target.matches('input[type="checkbox"]')) {
    tasks[index].done = e.target.checked;
    saveTasks();
  }
});

renderTasks();
