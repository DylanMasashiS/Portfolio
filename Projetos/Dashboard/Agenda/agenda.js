let selectedEvent = null; // 🔥 Variável global para armazenar o evento selecionado

document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 'auto',
    contentHeight: 'auto',
    expandRows: true,
    fixedWeekCount: false,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,listWeek'
    },
    events: 'eventos.json',

    eventClick: function (info) {
      abrirModalEvento(info.event);
    },

    dateClick: function (info) {
      abrirModalData(info.dateStr);
    },

    eventDidMount: function (info) {
      const tooltip = document.createElement('div');
      tooltip.innerText = info.event.title;
      tooltip.className = 'tooltip';
      document.body.appendChild(tooltip);

      info.el.addEventListener('mouseenter', function (e) {
        tooltip.style.top = (e.pageY + 10) + 'px';
        tooltip.style.left = (e.pageX + 10) + 'px';
        tooltip.style.opacity = 1;
      });

      info.el.addEventListener('mousemove', function (e) {
        tooltip.style.top = (e.pageY + 10) + 'px';
        tooltip.style.left = (e.pageX + 10) + 'px';
      });

      info.el.addEventListener('mouseleave', function () {
        tooltip.style.opacity = 0;
      });
    }
  });

  calendar.render();

  // ----- Modal Evento Existente -----
  function abrirModalEvento(event) {
    selectedEvent = event; // 🔥 Define evento selecionado

    document.getElementById('modalTitle').innerText = event.title;
    document.getElementById('modalDate').innerText = "Data: " + formatarDataBr(event.startStr);
    document.getElementById('eventTitleInput').value = event.title;
    document.getElementById('eventDateInput').value = event.startStr;
    document.getElementById('eventModal').classList.add('flex');
  }

  window.closeModal = function () {
    document.getElementById('eventModal').classList.remove('flex');
    selectedEvent = null; // 🔥 Limpa evento selecionado ao fechar
  };

  window.saveEventChanges = function () {
    const titulo = document.getElementById('eventTitleInput').value;
    const data = document.getElementById('eventDateInput').value;

    if (selectedEvent) {
      selectedEvent.setProp('title', titulo); // 🔥 Atualiza o título
      selectedEvent.setStart(data);           // 🔥 Atualiza a data
    }

    closeModal();
  };

  window.deleteEvent = function () {
    if (selectedEvent) {
      const confirmDelete = confirm('Tem certeza que deseja excluir este evento?');
      if (confirmDelete) {
        selectedEvent.remove(); // 🔥 Remove o evento do calendário
        closeModal();
      }
    }
  };

  // ----- Modal Data Vazia -----
  function abrirModalData(data) {
    document.getElementById('dataSelecionada').innerText = "Data selecionada: " + formatarDataBr(data);
    document.getElementById('tituloEvento').value = "";
    document.getElementById('dataModal').classList.add('flex');
    document.getElementById('dataModal').dataset.data = data;
  }

  window.fecharModalData = function () {
    document.getElementById('dataModal').classList.remove('flex');
  };

  window.salvarEvento = function () {
    const titulo = document.getElementById('tituloEvento').value;
    const data = document.getElementById('dataModal').dataset.data;

    if (titulo.trim() === '') {
      alert("Por favor, insira um título.");
      return;
    }

    calendar.addEvent({
      title: titulo,
      start: data,
      allDay: true
    });

    fecharModalData();
  };

  // ----- Função de Formatação -----
  function formatarDataBr(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
  }
});
