export default function setupPopup() {
  // Create popup container
  const popup = document.createElement("div");
  popup.id = "image-popup";
  popup.classList.add("hidden", "popup-container"); // starts hidden

  popup.innerHTML = `
    <div class="popup-content">
      <span id="close-popup" class="close-btn">&times;</span>
      <img id="popup-img" src="" alt="popup image">
      <div id="popup-actions" class="actions">
        <span id="likes">❤️ 0 Likes</span>
        <span id="comments">💬 0 Comments</span>
      </div>
    </div>
  `;

  document.body.appendChild(popup);

  // Element references
  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");
  const likesEl = popup.querySelector("#likes");
  const commentsEl = popup.querySelector("#comments");

  // ✅ Close button hides popup
  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  // ✅ Clicking outside content closes popup
  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.add("hidden");
    }
  });

  /**
   * Opens the popup dynamically (waits for image to load)
   * @param {string} src - image URL
   * @param {number} likes - number of likes
   * @param {Array} comments - comments array
   */
  function openPopup(src, likes = 0, comments = [],id) {
    // Hide first to avoid showing incomplete content
    popup.classList.add("hidden");

    // Set like/comment counts right away
    likesEl.textContent = `❤️ ${likes} ${likes === 1 ? "Like" : "Likes"}`;
    const commentCount = comments.length;
    commentsEl.textContent = `💬 ${commentCount} ${
      commentCount === 1 ? "Comment" : "Comments"
    }`;

    // Wait until image is fully loaded before showing popup
    popupImg.onload = () => {
      popup.classList.remove("hidden");
    };
    console.log("checkkkc this "+popup.id)
//event listener . when like is clicked 
 likesEl.addEventListener("click", () => {
        //likes(popupImg.id);
          likeImage(id);
      });

    // Start loading the image
    popupImg.src = src;
  }

  //write a function to get the current likes and increase on click 
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
        // Update likes count in UI
        const count = data.likes_count ?? 0;
        likesEl.textContent = `❤️ ${count} ${count === 1 ? "Like" : "Likes"}`;
      } else {
        console.error("Failed to update like:", data);
      }
    } catch (err) {
      console.error("Error liking image:", err);
    }
  }

  return openPopup;
}

