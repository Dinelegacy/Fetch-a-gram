
import './style.css';
import setupHeader from './header.js';
import setupFeed from './feed.js';

import setupPopup from './popup.js';
const openPopup = setupPopup();

setupHeader();
setupFeed(openPopup);
