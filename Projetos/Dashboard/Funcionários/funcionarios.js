// =========================
// Dados de exemplo
// =========================
const dadosOnline = {
  labels: ['Carlos', 'Ana', 'Lucas', 'Roberto', 'Amanda', 'Vanessa'],
  datasets: [{
    label: 'Vendas Online',
    data: [12, 19, 7, 14, 11, 20],
    backgroundColor: ['#007bff', '#28a745', '#ffc107', '#ff6384', '#36a2eb', '#ffce56']
  }]
};

const dadosFisico = {
  labels: ['Carlos', 'Ana', 'Thiago', 'Cátia', 'Reginaldo', 'Tábatha'],
  datasets: [{
    label: 'Vendas na Loja Física',
    data: [9, 5, 14, 16, 7, 2],
    backgroundColor: ['#dc3545', '#6f42c1', '#20c997', '#ff9f40', '#4bc0c0', '#9966ff']
  }]
};

// =========================
// Configurações dos Gráficos
// =========================
const configOnline = {
  type: 'bar', // Tipo: barras
  data: dadosOnline,
  options: {
    responsive: true, // Responsivo para qualquer tela
    plugins: {
      legend: { display: false }, // Esconde legenda
      title: {
        display: true,
        text: 'Vendas na Loja Online',
        font: {
          size: 15, // 🔥 Aqui você controla o tamanho da fonte do título
        }
      }
    }
  }
};

const configFisico = {
  type: 'bar',
  data: dadosFisico,
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Vendas na Loja Física',
        font: {
          size: 20, // 🔥 Aqui você controla o tamanho da fonte do título

        }
      }
    }
  }
};

// =========================
// Renderiza os Gráficos
// =========================
const graficoOnline = new Chart(
  document.getElementById('graficoOnline'),
  configOnline
);

const graficoFisico = new Chart(
  document.getElementById('graficoFisico'),
  configFisico
);

// =========================
// Controle das Abas (Tabs)
// =========================
function mostrarGrafico(tipo) {
  const online = document.getElementById('graficoOnline');
  const fisico = document.getElementById('graficoFisico');
  const tabs = document.querySelectorAll('.tab');

  if (tipo === 'online') {
    online.style.display = 'block';
    fisico.style.display = 'none';
  } else {
    online.style.display = 'none';
    fisico.style.display = 'block';
  }

  // Atualiza visualmente qual aba está ativa
  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`.tab[onclick*="${tipo}"]`).classList.add('active');
}
