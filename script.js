document.addEventListener("DOMContentLoaded", function () {
    loadStudies();
    document.getElementById("addTaskBtn").addEventListener("click", addTask);
    document
        .getElementById("taskInput")
        .addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                addTask();
            }
        });

    document
        .getElementById("studyForm")
        .addEventListener("submit", function (e) {
            e.preventDefault();
            const topic = document.getElementById("topic").value;
            const notes = document.getElementById("notes").value;

            addStudy({ topic, notes });
            saveToLocalStorage();
            updateList();
            this.reset();
        });
});

function loadStudies() {
    const studies = JSON.parse(localStorage.getItem("studies")) || [];
    studies.forEach((study) => addStudy(study));
}

function addStudy(study) {
    const studyList = document.getElementById("studyList");
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>${study.topic}</strong>
        <p>${study.notes}</p>
        <button class="edit-btn" onclick="editStudy(this)">Editar</button>
        <button class="delete-btn" onclick="deleteStudy(this)">Excluir</button>
    `;
    studyList.appendChild(listItem);
}

function editStudy(button) {
    const listItem = button.parentElement;
    const topic = listItem.querySelector("strong").innerText;
    const notes = listItem.querySelector("p").innerText;

    document.getElementById("topic").value = topic;
    document.getElementById("notes").value = notes;

    deleteStudy(button);
}

function deleteStudy(button) {
    const listItem = button.parentElement;
    document.getElementById("studyList").removeChild(listItem);
    saveToLocalStorage();
}

function saveToLocalStorage() {
    const studies = [];
    document.querySelectorAll("#studyList li").forEach((li) => {
        const topic = li.querySelector("strong").innerText;
        const notes = li.querySelector("p").innerText;
        studies.push({ topic, notes });
    });
    localStorage.setItem("studies", JSON.stringify(studies));
}

function updateList() {
    document.getElementById("studyList").innerHTML = "";
    loadStudies();
}

// Lista de Tarefas
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Por favor, adicione uma tarefa.");
        return;
    }

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");

    li.textContent = taskText;
    li.addEventListener("click", function () {
        li.classList.toggle("completed");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remover";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        taskList.removeChild(li);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    taskInput.value = "";
}
