import { renderComments } from './comments.js';
import { likeImage, refreshSingleImage, updateLikeCountInFeed } from './likes.js';
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
      </div>
      <!-- Jalal: added carousel wrapper for navigation buttons -->
        <button id="prev-popup" class="popup-nav">&#10094;</button>
        <button id="next-popup" class="popup-nav">&#10095;</button>
  `;
  document.body.appendChild(popup);
  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");
  const likeBtn = popup.querySelector("#like-btn");
  const iconSpan = likeBtn.querySelector(".icon"); // Sahee - for like icon
  const countSpan = likeBtn.querySelector(".count"); // Sahee - for like count
  const prevBtn = popup.querySelector("#prev-popup");
  const nextBtn = popup.querySelector("#next-popup");
  const popupRight = popup.querySelector(".popup-right");
  let currentImageId = null;
  let currentIndex = 0;
  let photosArray = [];
  const changedLikes = new Set(); // Sahee - track changed likes
  // -------------------
  // Close popup
  // -------------------
  closeBtn.addEventListener("click", async () => {
    popup.classList.add("hidden");
    body.classList.remove('popup-open'); // Anna: re-enable background scroll when popup is closed
    if (changedLikes.size > 0) { // Sahee - refresh feed if likes changed
      await Promise.all([...changedLikes].map(id => refreshSingleImage(id, updateLikeCountInFeed)));
      changedLikes.clear();
    }
  });
  // -------------------
  // Like button click // Sahee
  // -------------------
  likeBtn.addEventListener("click", async () => {
    if (!currentImageId) return;
    await likeImage(currentImageId, iconSpan, countSpan, changedLikes, updateLikeCountInFeed); // Sahee
  });
  // -------------------
  // Update popup content
  // -------------------
  async function updatePopupContent() {
    const photo = photosArray[currentIndex];
    if (!photo) return;
    popupImg.src = photo.src;
    currentImageId = photo.id;
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images/${currentImageId}`); // Sahee - fetch latest likes
      const data = await res.json(); // Sahee - get latest data
      const count = data.likes_count ?? 0; // Sahee - use latest likes count
      countSpan.textContent = `${count} ${count === 1 ? "Like" : "Likes"}`; // Sahee - update like count text
      const cleanIcon = likeIcon.replace(/\n/g, ''); // Sahee - clean up SVG
      iconSpan.innerHTML = cleanIcon; // Sahee - set like icon
      const svgEl = iconSpan.querySelector("svg"); // Sahee - set icon color based on like status
      if (svgEl) svgEl.style.fill = "black"; // Sahee - default color
      renderComments(photo, popupRight); // :white_check_mark: comments
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
  return function openPopup(index, allPhotos) {
    photosArray = allPhotos;
    currentIndex = index;
    const photo = photosArray[currentIndex];
    currentImageId = photo.id;
    popupImg.src = photo.src;
    popup.classList.remove("hidden");
    body.classList.add('popup-open'); // Anna: prevent background scroll when popup is open
    updatePopupContent();
  };
}