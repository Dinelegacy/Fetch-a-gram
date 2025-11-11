import { renderComments } from './comments.js';
import likeIcon from './icons/heart-solid-full.svg?raw'; // 💗 THIS IS FOR LIKE

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
        <div class="likes-container"> <!-- 💗 THIS IS FOR LIKE -->
          <button id="like-btn" class="like-button"> <!-- 💗 THIS IS FOR LIKE -->
            <span class="icon"></span>  <!-- 💗 THIS IS FOR LIKE -->
            <span class="count">0 Likes</span> <!-- 💗 THIS IS FOR LIKE -->
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
  // const likeBtn = popup.querySelector("#like-btn"); // 💗 THIS IS FOR LIKE
  // const iconSpan = likeBtn.querySelector(".icon"); // 💗 THIS IS FOR LIKE
  // const countSpan = likeBtn.querySelector(".count"); // 💗 THIS IS FOR LIKE
  const prevBtn = popup.querySelector("#prev-popup");
  const nextBtn = popup.querySelector("#next-popup");
  const popupRight = popup.querySelector(".popup-right");

  let currentImageId = null;
  let currentIndex = 0;
  let photosArray = [];
  // const changedLikes = new Set(); // 💗 THIS IS FOR LIKE

  // -------------------
  // Close popup
  // -------------------
  closeBtn.addEventListener("click", async () => {
    popup.classList.add("hidden");
    body.classList.remove('popup-open'); // Anna: re-enable background scroll when popup is closed

    // if (changedLikes.size > 0) { // 💗 THIS IS FOR LIKE
    //   await Promise.all([...changedLikes].map(id => refreshSingleImage(id))); // 💗 THIS IS FOR LIKE
    //   changedLikes.clear(); // 💗 THIS IS FOR LIKE
    // }
  });

  // -------------------
  // Like button click
  // -------------------
  // likeBtn.addEventListener("click", async () => { // 💗 THIS IS FOR LIKE
  //   if (!currentImageId) return; // 💗 THIS IS FOR LIKE
  //   await likeImage(currentImageId); // 💗 THIS IS FOR LIKE
  // });

  // -------------------
  // Like image via API
  // -------------------
  // async function likeImage(id) { // 💗 THIS IS FOR LIKE
  //   try {
  //     const response = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/like`, { // 💗 THIS IS FOR LIKE
  //       method: "POST", // 💗 THIS IS FOR LIKE
  //       headers: { "Content-Type": "application/json" }, // 💗 THIS IS FOR LIKE
  //     });
  //     const data = await response.json(); // 💗 THIS IS FOR LIKE

  //     if (data.success) { // 💗 THIS IS FOR LIKE
  //       const count = data.likes_count ?? 0; // 💗 THIS IS FOR LIKE
  //       countSpan.textContent = `${count} ${count === 1 ? "Like" : "Likes"}`; // 💗 THIS IS FOR LIKE

  //       const svgEl = iconSpan.querySelector("svg"); // 💗 THIS IS FOR LIKE
  //       if (svgEl) svgEl.style.fill = "red"; // 💗 THIS IS FOR LIKE

  //       changedLikes.add(id); // 💗 THIS IS FOR LIKE
  //       await updateLikeCountInFeed(id, count); // 💗 THIS IS FOR LIKE
  //     }
  //   } catch (err) {
  //     console.error("Error liking image:", err); // 💗 THIS IS FOR LIKE
  //   }
  // }

  // -------------------
  // Refresh feed image
  // -------------------
  // async function refreshSingleImage(id) { // 💗 THIS IS FOR LIKE
  //   try {
  //     const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}`); // 💗 THIS IS FOR LIKE
  //     const p = await res.json(); // 💗 THIS IS FOR LIKE
  //     if (!p) return; // 💗 THIS IS FOR LIKE
  //     updateLikeCountInFeed(p.id, p.likes_count ?? 0); // 💗 THIS IS FOR LIKE
  //   } catch (err) {
  //     console.error(err); // 💗 THIS IS FOR LIKE
  //   }
  // }

  // -------------------
  // Update feed DOM + local data
  // -------------------
  // async function updateLikeCountInFeed(id, newCount) { // 💗 THIS IS FOR LIKE
  //   const card = document.querySelector(`.photo-card[data-photo-id="${id}"]`); // 💗 THIS IS FOR LIKE
  //   if (card) { // 💗 THIS IS FOR LIKE
  //     const likeSpan = card.querySelector(".likes"); // 💗 THIS IS FOR LIKE
  //     if (likeSpan) { // 💗 THIS IS FOR LIKE
  //       likeSpan.innerHTML = `${likeIcon} ${newCount} ${newCount === 1 ? "Like" : "Likes"}`; // 💗 THIS IS FOR LIKE
  //     }
  //   }

  //   const photo = window.__allPhotos?.find(p => p.id === id); // 💗 THIS IS FOR LIKE
  //   if (photo) photo.likes_count = newCount; // 💗 THIS IS FOR LIKE
  // }

  // -------------------
  // Update popup content
  // -------------------
  async function updatePopupContent() {
    const photo = photosArray[currentIndex];
    if (!photo) return;

    popupImg.src = photo.src;
    currentImageId = photo.id;

    try {
      // const res = await fetch(`https://image-feed-api.vercel.app/api/images/${currentImageId}`); // 💗 THIS IS FOR LIKE
      // const data = await res.json(); // 💗 THIS IS FOR LIKE
      // const count = data.likes_count ?? 0; // 💗 THIS IS FOR LIKE

      // countSpan.textContent = `${count} ${count === 1 ? "Like" : "Likes"}`; // 💗 THIS IS FOR LIKE
      // const cleanIcon = likeIcon.replace(/\n/g, ''); // 💗 THIS IS FOR LIKE
      // iconSpan.innerHTML = cleanIcon; // 💗 THIS IS FOR LIKE

      // const svgEl = iconSpan.querySelector("svg"); // 💗 THIS IS FOR LIKE
      // if (svgEl) svgEl.style.fill = "black"; // 💗 THIS IS FOR LIKE

      renderComments(photo, popupRight); // ✅ Comments
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
    body.classList.add('popup-open'); // Anna: prevent background scroll when popup is open

    updatePopupContent();
  };
}
