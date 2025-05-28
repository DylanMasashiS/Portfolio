const toggle = document.getElementById('toggle2FA');
const status = document.getElementById('status');

toggle.addEventListener('change', () => {
  if (toggle.checked) {
    status.textContent = "Dois Fatores Ativado";
  } else {
    status.textContent = "Dois Fatores Desativado";
  }
});
