import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { initialTodos, validationConfig } from "./utils/constants.js";
import Todo from "./components/Todo.js";
import FormValidator from "./components/FormValidator.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => modal.classList.add("popup_visible");
const closeModal = (modal) => modal.classList.remove("popup_visible");

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");
  return todo.getView();
};

// Open popup
addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

// Close popup
addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

// Add todo submit
addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Adjust timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  const id = uuidv4();
  const values = { name, date, id, completed: false };

  todosList.append(generateTodo(values));

  addTodoForm.reset(); // Reset form
  closeModal(addTodoPopup);
});

// Render initial todos
initialTodos.forEach((item) => {
  todosList.append(generateTodo(item));
});

// Enable form validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
