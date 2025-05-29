// Carrega as mensagens do JSON local
fetch('mensagens.json')
  .then(response => response.json())
  .then(mensagens => {
    const container = document.getElementById('containerMensagens');

    mensagens.forEach(msg => {
      const div = document.createElement('div');
      div.classList.add('mensagem');
      div.dataset.id = msg.id;

      div.innerHTML = `
        <div class="remetente">${msg.remetente}</div>
        <div class="hora">${msg.hora}</div>
        <div class="conteudo">${msg.urgente ? '🚨 Urgente' : 'Mensagem'}</div>
      `;

      div.addEventListener('click', () => abrirPopup(msg));

      container.appendChild(div);
    });
  });

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
  popup.style.display = 'flex'; // Aqui ele abre
}

// Fecha o popup
document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target.id === 'popup') {
    document.getElementById('popup').style.display = 'none';
  }
});

