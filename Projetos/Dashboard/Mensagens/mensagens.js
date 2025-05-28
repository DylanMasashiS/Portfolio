// Mensagens simuladas
const mensagens = [
  {
    remetente: 'RH - Carla',
    hora: '2024-05-26 09:30',
    conteudo: 'Agendada uma entrevista para amanhã às 14h com o candidato João Silva.'
  },
  {
    remetente: 'Limpeza - Ana',
    hora: '2024-05-26 10:15',
    conteudo: 'Acabaram os produtos de limpeza do estoque. Precisamos repor.'
  },
  {
    remetente: 'Vendas - Paulo',
    hora: '2024-05-26 11:05',
    conteudo: 'Cliente deseja fechar uma venda com preço abaixo da tabela. Pode liberar?'
  },
  {
    remetente: 'Financeiro - Bruno',
    hora: '2024-05-26 12:00',
    conteudo: 'Preciso de aprovação para pagamento da fatura do fornecedor X.'
  },
  {
    remetente: 'Marketing - Júlia',
    hora: '2024-05-26 13:30',
    conteudo: 'Campanha de redes sociais finalizada. Aguardando aprovação.'
  }
];

// Ordena cronologicamente (mais recente no topo)
mensagens.sort((a, b) => new Date(b.hora) - new Date(a.hora));

const container = document.getElementById('containerMensagens');
const popup = document.getElementById('popup');
const detalhes = document.getElementById('detalhesMensagem');
const closePopup = document.getElementById('closePopup');

// Renderiza os bilhetes
function renderizarMensagens() {
  container.innerHTML = '';
  mensagens.forEach((m, index) => {
    const div = document.createElement('div');
    div.classList.add('mensagem');
    div.innerHTML = `
      <div class="remetente">${m.remetente}</div>
      <div class="hora">${m.hora}</div>
      <div class="resumo">${m.conteudo.substring(0, 60)}...</div>
    `;
    div.onclick = () => abrirPopup(index);
    container.appendChild(div);
  });
}

// Abre popup
function abrirPopup(index) {
  const m = mensagens[index];
  detalhes.innerHTML = `
    <p><strong>Remetente:</strong> ${m.remetente}</p>
    <p><strong>Data/Hora:</strong> ${m.hora}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${m.conteudo}</p>
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

// Inicializa
renderizarMensagens();
