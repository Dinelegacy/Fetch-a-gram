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
        <div class="likes-container">
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
      


    <div class="carousel">

      <button id="prev-popup" class="popup-nav">&#10094;</button>
      <button id="next-popup" class="popup-nav">&#10095;</button>

    </div>

    `;
   

  document.body.appendChild(popup);

  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");
  const likeBtn = popup.querySelector("#like-btn");
  const iconSpan = likeBtn.querySelector(".icon");
  const countSpan = likeBtn.querySelector(".count");
  const prevBtn = popup.querySelector("#prev-popup");
  const nextBtn = popup.querySelector("#next-popup");
  const popupRight = popup.querySelector(".popup-right");

  let currentImageId = null;
  let currentIndex = 0;
  let photosArray = [];
  const changedLikes = new Set();

  // -------------------
  // Close popup
  // -------------------
  closeBtn.addEventListener("click", async () => {
    popup.classList.add("hidden");
    body.classList.remove('popup-open'); // Anna: re-enable background scroll when popup is closed

    if (changedLikes.size > 0) {
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

  changedLikes.add(id);
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
// Update feed DOM + local data
// -------------------
async function updateLikeCountInFeed(id, newCount) {
  const card = document.querySelector(`.photo-card[data-photo-id="${id}"]`);
  if (card) {
    const likeSpan = card.querySelector(".likes");
    if (likeSpan) {
      likeSpan.innerHTML = `${likeIcon} ${newCount} ${newCount === 1 ? "Like" : "Likes"}`;
    }
  }

  const photo = window.__allPhotos?.find(p => p.id === id);
  if (photo) photo.likes_count = newCount;
}

// -------------------
// Update popup content
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

    renderComments(photo, popupRight); // ✅ комментарии
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

// -------------------
// Public function: open popup
// -------------------
return function openPopup(index, allPhotos) { // Anna: modified to accept allPhotos
  photosArray = allPhotos;
  currentIndex = index;
  const photo = photosArray[currentIndex];

  currentImageId = photo.id;
  popupImg.src = photo.src;

  popup.classList.remove("hidden");
  body.classList.add('popup-open');// Anna: prevent background scroll when popup is open

  updatePopupContent();
};
}
