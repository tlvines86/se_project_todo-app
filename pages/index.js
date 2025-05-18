import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import TodoCounter from "../components/TodoCounter.js";

import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleTodoDelete,
    handleCheck,
    handleDelete,
    todoCounter
  );
  const todoElement = todo.getView();
  return todoElement;
};

function renderTodo(item) {
  return generateTodo(item);
}

const section = new Section({
  items: initialTodos,
  renderer: renderTodo,
  containerSelector: ".todos__list",
});

section.renderItems();

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
}

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formValues) => {
    const name = formValues.name;
    const dateInput = formValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    section.addItem({ name, date, id });
    addTodoPopup.close();
    newTodoValidator.resetValidation();
    addTodoForm.reset();
    todoCounter.updateTotal(true);
  },
});
addTodoPopup.setEventListeners();

function handleTodoDelete(todoId) {
  const todoElement = document.querySelector(`[data-todo-id="${todoId}"]`);
  if (todoElement) {
    todoElement.remove();
    todoCounter.updateTotal(false);
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
