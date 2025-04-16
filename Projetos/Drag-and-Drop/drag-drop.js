const columns = document.querySelectorAll(".coluna");

// Limita o título da coluna a 20 caracteres
document.querySelectorAll(".coluna-titulo").forEach((titulo) => {
    titulo.addEventListener("input", () => {
        const maxChars = 40;
        if (titulo.textContent.length > maxChars) {
            titulo.textContent = titulo.textContent.slice(0, maxChars);
            // Move o cursor para o final
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(titulo);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    });
});

function criarTarefa(botao) {
    const coluna = botao.closest(".coluna");
    const container = coluna.querySelector(".container-itens");
    const newTask = createNewTask();
    container.appendChild(newTask);
}

function createNewTask(nomeTarefa = "", dataHora = "", detalhes = "") {
    const task = document.createElement("div");
    task.classList.add("item");
    task.setAttribute("draggable", "true");

    task.innerHTML = `
        <div class="tarefa-topo">
            <input class="nome-tarefa-input" type="text" value="${nomeTarefa}" placeholder="Nome da tarefa" maxlength="30" />
        </div>
        <div class="tarefa-conteudo">
            <input type="datetime-local" class="data-hora" value="${dataHora}" />
            <textarea class="detalhes" placeholder="Detalhes da tarefa...">${detalhes}</textarea>
        </div>
        <button class="salvar-btn">Salvar</button>
        <input type="color" class="color-picker-item" title="Escolher cor da tarefa">
    `;

    const saveBtn = task.querySelector(".salvar-btn");
    const colorPicker = task.querySelector(".color-picker-item");

    colorPicker.style.display = "inline-block";

    saveBtn.addEventListener("click", () => {
        const nomeTarefa = task.querySelector(".nome-tarefa-input").value;
        const dataHora = task.querySelector(".data-hora").value;
        const detalhes = task.querySelector(".detalhes").value;
        const corSelecionada = colorPicker.value;

        colorPicker.style.display = "none";

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

        task.style.backgroundColor = corSelecionada;
        task.setAttribute("draggable", "true");

        const detalharBtn = task.querySelector(".detalhar-btn");
        detalharBtn.addEventListener("click", () => {
            openModal(nomeTarefa, dataHora, detalhes);
        });

        const editarBtn = task.querySelector(".editar-btn");
        editarBtn.addEventListener("click", () => {
            const editableTask = createNewTask(nomeTarefa, dataHora, detalhes);
            editableTask.style.backgroundColor = corSelecionada;
            task.replaceWith(editableTask);
        });

        const deleteBtn = task.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            deleteTask(task);
        });
    });

    colorPicker.addEventListener("input", (e) => {
        task.style.backgroundColor = e.target.value;
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
