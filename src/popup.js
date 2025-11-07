import likeIcon from './icons/heart-solid-full.svg?raw';
export default function setupPopup() {
  const popup = document.createElement("div");
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
  <div class="like-box" onclick="likeFunction()">
    <div>
    <button id="like-btn" class="like-button">
      <span class="icon"></span> 
      <span class="count">0 Likes</span>
    </button>
  </div>
</div>
      </div>
      

    <button id="prev-popup" class="popup-nav">&#10094;</button>
    <button id="next-popup" class="popup-nav">&#10095;</button>
  `;

  document.body.appendChild(popup);

  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");
  const likeBtn = popup.querySelector("#like-btn");
  const iconSpan = likeBtn.querySelector(".icon");
  const countSpan = likeBtn.querySelector(".count");
  const prevBtn = popup.querySelector("#prev-popup");
  const nextBtn = popup.querySelector("#next-popup");
  let currentImageId = null;
  let userHasLiked = false;
  let currentIndex = 0;
  let photosArray = [];



  closeBtn.addEventListener("click", async () => {
    popup.classList.add("hidden");
    if (currentImageId) {
      await refreshSingleImage(currentImageId);
    }
  });

  // ✅ Handle like click inside popup
  likeBtn.addEventListener("click", async () => {
    if (!currentImageId) return;
    await likeImage(currentImageId);
  });
  // ✅ Like image via API and update popup + feed instantly
  async function likeImage(id) {

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

      // ✅ Update feed immediately
      await updateLikeCountInFeed(id, count);
    }
    else {
      console.error("Failed to update like:", data);
    }


  }

  // // ✅ Fetch single image data from API and update its likes in feed
  async function refreshSingleImage(id) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}`);
      const p = await res.json();

      if (!p) return;
      updateLikeCountInFeed(p.id, p.likes_count ?? 0);
    } catch (err) {
      console.error("Error refreshing image:", err);
    }

  }

  // ✅ Directly update the `.likes` span in the feed
  async function updateLikeCountInFeed(id, newCount) {
    const likeSpan = document.querySelector(`img[id="${id}"] ~ .actions .likes`);
    if (likeSpan) {
      likeSpan.innerHTML = `${likeIcon} ${newCount} ${newCount === 1 ? "Like" : "Likes"}`;
    } else {
      console.warn(`Like span not found for image id: ${id}`);
    }
  }


  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photosArray.length) % photosArray.length;
    popupImg.src = photosArray[currentIndex];
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photosArray.length;
    popupImg.src = photosArray[currentIndex];
  });

  return function openPopup(index, allPhotos, src, likes = 0, id) {
    currentImageId = id;
    userHasLiked = false;
    currentIndex = index;
    photosArray = allPhotos.map(photo => photo.src || photo.url || photo);
    popupImg.src = photosArray?.[currentIndex] || src;
    const cleanIcon = likeIcon.replace(/\n/g, '');
    iconSpan.innerHTML = cleanIcon;

    const svgEl = iconSpan.querySelector("svg");
    if (svgEl) svgEl.style.fill = "black";

    countSpan.textContent = `${likes} ${likes === 1 ? "Like" : "Likes"}`;
    popupImg.onload = () => {

      popup.classList.remove("hidden");
    };
  }
  return openPopup;

}