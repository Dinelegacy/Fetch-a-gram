export default function setupFeed(openPopup) {
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return;

  let page = 1;

  async function fetchPhotos(page) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`);
      const data = await res.json();

      return data.data.map(p => ({
        src: p.image_url,
        likes_count: p.likes_count ?? 0,
        comments: Array.isArray(p.comments) ? p.comments : [],
      }));
    } catch (err) {
      console.error("Error loading API:", err);
      return [];
    }
  }

  function renderPhotos(photos) {
    photos.forEach(p => {
      const card = document.createElement("div");
      card.className = "photo-card";

      const img = document.createElement("img");
      img.src = p.src;
      img.alt = "photo";

      // 👉 теперь при клике открываем попап
      img.addEventListener("click", () => openPopup(p.src));

      const actions = document.createElement("div");
      actions.className = "actions";

      const likeInfo = document.createElement("span");
      likeInfo.className = "likes";
      likeInfo.textContent = `❤️ ${p.likes_count} Likes`;

      const commentsCount = p.comments.length;
      const commentsInfo = document.createElement("span");
      commentsInfo.className = "comments-info";
      commentsInfo.textContent = `💬 ${commentsCount} ${commentsCount === 1 ? 'Comment' : 'Comments'}`;

      actions.appendChild(likeInfo);
      actions.appendChild(commentsInfo);

      card.appendChild(img);
      card.appendChild(actions);
      section.appendChild(card);
    });
  }

  async function load() {
    const photos = await fetchPhotos(page);
    renderPhotos(photos);
  }

  load();

  loadMoreBtn.addEventListener("click", () => {
    page++;
    load();
  });
}
