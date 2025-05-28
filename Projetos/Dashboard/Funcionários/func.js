// Alternar Tema Claro/Escuro
function toggleTheme() {
  document.documentElement.classList.toggle('dark');
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