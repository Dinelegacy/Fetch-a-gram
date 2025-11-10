import { renderComments } from './comments.js';
import likeIcon from './icons/heart-solid-full.svg?raw';

export default function setupPopup() {
  const popup = document.createElement("div");
  const body = document.body;

  popup.id = "Image-popup";
  popup.className = "hidden";

  popup.innerHTML = `
    <div class="popup-card">
      <span id="close-popup">&times;</span>

      <div class="popup-left">
        <img id="popup-img" src="" alt="popup image">
      </div>

      <div class="popup-right">
        <h3>Post Info</h3>
        <div>
          <button id="like-btn" class="like-button">
            <span class="icon"></span> 
            <span class="count">0 Likes</span>
          </button>
        </div>
      </div>

      <button id="prev-popup" class="popup-nav">&#10094;</button>
      <button id="next-popup" class="popup-nav">&#10095;</button>
    </div>
  `;

  // TODO: delete old elements:
  // <h3>Post Info</h3>
  // <p>(This space is for Anna and Saheena to add likes and comments 😍 )</p> 

  document.body.appendChild(popup);

  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");
  const likeBtn = popup.querySelector("#like-btn");
  const iconSpan = likeBtn.querySelector(".icon");
  const countSpan = likeBtn.querySelector(".count");
  const prevBtn = popup.querySelector("#prev-popup");
  const nextBtn = popup.querySelector("#next-popup");

  let currentImageId = null;
  let currentIndex = 0;
  let photosArray = [];
  let changedLikes = new Set(); // Track liked images in popup

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    body.classList.remove('popup-open'); // Anna: re-enable background scroll when popup is closed
  });

    if (changedLikes.size > 0) {
      // Refresh only images that changed
      await Promise.all([...changedLikes].map(id => refreshSingleImage(id)));
      changedLikes.clear();
    }
  });

  // -------------------
  // Like button click
  // -------------------
  likeBtn.addEventListener("click", async () => {
    if (!currentImageId) return;
    await likeImage(currentImageId);
  });

  // -------------------
    // Like image via API
    // -------------------
    async function likeImage(id) {
      try {
        const response = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/like`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        if (data.success) {
          const count = data.likes_count ?? 0;
          countSpan.textContent = `${count} ${count === 1 ? "Like" : "Likes"}`;

          const svgEl = iconSpan.querySelector("svg");
          if (svgEl) svgEl.style.fill = "red";

          // mark as changed
          changedLikes.add(id);

        // Update feed DOM immediately
        await updateLikeCountInFeed(id, count);
      }
    } catch (err) {
      console.error("Error liking image:", err);
    }
  }

  // -------------------
  // Refresh feed image
  // -------------------
  async function refreshSingleImage(id) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}`);
      const p = await res.json();
      if (!p) return;
      updateLikeCountInFeed(p.id, p.likes_count ?? 0);
    } catch (err) {
      console.error(err);
    }
  }

  // -------------------
  // Update feed DOM + shared array
  // -------------------
  async function updateLikeCountInFeed(id, newCount) {
    const likeSpan = document.querySelector(`img[id="${id}"] ~ .actions .likes`);
    if (likeSpan) {
      likeSpan.innerHTML = `${likeIcon} ${newCount} ${newCount === 1 ? "Like" : "Likes"}`;
    }

    // Update shared array for next popup open
    const photo = window.__allPhotos?.find(p => p.id === id);
    if (photo) photo.likes_count = newCount;
  }

  // -------------------
  //   Update popup content (prev/next)
  // -------------------
  async function updatePopupContent() {
    const photo = photosArray[currentIndex];
    if (!photo) return;

    popupImg.src = photo.src;
    currentImageId = photo.id;

    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images/${currentImageId}`);
      const data = await res.json();
      const count = data.likes_count ?? 0;

      countSpan.textContent = `${count} ${count === 1 ? "Like" : "Likes"}`;
      const cleanIcon = likeIcon.replace(/\n/g, '');
      iconSpan.innerHTML = cleanIcon;

      const svgEl = iconSpan.querySelector("svg");
      if (svgEl) svgEl.style.fill = "black";
    } catch (err) {
      console.error(err);
    }
  }

  // -------------------
  // Navigation buttons
  // -------------------
  prevBtn.addEventListener("click", async () => {
    currentIndex = (currentIndex - 1 + photosArray.length) % photosArray.length;
    await updatePopupContent();
  });

  nextBtn.addEventListener("click", async () => {
    currentIndex = (currentIndex + 1) % photosArray.length;
    await updatePopupContent();
  });

  return function openPopup(index, allPhotos) { // Anna: modified to accept allPhotos
    const photo = allPhotos[index];
    console.log("Opening popup for photo:", photo); //
    currentIndex = index;
    photosArray = allPhotos.map(photo => photo.src || photo.url || photo);
    popupImg.src = photo.src;
    popup.classList.remove("hidden");
    body.classList.add('popup-open'); // Anna: prevent background scroll when popup is open
    const popupRight = popup.querySelector('.popup-right');
    console.log('Opening popup for photo:', photo);
    renderComments(photo, popupRight); // Anna: render comments in the popup right section
  };
}



  // -------------------
  // Public openPopup
  // -------------------
  return function openPopup(index, allPhotos) {
    photosArray = allPhotos;
    currentIndex = index;
    currentImageId = photosArray[currentIndex].id;

    const currentPhoto = photosArray[currentIndex];
    countSpan.textContent = `${currentPhoto.likes_count} ${currentPhoto.likes_count === 1 ? "Like" : "Likes"}`;

    const cleanIcon = likeIcon.replace(/\n/g, '');
    iconSpan.innerHTML = cleanIcon;
    const svgEl = iconSpan.querySelector("svg");
    if (svgEl) svgEl.style.fill = "black";

    popupImg.src = currentPhoto.src;

    // Show popup after image loads (but only if not manually closed)
popup.classList.remove("hidden"); // show popup immediately
updatePopupContent();
  };
}
