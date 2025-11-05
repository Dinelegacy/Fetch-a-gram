import likeIcon from './icons/heart-solid-full.svg?raw'; //Anna: import like icon as SVG code (needed to use it in innerHTML and change colors)
import commentIcon from './icons/comment-solid-full.svg?raw'; //Anna: import comment icon as SVG code (needed to use it in innerHTML and change colors)

const loaderElement = document.querySelector('.lds-ripple-container'); // Anna: Select loader element. Already exist in the index.html

export default function setupFeed(openPopup) {
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return; // Yordanos: If required elements are missing, exit early to avoid errors.

  let page = 1; // Yordanos: Start from page 1 of the API.
  const limit = 6;
  let allPhotos = []; // Jalal ADDED: store all fetched photos to use in popup carousel

  async function fetchPhotos(page, limit) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/photos?limit=${limit}&page=${page}`);
      const data = await res.json();
      return data.map(p => ({
        src: p.url || p.download_url || "",
        alt: p.title || "photo",
        likesCount: p.likes_count || 0, // Jalal ADDED: store initial likes from API
        commentsList: p.comments || [], // Jalal ADDED: store initial comments from API
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
    photos.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "photo-card";

      // Jalal MODIFIED: image click opens popup with index and all photos for carousel
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt;
      img.addEventListener("click", () => openPopup(i, photos.map(p => ({ url: p.src }))));

      // Actions container
      const actions = document.createElement("div");
      actions.className = "actions";

      // Like button + count
      let likesCount = 0; // this needs to be merged with Anna's individual likes
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
        addComment(comments, `You: ${text}`); // this needs to merge Anna's comments
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
    loadMoreBtn.style.opacity = "0"; // Anna: Hide button during load
    await new Promise(requestAnimationFrame); // Anna: Allow UI to update

    const photos = [
      // Andreas valegard: Fetch three consecutive pages in parallel, then combine.
      ...await fetchPhotos(page),
      ...await fetchPhotos(page + 1),
      ...await fetchPhotos(page + 2)
    ];

    renderPhotos(photos); // Yordanos: Paint all fetched photos to the DOM.

    loaderElement.remove(); // Anna: Remove loader element after first load of images collection
    loadMoreBtn.style.opacity = "1"; // Anna: return button after load
  }

  load(); // first load

  // Yordanos: On click, move the paging window forward by 3 and load more photos.
  loadMoreBtn.addEventListener("click", () => {
    // Andreas valegard: Advance pagination in steps of three pages.
    page = page + 3;
    load();
  });
}
