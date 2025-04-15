const addTaskButton = document.querySelector(".add-task-btn");
const columns = document.querySelectorAll(".coluna");

addTaskButton.addEventListener("click", () => {
    const container = document.querySelector(".container-itens");
    const newTask = createNewTask();
    container.appendChild(newTask);
});

function createNewTask(nomeTarefa = "", dataHora = "", detalhes = "") {
    const task = document.createElement("div");
    task.classList.add("item");
    task.setAttribute("draggable", "true");

    task.innerHTML = `
        <div class="tarefa-topo">
            <input class="nome-tarefa-input" type="text" value="${nomeTarefa}" placeholder="Nome da tarefa" />
        </div>
        <div class="tarefa-conteudo">
            <input type="datetime-local" class="data-hora" value="${dataHora}" />
            <textarea class="detalhes" placeholder="Detalhes da tarefa...">${detalhes}</textarea>
        </div>
        <button class="salvar-btn">Salvar</button>
    `;

    const saveBtn = task.querySelector(".salvar-btn");
    saveBtn.addEventListener("click", () => {
        const nomeTarefa = task.querySelector(".nome-tarefa-input").value;
        const dataHora = task.querySelector(".data-hora").value;
        const detalhes = task.querySelector(".detalhes").value;

        task.innerHTML = `
            <div class="tarefa-topo">
                <span class="nome-tarefa">${nomeTarefa}</span>
                <span class="data-hora-tarefa">${dataHora}</span>
                <span class="detalhes-tarefa">${detalhes.split("\n")[0]}</span>
            </div>
            <button class="detalhar-btn">Detalhar</button>
            <button class="editar-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
        `;

        task.setAttribute("draggable", "true");

        task.querySelector(".detalhar-btn").addEventListener("click", () => {
            openModal(nomeTarefa, dataHora, detalhes);
        });

        task.querySelector(".editar-btn").addEventListener("click", () => {
            const editableTask = createNewTask(nomeTarefa, dataHora, detalhes);
            task.replaceWith(editableTask); // Substitui pelo modo de edição
        });

        task.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTask(task);
        });
    });

    return task;
}

// Modal
const modal = document.querySelector(".modal-container");

function openModal(nomeTarefa, dataHora, detalhes) {
    const modalTarefa = modal.querySelector(".modal .nome-tarefa");
    const modalDataHora = modal.querySelector(".modal .data-hora-tarefa");
    const modalDetalhes = modal.querySelector(".modal .detalhes-texto");

    modalTarefa.textContent = nomeTarefa;
    modalDataHora.textContent = dataHora;
    modalDetalhes.textContent = detalhes;

    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

function deleteTask(task) {
    task.remove();
}

// Drag and Drop
let draggedTask = null;

document.addEventListener("dragstart", function (e) {
    if (e.target.classList.contains("item")) {
        draggedTask = e.target;
    }
});

document.addEventListener("dragend", function () {
    draggedTask = null;
});

columns.forEach((column) => {
    column.addEventListener("dragover", function (e) {
        e.preventDefault();
    });

    column.addEventListener("drop", function () {
        if (draggedTask) {
            const container = this.querySelector(".container-itens");
            container.appendChild(draggedTask);
        }
    });
});
