// Carrega o menu.html dinamicamente
fetch('../../Menu/menu.')
  .then(response => response.text())
  .then(data => {
    document.body.insertAdjacentHTML('afterbegin', data);

    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('aberto');
    });
  });
