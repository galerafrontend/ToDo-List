interface Tasks {
  content: string;
  done: boolean;
}

{
  let tasks: Tasks[] = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent: string) => {
    tasks = [...tasks, { content: newTaskContent, done: false }];
    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const deleteTask = (taskIndex: number) => {
    tasks = tasks.filter((task, index) => index !== taskIndex);
    render();
  };

  const toggleTaskDone = (taskIndex: number) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({ ...task, done: true }));
    render();
  };

  const bindDeleteEvents = () => {
    const deleteButtons = document.querySelectorAll(".js-delete");

    deleteButtons.forEach((deleteButton, index) =>
      deleteButton.addEventListener("click", () => {
        deleteTask(index);
      })
    );
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, index) =>
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      })
    );
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
            <li class="list__item
            ${hideDoneTasks && task.done ? "list__item--hide" : ""}">
                <button class="js-done list__button list__button--toggleDone">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="list__task${task.done ? " list__task--done" : ""}">
                    ${task.content}
                </span>
                <button class="js-delete list__button list__button--delete">
                    🗑 
                </button>
            </li>
            `;
    }

    const listElement = document.querySelector(".js-tasks") as HTMLUListElement;
    listElement.innerHTML = htmlString;
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(
      ".js-buttons"
    ) as HTMLButtonElement;

    if (tasks.length !== 0) {
      return (buttonsElement.innerHTML = `
            <button class="js-hideDoneTasks buttons__button"
            ${tasks.some(({ done }) => done) ? "" : "disabled"}>
                ${hideDoneTasks ? "Show" : "Hide"} completed
            </button>
            <button class="js-allTasksDone buttons__button"
            ${tasks.every(({ done }) => done) ? "disabled" : ""}>
                Complete all
            </button>
            `);
    } else {
      if (tasks.length === 0) {
        return (buttonsElement.innerHTML = ``);
      }
    }
  };

  const bindMarkAllButtonEvents = () => {
    if (tasks.length > 0) {
      const markAllDoneButton = document.querySelector(
        ".js-allTasksDone"
      ) as HTMLButtonElement;
      markAllDoneButton.addEventListener("click", () => {
        markAllTasksDone();
      });
    }
  };

  const bindHideButtonEvents = () => {
    if (tasks.length > 0) {
      const hideDoneTasksButton = document.querySelector(
        ".js-hideDoneTasks"
      ) as HTMLButtonElement;
      hideDoneTasksButton.addEventListener("click", () => {
        toggleHideDoneTasks();
      });
    }
  };

  const render = () => {
    renderTasks();
    renderButtons();

    bindDeleteEvents();
    bindToggleDoneEvents();
    bindMarkAllButtonEvents();
    bindHideButtonEvents();
  };

  const onFormSubmit = (event: Event) => {
    event.preventDefault();

    const inputElement = document.querySelector(
      ".js-newTask"
    ) as HTMLInputElement;
    const newTaskContent = inputElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      inputElement.value = "";
    }

    inputElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form") as HTMLFormElement;

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}
