// Yordanos header toggle 
export default function setupHeader() {
  const header   = document.getElementById('site-header');
  const btnAuto  = document.getElementById('btn-auto');
  const btnDark  = document.getElementById('btn-dark');
  const btnLight = document.getElementById('btn-light');
  if (!header || !btnAuto || !btnDark || !btnLight) return;

  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const storageKey = 'fetchagram-theme';

  function loadMode() {
    return localStorage.getItem(storageKey) || 'auto';
  }
  function saveMode(v) {
    localStorage.setItem(storageKey, v);
  }

  let mode = loadMode();

  function setActive() {
    const buttons = [btnAuto, btnDark, btnLight];
    buttons.forEach(b => {
      const active = (
        (b === btnAuto  && mode === 'auto') ||
        (b === btnDark  && mode === 'dark') ||
        (b === btnLight && mode === 'light')
      );
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-selected', String(active));
    });
  }

  function apply() {
    document.body.classList.remove('dark-mode');
    header.classList.remove('header--auto');

    if (mode === 'auto') {
      if (mql.matches) document.body.classList.add('dark-mode'); // follow system
      header.classList.add('header--auto');                       // light-blue header tint
    } else if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    }
    // light mode = no dark-mode class

    setActive();
    saveMode(mode);
  }

  // React to OS changes only when in auto
  const onSystemChange = () => { if (mode === 'auto') apply(); };
  if (mql.addEventListener) mql.addEventListener('change', onSystemChange);
  else mql.addListener(onSystemChange); // Safari <14 fallback

  // Wire buttons
  btnAuto.addEventListener('click',  () => { mode = 'auto';  apply(); });
  btnDark.addEventListener('click',  () => { mode = 'dark';  apply(); });
  btnLight.addEventListener('click', () => { mode = 'light'; apply(); });

  apply(); // first paint
}
