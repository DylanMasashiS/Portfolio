// 📥 Carregar dados do JSON
let dados = {};

fetch('financas.json')
  .then(res => res.json())
  .then(json => {
    dados = json;
    inicializar();
  })
  .catch(err => console.error('Erro ao carregar JSON:', err));

const tabMesAtual = document.getElementById('tabMesAtual');
const tabMesAnterior = document.getElementById('tabMesAnterior');
const ctx = document.getElementById('financeChart').getContext('2d');

let chart = null;

// 🎨 Função para criar o gráfico
function criarGrafico(labels, valores) {
  if (chart) chart.destroy(); // Destroi gráfico anterior

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Despesas (R$)',
        data: valores,
        backgroundColor: '#28a745'
      }]
    },
    options: {
  responsive: true,
  maintainAspectRatio: false, // 🔥 Controla pela altura do CSS
  layout: {
    padding: {
      top: 20,
      bottom: 20,
      left: 10,
      right: 10
    }
  },
  plugins: {
    legend: { display: false },
    title: {
      display: true,
      text: 'Despesas por Departamento'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: value => 'R$ ' + value
      }
    }
  }
}
  });
}

// 🔄 Função para iniciar e trocar abas
function inicializar() {
  criarGrafico(dados.mesAtual.labels, dados.mesAtual.valores);

  tabMesAtual.addEventListener('click', () => {
    tabMesAtual.classList.add('active');
    tabMesAnterior.classList.remove('active');
    criarGrafico(dados.mesAtual.labels, dados.mesAtual.valores);
  });

  tabMesAnterior.addEventListener('click', () => {
    tabMesAnterior.classList.add('active');
    tabMesAtual.classList.remove('active');
    criarGrafico(dados.mesAnterior.labels, dados.mesAnterior.valores);
  });
}
