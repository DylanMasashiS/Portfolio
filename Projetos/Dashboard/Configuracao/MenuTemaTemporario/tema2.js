// Aplica tema salvo no carregamento
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

// Botão do menu
const toggleTheme = document.getElementById('toggle-theme');

if (toggleTheme) {
  toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // Salvar no localStorage
    if (document.body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });
}

function trocarTema() {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}
