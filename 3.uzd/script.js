document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Ielādēt uzdevumus no vietējās krātuves
    loadTasks();

    addTaskButton.addEventListener('click', function() {
        addTask();
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Dzēst';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function() {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskInput.value = '';
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(function(taskItem) {
            tasks.push(taskItem.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(function(taskText) {
                const taskItem = document.createElement('li');
                taskItem.textContent = taskText;

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Dzēst';
                deleteButton.classList.add('delete-button');
                deleteButton.addEventListener('click', function() {
                    taskList.removeChild(taskItem);
                    saveTasks();
                });

                taskItem.appendChild(deleteButton);
                taskList.appendChild(taskItem);
            });
        }
    }
});
