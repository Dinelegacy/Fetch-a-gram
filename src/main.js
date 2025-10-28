import './style.css'
// header Yordanos

// Select the toggle button
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const dark = document.body.classList.contains("dark-mode");
  toggleBtn.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
});



