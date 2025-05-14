// Alternar Tema Claro/Escuro
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
}

// Alternar visibilidade do menu mobile
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('transform');
  mobileMenu.classList.toggle('-translate-x-full');
}

// Chart de pizza
const pieCtx = document.getElementById('pieChart').getContext('2d');
const pieLabels = [
  'Aluguel', 'Salários', 'Marketing', 'Transporte', 'Serviços Públicos',
  'Manutenção', 'Materiais de Escritório', 'Consultorias', 'Licenças de Software', 'Eventos'
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

// Legenda da pizza
const legendContainer = document.getElementById('pieChartLegend');
legendContainer.innerHTML = '';
pieLabels.forEach((label, index) => {
  const item = document.createElement('div');
  item.className = 'flex items-center mb-1';
  item.innerHTML = `
    <span class="w-3 h-3 rounded-full mr-2" style="background-color: ${pieColors[index]}"></span>
    ${label}
  `;
  legendContainer.appendChild(item);
});

// Hamburguer menu
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  hamburger.addEventListener('click', toggleMobileMenu);
});

document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('nav a')
    const sections = document.querySelectorAll('main section')

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault()

        const targetId = link.getAttribute('data-target')

        sections.forEach(section => {
          section.classList.remove('active')
        })

        document.getElementById(targetId).classList.add('active')
      })
    })
});

document.addEventListener('DOMContentLoaded', () => {
  function carregarPagina(pagina) {
  fetch(pagina)
    .then(response => response.text())
    .then(html => {
      document.getElementById("conteudoPrincipal").innerHTML = html;
    });
  }
});
    
