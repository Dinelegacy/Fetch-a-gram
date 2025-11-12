// Yordanos header toggle

export default function setupHeader() {
  const header   = document.getElementById('site-header');
  const btnAuto  = document.getElementById('btn-auto');
  const btnDark  = document.getElementById('btn-dark');
  const btnLight = document.getElementById('btn-light');
  if (!header || !btnAuto || !btnDark || !btnLight) return;

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  let mode = 'auto'; // default

  function setActive() {
    [btnAuto, btnDark, btnLight].forEach(b => b.classList.remove('is-active'));
    if (mode === 'auto') btnAuto.classList.add('is-active');
    if (mode === 'dark') btnDark.classList.add('is-active');
    if (mode === 'light') btnLight.classList.add('is-active');
  }

  function apply() {
    document.body.classList.remove('dark-mode');
    header.classList.remove('header--auto');

    if (mode === 'auto') {
      if (mql.matches) document.body.classList.add('dark-mode'); // follow system
      header.classList.add('header--auto');                       // light-blue header
    }
    if (mode === 'dark') document.body.classList.add('dark-mode');

    setActive();
  }

  mql.addEventListener('change', () => { if (mode==='auto') apply(); });
  btnAuto.addEventListener('click',  () => { mode='auto';  apply(); });
  btnDark.addEventListener('click',  () => { mode='dark';  apply(); });
  btnLight.addEventListener('click', () => { mode='light'; apply(); });

  apply(); // first paint
}