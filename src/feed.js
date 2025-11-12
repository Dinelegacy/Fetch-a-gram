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

      // old version:
      
      // img.addEventListener("click", () =>
      //   openPopup(i, allPhotos.map(x => ({ id: x.id, src: x.src, comments: x.comments })))
      // ); //       In this version, the problem was that the click event used the wrong index. 
      // When new photos were loaded, each new group of photos started counting again from zero (i = 0, 1, 2...).
      // So when you clicked a new photo, the popup opened an old photo from the first group — because it used that small index (0, 1, 2) instead of the real position in the full list.


      // new version:
      const globalIndex = allPhotos.length;

      img.addEventListener("click", () =>
        openPopup(
          globalIndex,
          allPhotos.map(x => ({ id: x.id, src: x.src, comments: x.comments }))
        )
      );
      // In the fixed version, we use the real index in the full list of all photos — not just in the small group we just loaded.
      // We get this correct index using allPhotos.length before adding the new photo.
      // That number tells us the true position of the photo in the full array.

      // So now, when you click any photo — old or new —
      // the popup opens the correct image, because it knows exactly where that photo is in the whole list.

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
