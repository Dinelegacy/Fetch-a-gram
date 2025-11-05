// Handles the Dark/Light toggle in the header
export default function setupHeader() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  // dark mode by default
  document.body.classList.add('dark-mode');
  toggleBtn.textContent = '☀️ Light Mode';

  // ✅ Toggle between modes on click
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const dark = document.body.classList.contains('dark-mode');
    toggleBtn.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
  });
}
