import likeIcon from './icons/heart-solid-full.svg?raw';
import commentIcon from './icons/comment-solid-full.svg?raw';
import { fetchPhotos, refreshLikesForPhotos } from './feed.helpers.js';

const loaderElement = document.querySelector('.lds-ripple-container');

export default function setupFeed(openPopup) {
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return;

  let page = 1;
  let allPhotos = [];
  window.__allPhotos = allPhotos; // required by current likes.js

  function renderPhotos(photos) {
    photos.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "photo-card";
      card.dataset.photoId = p.id;

      const img = document.createElement("img");
      img.id = p.id;
      img.src = p.src;
      img.alt = "photo";
      img.addEventListener("click", () =>
        openPopup(i, allPhotos.map(x => ({ id: x.id, src: x.src, comments: x.comments })))
      );

      const actions = document.createElement("div");
      actions.className = "actions";

      const likeInfo = document.createElement("span");
      likeInfo.className = "likes";
      likeInfo.innerHTML = `${likeIcon} ${p.likes_count} Likes`;

      const commentsCount = Array.isArray(p.comments) ? p.comments.length : 0;
      const commentsInfo = document.createElement("span");
      commentsInfo.className = "comments-info";
      commentsInfo.innerHTML = `${commentIcon} ${commentsCount} ${commentsCount === 1 ? 'Comment' : 'Comments'}`;

      actions.appendChild(likeInfo);
      actions.appendChild(commentsInfo);
      card.appendChild(img);
      card.appendChild(actions);
      section.appendChild(card);

      allPhotos.push(p);
    });
  }

  async function load() {
    loadMoreBtn.style.opacity = "0";
    await new Promise(requestAnimationFrame);

    const photos = [
      ...await fetchPhotos(page),
      ...await fetchPhotos(page + 1),
      ...await fetchPhotos(page + 2)
    ];
    const updated = await refreshLikesForPhotos(photos);
    renderPhotos(updated);

    loaderElement?.remove();
    loadMoreBtn.style.opacity = "1";
  }

  load();

  loadMoreBtn.addEventListener("click", () => {
    page += 3;
    load();
  });
}
