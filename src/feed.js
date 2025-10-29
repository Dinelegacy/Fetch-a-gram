export default function setupFeed(openPopup) {
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return;

  let page = 1;
  const limit = 6; // start with 6

  async function fetchPhotos(page, limit) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/photos?limit=${limit}&page=${page}`);
      const data = await res.json();
      return data.map(p => ({
        src: p.url || p.download_url || "",
        alt: p.title || "photo",
      })).filter(p => p.src);
    } catch {
      // fallback placeholders
      return Array.from({ length: limit }, (_, i) => ({
        src: `https://picsum.photos/seed/${page}-${i}/600/400`,
        alt: "placeholder",
      }));
    }
  }

  function addComment(listEl, text) {
    const row = document.createElement("div");
    row.className = "comment";

    const content = document.createElement("span");
    content.textContent = text;

    const time = document.createElement("span");
    time.className = "comment-time";
    time.textContent = new Date().toLocaleString();

    row.appendChild(content);
    row.appendChild(time);
    listEl.appendChild(row);
  }

  function renderPhotos(photos) {
    photos.forEach(p => {
      const card = document.createElement("div");
      card.className = "photo-card";

      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt;

      // To make image clickable to open popup
img.addEventListener("click", () => {
  openPopup(img.src);
});


      // actions row
      const actions = document.createElement("div");
      actions.className = "actions";

      const likeBtn = document.createElement("button");
      likeBtn.className = "like-btn";
      likeBtn.textContent = "❤️ Like";

      const commentBtn = document.createElement("button");
      commentBtn.className = "comment-btn";
      commentBtn.textContent = "💬 Comment";

      // inline comment form (hidden until click)
      const form = document.createElement("div");
      form.className = "comment-form";
      const input = document.createElement("input");
      input.className = "comment-input";
      input.type = "text";
      input.placeholder = "Write a comment...";
      const post = document.createElement("button");
      post.textContent = "Post";
      form.appendChild(input);
      form.appendChild(post);

      actions.appendChild(likeBtn);
      actions.appendChild(commentBtn);
      actions.appendChild(form);

      // comments list (hidden until first comment)
      const comments = document.createElement("div");
      comments.className = "comments";

      // like toggle
      likeBtn.addEventListener("click", () => {
        likeBtn.textContent = likeBtn.textContent.includes("❤️") ? "🤍 Liked" : "❤️ Like";
      });

      // show/hide form
      commentBtn.addEventListener("click", () => {
        form.style.display = form.style.display === "flex" ? "none" : "flex";
      });

      // post comment
      const postComment = () => {
        const text = input.value.trim();
        if (!text) return;
        addComment(comments, text);
        input.value = "";
        comments.style.display = "block"; // show list after first comment
      };
      post.addEventListener("click", postComment);
      input.addEventListener("keydown", e => e.key === "Enter" && postComment());

      card.appendChild(img);
      card.appendChild(actions);
      card.appendChild(comments);
      section.appendChild(card);
    });
  }

  async function load() {
    const photos = await fetchPhotos(page, limit);
    renderPhotos(photos);
  }

  load(); // first 6

  loadMoreBtn.addEventListener("click", () => {
    page += 1;
    load();
  });
}
