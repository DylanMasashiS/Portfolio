const columns = document.querySelectorAll(".coluna");
const addTaskButtons = document.querySelectorAll(".add-task-btn");

// Funções de drag and drop
document.addEventListener("dragstart", (e) => {
    e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
    e.target.classList.remove("dragging");
});

columns.forEach((column) => {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
        const dragging = document.querySelector(".dragging");
        const applyAfter = getNewPosition(column, e.clientY);

        if (applyAfter) {
            applyAfter.insertAdjacentElement("afterend", dragging);
        } else {
            column.prepend(dragging);
        }
    });
});

function getNewPosition(column, posY) {
    const cards = column.querySelectorAll(".item:not(.dragging)");
    let result;
    for (let refer_card of cards) {
        const box = refer_card.getBoundingClientRect();
        const boxCenterY = box.y + box.height / 2;
        if (posY >= boxCenterY) result = refer_card;
    }
    return result;
}

// Criar tarefa
function criarItemTarefa() {
    const item = document.createElement("div");
    item.classList.add("item");
    item.setAttribute("draggable", true);
    item.dataset.id = Date.now();

    item.innerHTML = `
        <div class="tarefa-topo">
            <div class="emoji-wrapper">
                <button class="emoji-btn">📌</button>
                <div class="emoji-dropdown hidden">
                    <span>📌</span>
                    <span>📚</span>
                    <span>💻</span>
                    <span>✅</span>
                    <span>📝</span>
                </div>
            </div>
            <input class="nome-tarefa-input" type="text" placeholder="Nome da tarefa" />
        </div>

        <div class="tarefa-conteudo">
            <input type="datetime-local" class="data-hora" />
            <textarea class="detalhes" placeholder="Detalhes da tarefa..."></textarea>
        </div>
    `;

    // Dropdown de emoji
    const emojiBtn = item.querySelector(".emoji-btn");
    const emojiDropdown = item.querySelector(".emoji-dropdown");

    emojiBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        emojiDropdown.classList.toggle("hidden");
    });

    emojiDropdown.querySelectorAll("span").forEach(span => {
        span.addEventListener("click", () => {
            emojiBtn.textContent = span.textContent;
            emojiDropdown.classList.add("hidden");
        });
    });

    document.addEventListener("click", () => {
        emojiDropdown.classList.add("hidden");
    });

    return item;
}

// Botões de adicionar tarefa por coluna
addTaskButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const column = btn.closest(".coluna");
        const tarefa = criarItemTarefa();
        column.appendChild(tarefa);
    });
});
