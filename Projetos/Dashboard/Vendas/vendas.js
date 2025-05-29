let chart; // Variável para guardar o gráfico ativo

document.addEventListener('DOMContentLoaded', () => {
  fetch('vendas.json')
    .then(res => res.json())
    .then(data => {
      renderizaGrafico('departamentos', data);
    })
    .catch(err => console.error('Erro ao carregar JSON:', err));
});

function mostrarGrafico(tipo) {
  fetch('vendas.json')
    .then(res => res.json())
    .then(data => {
      renderizaGrafico(tipo, data);
    });
}

function renderizaGrafico(tipo, dados) {
  const ctx = document.getElementById(`grafico-${tipo}-canvas`);
  const container = document.getElementById(`grafico-${tipo}`);
  const outro = tipo === 'departamentos' ? 'produtos' : 'departamentos';

  // Alternar visibilidade
  container.style.display = 'block';
  document.getElementById(`grafico-${outro}`).style.display = 'none';

  // Trocar aba ativa
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector(`.tab[onclick*="${tipo}"]`).classList.add('active');

  // Destruir gráfico anterior
  if (chart) chart.destroy();

  const labels = dados[tipo].map(item => item.nome);
  const valores = dados[tipo].map(item => item.vendas);

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Vendas',
        data: valores,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            precision:0
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: '#000'
        }
      }
    }
  });
}
