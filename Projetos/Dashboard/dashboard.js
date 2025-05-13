// Alternar Tema Claro/Escuro
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}

// Alternar visibilidade do menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('transform'); // Alterna a classe de transição do menu
  mobileMenu.classList.toggle('-translate-x-full'); // Alterna a visibilidade do menu
}

// Chart de barra
const mainChart = new Chart(document.getElementById('mainChart'), {
  type: 'bar',
  data: {
    labels: ['Fulano', 'Ciclano', 'Beltrano'],
    datasets: [{
      label: 'Vendas',
      data: [30, 50, 40],
      backgroundColor: 'rgba(59, 130, 246, 0.7)'
    }]
  },
  options: {
    responsive: true
  }
});

const pieCtx = document.getElementById('pieChart').getContext('2d');

const pieLabels = [
  'Aluguel',
  'Salários',
  'Marketing',
  'Transporte',
  'Serviços Públicos',
  'Manutenção',
  'Materiais de Escritório',
  'Consultorias',
  'Licenças de Software',
  'Eventos'
];

const pieColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#B0E57C', '#F87070', '#70A1F8', '#E0C3FC'
];

const pieData = {
  labels: pieLabels,
  datasets: [{
    data: [12, 19, 3, 5, 2, 4, 7, 6, 8, 4],
    backgroundColor: pieColors,
  }]
};

const pieChart = new Chart(pieCtx, {
  type: 'pie',
  data: pieData,
  options: {
    responsive: true,
    plugins: {
      legend: { display: false }
    }
  }
});

// ✅ Legenda com nomes de variáveis diferentes para evitar conflito
const legendLabels = [
  'Aluguel',
  'Salários',
  'Marketing',
  'Transporte',
  'Serviços Públicos',
  'Manutenção',
  'Materiais de Escritório',
  'Consultorias',
  'Licenças de Software',
  'Eventos'
];

const legendColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
  '#FF9F40', '#B0E57C', '#F87070', '#70A1F8', '#E0C3FC'
];

const legendContainer = document.getElementById('pieChartLegend');
legendContainer.innerHTML = '';
legendLabels.forEach((label, index) => {
  const item = document.createElement('div');
  item.className = 'flex items-center mb-1';
  item.innerHTML = `
    <span class="w-3 h-3 rounded-full mr-2" 
          style="background-color: ${legendColors[index]}"></span>
    ${label}
  `;
  legendContainer.appendChild(item);
});

// Inicialização do FullCalendar com JSON local
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  fetch('eventos.json')
    .then(response => response.json())
    .then(events => {
      const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        height: 350,
        events: events,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek'
        },
        eventColor: '#3B82F6', // azul Tailwind
      });
      calendar.render();
    })
    .catch(error => {
      console.error('Erro ao carregar eventos:', error);
    });
});

// Evento para abrir e fechar a sidebar mobile (hamburguer)
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const sidebar = document.querySelector('.sidebar');
  
  // Modificar para usar a função toggleMobileMenu()
  hamburger.addEventListener('click', () => {
    toggleMobileMenu(); // Usando a função de toggle para abrir/fechar o menu
  });
});
