const columns = document.querySelectorAll(".coluna");

function criarTarefa(botao) {
    const coluna = botao.closest(".coluna");
    const container = coluna.querySelector(".container-itens");
    const newTask = createNewTask();
    container.appendChild(newTask);
}

function createNewTask(nomeTarefa = "", dataHora = "", detalhes = "", cor = "#ffffff") {
    const task = document.createElement("div");
    task.classList.add("item");
    task.setAttribute("draggable", "true");
    task.style.backgroundColor = cor; // Aplica a cor inicial

    task.innerHTML = `
        <div class="tarefa-topo">
            <input class="nome-tarefa-input" type="text" value="${nomeTarefa}" placeholder="Nome da tarefa" />
        </div>
        <div class="tarefa-conteudo">
            <input type="datetime-local" class="data-hora" value="${dataHora}" />
            <textarea class="detalhes" placeholder="Detalhes da tarefa...">${detalhes}</textarea>
        </div>
        <button class="salvar-btn">Salvar</button>
        <input type="color" class="color-picker-item" value="${cor}" title="Escolher cor da tarefa" style="position:absolute; top:5px; right:5px; width:25px; height:25px; padding:0; border:none; background:none; cursor:pointer;">
    `;

    const colorPickerLive = task.querySelector(".color-picker-item");
    colorPickerLive.addEventListener("input", (e) => {
        task.style.backgroundColor = e.target.value;
    });

    const saveBtn = task.querySelector(".salvar-btn");
    saveBtn.addEventListener("click", () => {
        const nomeTarefa = task.querySelector(".nome-tarefa-input").value;
        const dataHora = task.querySelector(".data-hora").value;
        const detalhes = task.querySelector(".detalhes").value;
        const cor = task.querySelector(".color-picker-item").value;

        task.innerHTML = `
            <div class="tarefa-topo">
                <span class="nome-tarefa">${nomeTarefa}</span>
                <span class="data-hora-tarefa">${dataHora}</span>
                <span class="detalhes-tarefa">${detalhes.split("\n")[0]}</span>
            </div>
            <button class="detalhar-btn">Detalhar</button>
            <button class="editar-btn">Editar</button>
            <button class="delete-btn">Excluir</button>
            <input type="color" class="color-picker-item" value="${cor}" title="Escolher cor da tarefa" style="position:absolute; top:5px; right:5px; width:25px; height:25px; padding:0; border:none; background:none; cursor:pointer;">
        `;

        task.style.backgroundColor = cor;
        task.setAttribute("draggable", "true");

        task.querySelector(".detalhar-btn").addEventListener("click", () => {
            openModal(nomeTarefa, dataHora, detalhes);
        });

        task.querySelector(".editar-btn").addEventListener("click", () => {
            const editableTask = createNewTask(nomeTarefa, dataHora, detalhes, cor);
            task.replaceWith(editableTask);
        });

        task.querySelector(".delete-btn").addEventListener("click", () => {
            deleteTask(task);
        });

        const colorPicker = task.querySelector(".color-picker-item");
        colorPicker.addEventListener("input", (e) => {
            task.style.backgroundColor = e.target.value;
        });
    });

    return task;
}

// Função para abrir o modal
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

// Função para fechar o modal
function closeModal() {
    modal.classList.remove("active");
}

// Função para deletar a tarefa
function deleteTask(task) {
    task.remove();
}

// ------------------------------
// Drag and Drop entre colunas
// ------------------------------

let draggedTask = null;

document.addEventListener("dragstart", function (e) {
    if (e.target.classList.contains("item")) {
        draggedTask = e.target;
    }
});

document.addEventListener("dragend", function () {
    draggedTask = null;
});

// Função para mudar a cor das colunas
columns.forEach((column) => {
    const picker = column.querySelector(".color-picker-coluna");
    if (picker) {
        picker.addEventListener("input", (e) => {
            column.style.backgroundColor = e.target.value;
        });
    }

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
