const form = document.getElementById('perfilForm');
const msg = document.getElementById('msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  msg.textContent = 'Dados salvos com sucesso!';
});
