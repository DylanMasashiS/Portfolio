const button = document.getElementById('toggleTheme');
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.add(currentTheme);

button.onclick = () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');

  const newTheme = document.body.classList.contains('dark') ? 'dark' : 'light';
  localStorage.setItem('theme', newTheme);
};
