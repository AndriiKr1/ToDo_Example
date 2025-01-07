const taskManager = {
    tasks: [],
  
    validateTaskInput(input) {
      return input && input.trim().length > 0;
    },
  
    addTask(taskText) {
      if (!this.validateTaskInput(taskText)) {
        alert('Введите текст задачи!');
        return;
      }
  
      this.tasks.push({
        id: Date.now().toString(),
        text: taskText,
        isCompleted: false,
      });
  
      this.renderTasks();
    },
  
    toggleTask(id) {
      const task = this.tasks.find(task => task.id === id);
      if (task) {
        task.isCompleted = !task.isCompleted;
        this.renderTasks();
      }
    },
  
    renderTasks(filter = 'all') {
      const taskListElement = document.querySelector('.list');
      taskListElement.innerHTML = '';
  
      const filteredTasks = this.tasks.filter(task => {
        if (filter === 'completed') return task.isCompleted;
        if (filter === 'uncompleted') return !task.isCompleted;
        return true;
      });
  
      // Используем map для создания массива DOM-элементов
      const taskListItems = filteredTasks.map(task => {
        const li = document.createElement('li');
        li.className = `list-item ${task.isCompleted ? 'list-item_done' : ''}`;
        li.textContent = task.text;
        li.addEventListener('click', () => this.toggleTask(task.id));
        return li;
      });
  
      // Добавляем элементы в DOM
      taskListElement.append(...taskListItems);
    },
  };
  
  // Слушатели событий для кнопок
  const addButton = document.querySelector('.actions .btn');
  addButton.onclick = function () {
    const taskInput = document.querySelector('.task-input');
    taskManager.addTask(taskInput.value.trim());
    taskInput.value = '';
  };
  
  const allButton = document.getElementById('all');
  allButton.onclick = function () {
    taskManager.renderTasks('all');
  };
  
  const completedButton = document.getElementById('completed');
  completedButton.onclick = function () {
    taskManager.renderTasks('completed');
  };
  
  const uncompletedButton = document.getElementById('uncompleted');
  uncompletedButton.onclick = function () {
    taskManager.renderTasks('uncompleted');
  };
  
  // Начальная отрисовка задач
  taskManager.renderTasks();
  