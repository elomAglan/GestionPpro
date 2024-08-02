// Variables globales pour les projets et tâches
let projects = [];
let tasks = [];


// Charger les données depuis le stockage local lors du chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    loadProjects();
    loadTasks();
    updateProjectList();
    updateTaskList();
    updateProjectSelect();
    loadBusinessPlans(); // Charger les business plans au démarrage
});

// Fonction pour ajouter un projet
function addProject() {
    const projectName = document.getElementById('projectInput').value.trim();
    if (projectName) {
        projects.push(projectName);
        saveProjects(); // Sauvegarder les projets après ajout
        updateProjectList();
        updateProjectSelect();
        document.getElementById('projectInput').value = '';
    } else {
        alert('Veuillez entrer un nom de projet.');
    }
}

// Fonction pour mettre à jour la liste des projets
function updateProjectList() {
    const projectList = document.getElementById('projectList');
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${project} 
            <button class="delete-btn" onclick="deleteProject(${index})">x</button>
        `;
        projectList.appendChild(li);
    });
}

// Fonction pour supprimer un projet
function deleteProject(index) {
    projects.splice(index, 1);
    saveProjects(); // Sauvegarder les projets après suppression
    updateProjectList();
    updateProjectSelect();
}

// Fonction pour mettre à jour le sélecteur de projet dans les tâches
function updateProjectSelect() {
    const projectSelect = document.getElementById('taskProjectSelect');
    projectSelect.innerHTML = '';
    projects.forEach((project) => {
        const option = document.createElement('option');
        option.value = project;
        option.textContent = project;
        projectSelect.appendChild(option);
    });
}

// Fonction pour ajouter une tâche
function addTask() {
    const taskName = document.getElementById('taskInput').value.trim();
    const project = document.getElementById('taskProjectSelect').value;
    const startDate = document.getElementById('startDateInput').value;
    const dueDate = document.getElementById('dueDateInput').value;

    if (taskName && project && startDate && dueDate) {
        const task = {
            taskName,
            project,
            startDate,
            dueDate,
        };
        tasks.push(task);
        saveTasks(); // Sauvegarder les tâches après ajout
        updateTaskList();
        document.getElementById('taskInput').value = '';
        document.getElementById('startDateInput').value = '';
        document.getElementById('dueDateInput').value = '';
    } else {
        alert('Veuillez remplir tous les champs de tâche.');
    }
}

// Fonction pour mettre à jour la liste des tâches
function updateTaskList() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${task.taskName}</td>
            <td>${task.project}</td>
            <td>${task.startDate}</td>
            <td>${task.dueDate}</td>
            <td>
                <button class="btn" onclick="editTask(${index})">Modifier</button>
                <button class="btn delete-btn" onclick="deleteTask(${index})">Supprimer</button>
            </td>
        `;
        taskList.appendChild(tr);
    });
}

// Fonction pour supprimer une tâche
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks(); // Sauvegarder les tâches après suppression
    updateTaskList();
}

// Fonction pour éditer une tâche
function editTask(index) {
    const task = tasks[index];
    const newTaskName = prompt('Modifier le nom de la tâche:', task.taskName);
    const newStartDate = prompt('Modifier la date de début:', task.startDate);
    const newDueDate = prompt('Modifier la date d\'échéance:', task.dueDate);

    if (newTaskName && newStartDate && newDueDate) {
        tasks[index] = {
            ...task,
            taskName: newTaskName,
            startDate: newStartDate,
            dueDate: newDueDate,
        };
        saveTasks(); // Sauvegarder les tâches après modification
        updateTaskList();
    }
}

// Fonction pour sauvegarder les projets dans le stockage local
function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

// Fonction pour charger les projets depuis le stockage local
function loadProjects() {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
        projects = JSON.parse(storedProjects);
    }
}

// Fonction pour sauvegarder les tâches dans le stockage local
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Fonction pour charger les tâches depuis le stockage local
function loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Fonction pour télécharger la liste des tâches en PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Liste des Tâches', 20, 20);

    const headers = [['#', 'Tâches', 'Projets', 'Date de début', 'Date d\'échéance']];

    const data = tasks.map((task, index) => [
        index + 1,
        task.taskName,
        task.project,
        task.startDate,
        task.dueDate,
    ]);

    doc.autoTable({
        head: headers,
        body: data,
        startY: 30,
    });

    doc.save('Liste_des_taches.pdf');
}

// Écouteurs d'événements pour projets et tâches
document.getElementById('addProjectButton').addEventListener('click', addProject);
document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('downloadPDFButton').addEventListener('click', downloadPDF);





