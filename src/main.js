
import './style.css';
import setupHeader from './header.js';
import setupFeed from './feed.js';

import setupPopup from './popup.js';
const openPopup = setupPopup();

setupHeader();
setupFeed(openPopup);

async function getAll() {
    const res = await fetch('https://image-feed-api.vercel.app/api/images?page=1');
  const data = await res.json();

  console.log('📸 Full API response:', data);
}

getAll();