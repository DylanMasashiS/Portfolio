// Carrega as mensagens do JSON local
fetch('mensagens.json')
  .then(response => response.json())
  .then(mensagens => {
    const container = document.getElementById('containerMensagens');

    mensagens.forEach(msg => {
      const div = document.createElement('div');
      div.classList.add('mensagem');

      // Adiciona classe de cor conforme urgência
      if (msg.urgente) {
        div.classList.add('vermelho');
      } else {
        div.classList.add('verde');
      }

      // Conteúdo do bilhete (somente nome e departamento)
      div.innerHTML = `
        <p>${msg.remetente}</p>
        <p>${msg.departamento}</p>
      `;

      div.dataset.id = msg.id;

      // Evento de clique abre o popup com detalhes
      div.addEventListener('click', () => abrirPopup(msg));

      container.appendChild(div);
    });
  });

// Função para abrir o popup
function abrirPopup(msg) {
  const detalhes = document.getElementById('detalhesMensagem');
  detalhes.innerHTML = `
    <h2>${msg.remetente}</h2>
    <p><strong>Data:</strong> ${msg.data}</p>
    <p><strong>Hora:</strong> ${msg.hora}</p>
    <p><strong>Departamento:</strong> ${msg.departamento}</p>
    <p><strong>Mensagem:</strong> ${msg.conteudo}</p>
    <p><strong>Urgente:</strong> ${msg.urgente ? 'Sim' : 'Não'}</p>
  `;

  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
}

// Fecha o popup
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
});

// Fecha popup clicando fora
window.addEventListener('click', (e) => {
  if (e.target.id === 'popup') {
    document.getElementById('popup').style.display = 'none';
  }
});
