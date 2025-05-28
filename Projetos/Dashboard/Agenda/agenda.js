// Alternar Tema Claro/Escuro
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}

// Inicialização do FullCalendar
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  fetch('eventos.json')
    .then(response => response.json())
    .then(events => {
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 'auto',
        events: events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        eventColor: '#3B82F6',

        eventClick: function(info) {
          openModal(info.event);
        },

        dateClick: function(info) {
          abrirModalComData(info.dateStr);
        },

        eventDidMount: function(info) {
          const tooltip = document.createElement('div');
          tooltip.innerText = info.event.title;
          tooltip.className = 'absolute z-50 bg-black text-white text-xs rounded px-2 py-1 pointer-events-none opacity-0 transition-opacity duration-200';
          document.body.appendChild(tooltip);

          info.el.addEventListener('mouseenter', function(e) {
            tooltip.style.top = e.pageY + 'px';
            tooltip.style.left = e.pageX + 'px';
            tooltip.style.opacity = 1;
          });

          info.el.addEventListener('mousemove', function(e) {
            tooltip.style.top = e.pageY + 10 + 'px';
            tooltip.style.left = e.pageX + 10 + 'px';
          });

          info.el.addEventListener('mouseleave', function() {
            tooltip.style.opacity = 0;
          });
        }
      });

      calendar.render();
    })
    .catch(error => {
      console.error('Erro ao carregar eventos:', error);
    });
});

// Adicionar evento (ao clicar numa data)
function handleDateClick(info) {
  const titulo = prompt("Título do evento:");
  if (titulo) {
    calendar.addEvent({
      title: titulo,
      start: info.dateStr,
      allDay: true
    });
  }
}

// Editar/Remover evento (ao clicar num evento)
function handleEventClick(info) {
  const novaOpcao = prompt("Digite novo título ou 'remover' para deletar:", info.event.title);

  if (novaOpcao === null) return;

  if (novaOpcao.toLowerCase() === 'remover') {
    info.event.remove();
  } else {
    info.event.setProp('title', novaOpcao);
  }
}

// Modal de evento existente (abrir/fechar)
function openModal(event) {
  document.getElementById('modalTitle').innerText = event.title;
  document.getElementById('modalDate').innerText = "Data: " + event.start.toLocaleDateString('pt-BR');
  // Preenche os campos de edição no modal
  document.getElementById('eventTitleInput').value = event.title;
  document.getElementById('eventDateInput').value = event.start.toLocaleDateString('pt-BR');
  document.getElementById('eventModal').classList.remove('hidden');
  document.getElementById('eventModal').classList.add('flex');
}

// Função para salvar as edições
function saveEventChanges() {
  const updatedTitle = document.getElementById('eventTitleInput').value;
  const updatedDate = document.getElementById('eventDateInput').value;
  
  // Aqui você pode fazer o que quiser com os dados atualizados, como salvar em uma API ou localStorage
  console.log('Evento Atualizado:', { updatedTitle, updatedDate });
  
  // Fechar o modal após salvar
  closeModal();
}

function closeModal() {
  document.getElementById('eventModal').classList.add('hidden');
  document.getElementById('eventModal').classList.remove('flex');
}

// Modal ao clicar numa data
function abrirModalComData(data) {
  const modal = document.getElementById("meuModal");
  const dataSelecionada = document.getElementById("dataSelecionada");
  dataSelecionada.textContent = "Data selecionada: " + formatarDataBr(data);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function formatarDataBr(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

// Fechar modal da data clicada
document.addEventListener("DOMContentLoaded", () => {
  const fecharBtn1 = document.getElementById("fecharModal");
  const fecharBtn2 = document.getElementById("btnFechar");
  const modal = document.getElementById("meuModal");

  [fecharBtn1, fecharBtn2].forEach(btn => {
    btn.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    });
  });
   // Botão de salvar evento
  const saveButton = document.getElementById('saveEventBtn'); // Assumindo que o botão de salvar tem esse id
  if (saveButton) {
    saveButton.addEventListener('click', saveEventChanges); // Lida com o clique do botão de salvar
  }
});