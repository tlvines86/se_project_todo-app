class Todo {
  constructor(
    data,
    templateSelector,
    onDelete,
    handleCheck,
    handleDelete,
    todoCounter
  ) {
    this._data = data;
    this._dueDate = null;

    this._templateSelector = templateSelector;
    this._templateElement = null;
    this._todoElement = null;
    this._todoNameEl = null;
    this._todoDate = null;

    this._todoDeleteBtn = null;
    this._todoCheckboxEl = null;
    this._todoLabel = null;

    this._onDelete = onDelete;

    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
    this._todoCounter = todoCounter;
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleCheck(this._data.completed);
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      this._onDelete(this._data.id);
      this._handleDelete();
      this._remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  _remove() {
    this._todoElement.remove();
    if (this._data.completed) {
      this._todoCounter.updateCompleted(false);
    }
  }

  getView() {
    this._templateElement = document.querySelector(this._templateSelector);
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    this._todoElement.dataset.todoId = this._data.id;

    this._todoNameEl = this._todoElement.querySelector(".todo__name");

    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    this._todoNameEl.textContent = this._data.name;

    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
