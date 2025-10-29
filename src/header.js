// Handles the Dark/Light toggle in the header
export default function setupHeader() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const dark = document.body.classList.contains('dark-mode');
    toggleBtn.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}
