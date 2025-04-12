const addTaskButton = document.querySelector(".add-task-btn"); // Seleciona o botão de adicionar tarefa
const columns = document.querySelectorAll(".coluna"); // Seleciona as colunas onde as tarefas vão ficar

// Adiciona evento de clique no botão para adicionar tarefa
addTaskButton.addEventListener("click", () => {
    const container = document.querySelector(".container-itens"); // Onde as tarefas serão adicionadas
    const newTask = createNewTask();
    container.appendChild(newTask); // Adiciona a nova tarefa à coluna
});

// Função para criar uma nova tarefa
function createNewTask() {
    const task = document.createElement("div");
    task.classList.add("item");
    task.setAttribute("draggable", "true");

    task.innerHTML = `
        <div class="tarefa-topo">
            <input class="nome-tarefa-input" type="text" placeholder="Nome da tarefa" />
        </div>
        <div class="tarefa-conteudo">
            <input type="datetime-local" class="data-hora" />
            <textarea class="detalhes" placeholder="Detalhes da tarefa..."></textarea>
        </div>
        <button class="salvar-btn">Salvar</button>
        
        <!-- O botão de Excluir NÃO está aqui ainda -->
    `;

    // Função para salvar a tarefa
    const saveBtn = task.querySelector(".salvar-btn");
    saveBtn.addEventListener("click", () => {
        const nomeTarefa = task.querySelector(".nome-tarefa-input").value;
        const dataHora = task.querySelector(".data-hora").value;
        const detalhes = task.querySelector(".detalhes").value;

        // Atualiza a tarefa com os dados preenchidos
        task.innerHTML = `
            <div class="tarefa-topo">
                <span class="nome-tarefa">${nomeTarefa}</span>
                <span class="data-hora-tarefa">${dataHora}</span>
                <span class="detalhes-tarefa">${detalhes.split("\n")[0]}</span>
            </div>
            <button class="detalhar-btn">Detalhar</button>
            <button class="delete-btn">Excluir</button> <!-- Agora, o botão Excluir aparece após salvar -->
        `;

        // Botão de "Detalhar" abre o modal
        const detailBtn = task.querySelector(".detalhar-btn");
        detailBtn.addEventListener("click", () => {
            openModal(nomeTarefa, dataHora, detalhes); // Passa os dados para o modal
        });

        // Botão de "Excluir" remove a tarefa
        const deleteBtn = task.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            deleteTask(task); // Chama a função de excluir
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

    modal.classList.add("active"); // Exibe o modal
}

// Função para fechar o modal
function closeModal() {
    modal.classList.remove("active");
}

// Função para deletar a tarefa
function deleteTask(task) {
    task.remove(); // Remove a tarefa do DOM
}
