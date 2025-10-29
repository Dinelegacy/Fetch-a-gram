
const photoList = document.querySelector(".photo-list");
const showMoreBtn = document.querySelector(".show-more-btn");

let currentPage = 1;
const maxPages = 20;

async function fetchImages(page = 1) {
  try {
    const res = await fetch(`/api/images?page=${page}`);
    const data = await res.json();

    if (!data.data) {
      console.error("No image data found");
      return;
    }

    renderImages(data.data);
  } catch (err) {
    console.error("Error fetching images:", err);
  }
}

function renderImages(images) {
  images.forEach((img) => {
    const li = document.createElement("li");
    li.classList.add("photo-item");

    li.innerHTML = `
      <img src="${img.image_url}" alt="Photo" />
      <div class="photo-info">
        <p>❤️ ${img.likes_count} Likes</p>
        <ul class="comments">
          ${img.comments
            .map(
              (c) => `<li><strong>${c.commenter_name}:</strong> ${c.comment}</li>`
            )
            .join("")}
        </ul>
      </div>
    `;

    photoList.appendChild(li);
  });
}

// Handle "Show more" pagination
showMoreBtn.addEventListener("click", () => {
  if (currentPage < maxPages) {
    currentPage++;
    fetchImages(currentPage);
  } else {
    showMoreBtn.disabled = true;
    showMoreBtn.textContent = "No more images";
  }
});

// Initial fetch on page load
fetchImages();
