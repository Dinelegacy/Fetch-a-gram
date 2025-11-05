import likeIcon from './icons/heart-solid-full.svg?raw';

export default function setupPopup() {
  const popup = document.createElement("div");
  popup.id = "Image-popup";
  popup.className = "hidden";

  popup.innerHTML = `
    <span id="close-popup">&times;</span>
    <img id="popup-img" src="" alt="popup image">
    <div class="side-panel">
      <button id="like-btn" class="like-button">
        <span class="icon"></span> <span class="count">0 Likes</span>
      </button>
    </div>
  `;

  document.body.appendChild(popup);

  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");
  const likeBtn = popup.querySelector("#like-btn");
  const iconSpan = likeBtn.querySelector(".icon");
  const countSpan = likeBtn.querySelector(".count");

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });  //1. for the likes to be reflected in feed , should we reload the page or the section,else feed will still show old like count

  let currentImageId = null;
  let userHasLiked = false; 

  function openPopup(src, likes = 0, id) {
    currentImageId = id;
    userHasLiked = false; 
    popupImg.src = src;

    const cleanIcon = likeIcon.replace(/\n/g, '');
    iconSpan.innerHTML = cleanIcon;

    const svgEl = iconSpan.querySelector("svg");
    if (svgEl) svgEl.style.fill = "black";

    countSpan.textContent = `${likes} ${likes === 1 ? "Like" : "Likes"}`;

    popupImg.onload = () => {
      popup.classList.remove("hidden");
    };
  }

  likeBtn.addEventListener("click", () => {
    //if (!currentImageId || userHasLiked) return;
    //userHasLiked = true; 
    likeImage(currentImageId);
  });

  async function likeImage(id) {
    try {
      const response = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.success) {
        const count = data.likes_count ?? 0;
        countSpan.textContent = `${count} ${count === 1 ? "Like" : "Likes"}`;
        const svgEl = iconSpan.querySelector("svg");
        if (svgEl) svgEl.style.fill = "red";
      } else {
        console.error("Failed to update like:", data);
      }
    } catch (err) {
      console.error("Error liking image:", err);
    }
  }

  return openPopup;
}

 
// 2. mark as clicked if user already clicked? (if so remove comments at 52,53), check if its okay or multiple likes allowed