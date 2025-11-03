export default function setupFeed() {
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return;

  let page = 1;
  const limit = 6; // start with 6

  // Fetch images from API
  async function fetchPhotos(page) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/photos?limit=${limit}&page=${page}`);
      const data = await res.json();

      return data.data.map(p => ({
        id:p.id,
        src: p.image_url,
        likes_count: p.likes_count ?? 0,
        comments: Array.isArray(p.comments) ? p.comments : [],
      }));
    } catch (err) {
      console.error("Error loading API:", err);
      return [];
    }
  }

  // Render the photo cards
  function renderPhotos(photos) {
    photos.forEach(p => {
      const card = document.createElement("div");
      card.className = "photo-card";

      // Image
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt;

      // ✅ When clicked, open popup with image, likes, and comments
      img.addEventListener("click", () => {
        openPopup(p.src, p.likes_count, p.comments,p.id);
      });

      // Actions section under each image
      const actions = document.createElement("div");
      actions.className = "actions";

      const likeInfo = document.createElement("span");
      likeInfo.className = "likes";
      likeInfo.textContent = `❤️ ${p.likes_count} ${p.likes_count === 1 ? "Like" : "Likes"}`;

      const commentsCount = p.comments.length;
      const commentsInfo = document.createElement("span");
      commentsInfo.className = "comments-info";
      commentsInfo.textContent = `💬 ${commentsCount}${commentsCount === 1 ? "Comment" : "Comments"}`;

      actions.appendChild(likeInfo);
      actions.appendChild(commentsInfo);

      // Combine all parts
      card.appendChild(img);
      card.appendChild(actions);
      card.appendChild(comments);
      section.appendChild(card);
    });
  }

  // Load photos for the current page
  async function load() {
    const photos = await fetchPhotos(page, limit);
    renderPhotos(photos);
  }

  // Initial load
  load();

  // Load more button
  loadMoreBtn.addEventListener("click", () => {
    page += 1;
    load();
  });
}
