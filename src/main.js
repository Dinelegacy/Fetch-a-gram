// import './style.css';

// // 🌙 Dark / Light toggle (keep as-is)
// const toggleBtn = document.getElementById('theme-toggle');
// toggleBtn.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
//   const dark = document.body.classList.contains('dark-mode');
//   toggleBtn.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
// });

// // then 9 more each click
// const section = document.getElementById('section1');
// const loadMoreBtn = document.getElementById('load-more');

// let page = 1;
// const limit = 9;

// // Fetch photos
// async function fetchPhotos(page, limit) {
//   try {
//     const res = await fetch(`https://image-feed-api.vercel.app/photos?limit=${limit}&page=${page}`);
//     if (!res.ok) throw new Error('Bad response');
//     const data = await res.json();

//     // Normalize common fields
//     return data.map(p => ({
//       src: p.url || p.download_url || p.src || p.image || '',
//       alt: p.title || p.description || 'photo'
//     })).filter(p => p.src);
//   } catch (e) {
//     // Fallback so you still see images
//     return Array.from({ length: limit }, (_, i) => ({
//       src: `https://picsum.photos/seed/${page}-${i}/600/400`,
//       alt: 'placeholder'
//     }));
//   }
// }

// // Render simple <img> tags
// function renderPhotos(photos) {
//   photos.forEach(p => {
//     const img = document.createElement('img');
//     img.src = p.src;
//     img.alt = p.alt;
//     img.className = 'photo-card';
//     section.appendChild(img);
//   });
// }

// // First 9
// (async () => {
//   const photos = await fetchPhotos(page, limit);
//   renderPhotos(photos);
// })();

// // Show 9 more each click
// loadMoreBtn.addEventListener('click', async () => {
//   page += 1;
//   const photos = await fetchPhotos(page, limit);
//   renderPhotos(photos);
// });
import './style.css';
import setupHeader from './header.js';
import setupFeed from './feed.js';

setupHeader();
setupFeed();
