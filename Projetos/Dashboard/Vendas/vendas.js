function mostrarGrafico(tipo) {
  const departamentos = document.getElementById('grafico-departamentos');
  const produtos = document.getElementById('grafico-produtos');
  const tabs = document.querySelectorAll('.tab');

  if (tipo === 'departamentos') {
    departamentos.style.display = 'block';
    produtos.style.display = 'none';
  } else {
    departamentos.style.display = 'none';
    produtos.style.display = 'block';
  }

  tabs.forEach(tab => tab.classList.remove('active'));
  document.querySelector(`.tab[onclick*="${tipo}"]`).classList.add('active');
}
