// Dados simulados dos recibos
const recibos = [
  {
    data: '2024-05-01',
    cliente: 'João Silva',
    produto: 'Celular XYZ',
    codigo: 'C123',
    valorProduto: 2500,
    frete: 50,
    desconto: 100,
    pagamento: 'Cartão - Parcelado',
    pagoNaCompra: 500,
    vendedor: 'Carlos',
    dataCompra: '2024-05-01'
  },
  {
    data: '2024-05-05',
    cliente: 'Maria Souza',
    produto: 'Notebook ABC',
    codigo: 'N456',
    valorProduto: 4500,
    frete: 0,
    desconto: 200,
    pagamento: 'Pix',
    pagoNaCompra: 4300,
    vendedor: 'Ana',
    dataCompra: '2024-05-05'
  }
];

const tabela = document.getElementById('tabelaRecibos');
const popup = document.getElementById('popup');
const detalhes = document.getElementById('detalhesRecibo');
const closePopup = document.getElementById('closePopup');

// Renderiza tabela
function renderizarTabela(lista) {
  tabela.innerHTML = '';
  lista.forEach((r, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${r.data}</td>
      <td>${r.cliente}</td>
      <td>${r.produto}</td>
      <td>${r.vendedor}</td>
      <td>R$ ${r.valorProduto.toFixed(2)}</td>
      <td><button onclick="abrirPopup(${index})">Ver</button></td>
    `;
    tabela.appendChild(tr);
  });
}

// Abre popup
function abrirPopup(index) {
  const r = recibos[index];
  detalhes.innerHTML = `
    <p><strong>Cliente:</strong> ${r.cliente}</p>
    <p><strong>Produto:</strong> ${r.produto}</p>
    <p><strong>Código do Produto:</strong> ${r.codigo}</p>
    <p><strong>Valor do Produto:</strong> R$ ${r.valorProduto.toFixed(2)}</p>
    <p><strong>Frete:</strong> R$ ${r.frete.toFixed(2)}</p>
    <p><strong>Desconto:</strong> R$ ${r.desconto.toFixed(2)}</p>
    <p><strong>Forma de Pagamento:</strong> ${r.pagamento}</p>
    <p><strong>Pago na Compra:</strong> R$ ${r.pagoNaCompra.toFixed(2)}</p>
    <p><strong>Data da Compra:</strong> ${r.dataCompra}</p>
    <p><strong>Vendedor:</strong> ${r.vendedor}</p>
  `;
  popup.style.display = 'block';
}

// Fecha popup
closePopup.onclick = () => {
  popup.style.display = 'none';
};

window.onclick = (e) => {
  if (e.target == popup) {
    popup.style.display = 'none';
  }
};

// Filtros
const filtroData = document.getElementById('filtroData');
const filtroVendedor = document.getElementById('filtroVendedor');
const filtroCliente = document.getElementById('filtroCliente');
const filtroProduto = document.getElementById('filtroProduto');

function aplicarFiltros() {
  const data = filtroData.value;
  const vendedor = filtroVendedor.value.toLowerCase();
  const cliente = filtroCliente.value.toLowerCase();
  const produto = filtroProduto.value.toLowerCase();

  const filtrado = recibos.filter(r => {
    return (!data || r.data === data) &&
           (!vendedor || r.vendedor.toLowerCase().includes(vendedor)) &&
           (!cliente || r.cliente.toLowerCase().includes(cliente)) &&
           (!produto || r.produto.toLowerCase().includes(produto));
  });

  renderizarTabela(filtrado);
}

[filtroData, filtroVendedor, filtroCliente, filtroProduto].forEach(input => {
  input.addEventListener('input', aplicarFiltros);
});

// Inicializa tabela
renderizarTabela(recibos);
