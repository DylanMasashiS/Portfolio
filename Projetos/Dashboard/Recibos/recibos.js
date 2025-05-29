document.addEventListener('DOMContentLoaded', () => {
  const tabelaBody = document.querySelector('#tabelaRecibos tbody');
  const modal = document.getElementById('modal');
  const modalContent = document.getElementById('modalContent');
  const closeModal = document.getElementById('closeModal');

  const filtroCliente = document.getElementById('filtroCliente');
  const filtroCPF = document.getElementById('filtroCPF');
  const filtroVendedor = document.getElementById('filtroVendedor');
  const filtroProduto = document.getElementById('filtroProduto');

  let recibos = [];

  fetch('recibos.json')
    .then(res => res.json())
    .then(data => {
      recibos = data;
      renderizarTabela(recibos);
    })
    .catch(err => console.error('Erro ao carregar JSON:', err));

  function aplicarFiltros() {
    const cliente = filtroCliente.value.toLowerCase();
    const cpf = filtroCPF.value.toLowerCase();
    const vendedor = filtroVendedor.value.toLowerCase();
    const produto = filtroProduto.value.toLowerCase();

    const filtrados = recibos.filter(r =>
      r.cliente.toLowerCase().includes(cliente) &&
      r.cpf.toLowerCase().includes(cpf) &&
      r.vendedor.toLowerCase().includes(vendedor) &&
      r.produto.toLowerCase().includes(produto)
    );

    renderizarTabela(filtrados);
  }

  [filtroCliente, filtroCPF, filtroVendedor, filtroProduto].forEach(input => {
    input.addEventListener('input', aplicarFiltros);
  });

  function renderizarTabela(lista) {
    tabelaBody.innerHTML = '';

    lista.forEach((r, index) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${r.cliente}</td>
        <td>${r.cpf}</td>
        <td>${r.vendedor}</td>
        <td>${r.produto}</td>
        <td>${r.data}</td>
        <td><button class="btn-ver" data-index="${index}">Ver Recibo</button></td>
      `;

      tabelaBody.appendChild(tr);
    });

    document.querySelectorAll('.btn-ver').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = e.target.dataset.index;
        abrirModal(lista[i]);
      });
    });
  }

  function abrirModal(dados) {
    modalContent.innerHTML = `
      <h2>Recibo</h2>
      <p><strong>Cliente:</strong> ${dados.cliente}</p>
      <p><strong>CPF:</strong> ${dados.cpf}</p>
      <p><strong>Vendedor:</strong> ${dados.vendedor}</p>
      <p><strong>Produto:</strong> ${dados.produto}</p>
      <p><strong>Data:</strong> ${dados.data}</p>
    `;
    modal.style.display = 'flex';
  }

  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target == modal) {
      modal.style.display = 'none';
    }
  });
});
