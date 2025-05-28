// Dados simulados
const dataMesAtual = {
  labels: ["RH", "Marketing", "Operacional", "TI", "Logística"],
  values: [2500, 1800, 3200, 2100, 2700]
};

const dataMesAnterior = {
  labels: ["RH", "Marketing", "Operacional", "TI", "Logística"],
  values: [2300, 2000, 3000, 2500, 2600]
};

// Elementos
const tabMesAtual = document.getElementById('tabMesAtual');
const tabMesAnterior = document.getElementById('tabMesAnterior');
const canvas = document.getElementById('financeChart');
const ctx = canvas.getContext('2d');

let currentChart = null;

// Função para desenhar gráfico
function renderChart(labels, values) {
  if (currentChart) {
    currentChart.clearRect(0, 0, canvas.width, canvas.height);
  }

  const barWidth = 40;
  const gap = 60;
  const maxVal = Math.max(...values);
  const chartHeight = 300;
  const chartWidth = (barWidth + gap) * labels.length;

  canvas.width = chartWidth;
  canvas.height = chartHeight + 100;

  // Eixos
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#ccc';
  ctx.beginPath();
  ctx.moveTo(50, 20);
  ctx.lineTo(50, chartHeight);
  ctx.lineTo(chartWidth, chartHeight);
  ctx.stroke();

  // Barras
  labels.forEach((label, i) => {
    const barHeight = (values[i] / maxVal) * (chartHeight - 20);
    const x = 50 + i * (barWidth + gap);
    const y = chartHeight - barHeight;

    // Desenha barra
    ctx.fillStyle = '#28a745';
    ctx.fillRect(x, y, barWidth, barHeight);

    // Valor
    ctx.fillStyle = '#000';
    ctx.font = '12px sans-serif';
    ctx.fillText(`R$${values[i]}`, x, y - 5);

    // Label
    ctx.fillStyle = '#333';
    ctx.font = '12px sans-serif';
    ctx.fillText(label, x - 10, chartHeight + 15);
  });
}

// Troca de abas
tabMesAtual.onclick = () => {
  tabMesAtual.classList.add('active');
  tabMesAnterior.classList.remove('active');
  renderChart(dataMesAtual.labels, dataMesAtual.values);
};

tabMesAnterior.onclick = () => {
  tabMesAnterior.classList.add('active');
  tabMesAtual.classList.remove('active');
  renderChart(dataMesAnterior.labels, dataMesAnterior.values);
};

// Inicializa com mês atual
renderChart(dataMesAtual.labels, dataMesAtual.values);
