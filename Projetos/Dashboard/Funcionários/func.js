function mostrarGrafico(tipo) {
  const online = document.getElementById('grafico-online');
  const fisico = document.getElementById('grafico-fisico');
  const tabs = document.querySelectorAll('.tab');

  if (tipo === 'online') {
    online.style.display = 'block';
    fisico.style.display = 'none';
  } else {
    online.style.display = 'none';
    fisico.style.display = 'block';
  }

  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`.tab[onclick*="${tipo}"]`).classList.add('active');
}
