export default function setupFeed(openPopup) {
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return;

  let page = 1;
  const limit = 6;

  async function fetchPhotos(page, limit) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/photos?limit=${limit}&page=${page}`);
      const data = await res.json();
      return data.map(p => ({
  src: p.url || p.download_url || "",
  alt: p.title || "photo",
  likesCount: p.likes_count || 0,      
  commentsList: p.comments || [],      
})).filter(p => p.src);

    } catch {
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

      // Image + popup
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt;
      img.addEventListener("click", () => openPopup(img.src));

      // Actions container
      const actions = document.createElement("div");
      actions.className = "actions";

      // Like button + count (Instagram style)
      let likesCount = 0;
      const likeBtn = document.createElement("button");
      likeBtn.className = "like-btn";
      likeBtn.textContent = `❤️ ${likesCount}`;

      likeBtn.addEventListener("click", () => {
        const liked = likeBtn.textContent.includes("❤️") && !likeBtn.textContent.includes("❤️ 0");
        likesCount = liked ? likesCount - 1 : likesCount + 1;
        likeBtn.textContent = `❤️ ${likesCount}`;
      });

      // Comment button
      const commentBtn = document.createElement("button");
      commentBtn.className = "comment-btn";
      commentBtn.textContent = "💬 Comment";

      // Inline comment form
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

      // Comments list
      const comments = document.createElement("div");
      comments.className = "comments";

      // Toggle comment form
      commentBtn.addEventListener("click", () => {
        form.style.display = form.style.display === "flex" ? "none" : "flex";
      });

      // Post comment live
      const postComment = () => {
        const text = input.value.trim();
        if (!text) return;
        addComment(comments, `You: ${text}`);
        input.value = "";
        comments.style.display = "block";
        comments.scrollTop = comments.scrollHeight;
      };
      post.addEventListener("click", postComment);
      input.addEventListener("keydown", e => e.key === "Enter" && postComment());

      // Append to card
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
