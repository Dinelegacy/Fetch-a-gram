<<<<<<< HEAD
export default function setupFeed(openPopup) {
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return;

  let page = 1;
  const limit = 6;
  let allPhotos = []; // Jalal ADDED: store all fetched photos to use in popup carousel

  async function fetchPhotos(page, limit) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/photos?limit=${limit}&page=${page}`);
      const data = await res.json();
      return data.map(p => ({
        src: p.url || p.download_url || "",
        alt: p.title || "photo",
        likesCount: p.likes_count || 0, // jalal ADDED: store initial likes from API
        commentsList: p.comments || [], // jalal ADDED: store initial comments from API
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

      // jalal MODIFIED: image click opens popup with index and all photos for carousel
      const img = document.createElement("img");
      img.src = p.src;
      img.alt = p.alt;
      img.addEventListener("click", () => openPopup(i, photos.map(p => ({ url: p.src }))));


      // Actions container
      const actions = document.createElement("div");
      actions.className = "actions";

      // Like button + count
      let likesCount = 0; // this needs to be merge with Anna's individual likes//
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
        addComment(comments, `You: ${text}`); // the needs to me change to merge Anna's comments//
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
=======
import likeIcon from './icons/heart-solid-full.svg?raw'; //Anna: import like icon as SVG code (needed to use it in innerHTML and change colors)
import commentIcon from './icons/comment-solid-full.svg?raw'; //Anna: import comment icon as SVG code (needed to use it in innerHTML and change colors)

const loaderElement = document.querySelector('.lds-ripple-container'); // Anna: Select loader element. Alrady exist in the index.html

export default function setupFeed(openPopup) {
   // Yordanos: Grab the main feed section and the "Load more" button.
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return;// Yordanos: If required elements are missing, exit early to avoid errors.

  let page = 1;// Yordanos: Start from page 1 of the API.

   // Yordanos: Fetch one page of photos from the API and normalize the shape we use in the UI.
  async function fetchPhotos(page) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`);
      const data = await res.json();// Yordanos: Parse JSON payload from the API.

      // Yordanos: Normalize each item to ensure stable fields for rendering.
      return data.data.map(p => ({
        src: p.image_url,// Yordanos: Image source URL used by the <img>.
        likes_count: p.likes_count ?? 0,
        comments: Array.isArray(p.comments) ? p.comments : [],
      }));
    } catch (err) {
      console.error("Error loading API:", err); // Yordanos: Log and recover.
      return [];// Yordanos: Return empty list so UI keeps working even if a page fails.
    }
  }

  // Yordanos: Render a list of photos into the feed (DOM creation + event wiring).
  function renderPhotos(photos) {
    photos.forEach(p => {
      const card = document.createElement("div");
      card.className = "photo-card";

      const img = document.createElement("img");
      img.src = p.src;
      img.alt = "photo";

      img.addEventListener("click", () => openPopup(p.src));

      const actions = document.createElement("div");
      actions.className = "actions";

      const likeInfo = document.createElement("span");
      likeInfo.className = "likes";
      likeInfo.innerHTML = `${likeIcon} ${p.likes_count} Likes`; // Anna: Use likeIcon SVG code here

      const commentsCount = p.comments.length;
      const commentsInfo = document.createElement("span");
      commentsInfo.className = "comments-info";
      commentsInfo.innerHTML = `${commentIcon} ${commentsCount} ${commentsCount === 1 ? 'Comment' : 'Comments'}`; // Anna: Use commentIcon SVG code here


      actions.appendChild(likeInfo);
      actions.appendChild(commentsInfo);
 // Yordanos: Insert the card into the main feed.
      card.appendChild(img);
      card.appendChild(actions);
>>>>>>> origin/develop
      section.appendChild(card);
    });
  }

  async function load() {
<<<<<<< HEAD
    const photos = await fetchPhotos(page, limit);
    allPhotos = allPhotos.concat(photos); // Jalal ADDED: update allPhotos array for popup carousel
    
    renderPhotos(photos);
  }

  load(); // first 6 photos
  loadMoreBtn.addEventListener("click", () => {
    page += 1;
    load();
  });
=======
    loadMoreBtn.style.opacity = "0"; // Anna: Hide button during load
    await new Promise(requestAnimationFrame); // Anna: Allow UI to update

    const photos = [
      //Andreas valegard: Fetch three consecutive pages in parallel, then combine.
      ...await fetchPhotos(page),
      ...await fetchPhotos(page + 1),
      ...await fetchPhotos(page + 2)
    ];

    renderPhotos(photos); // Yordanos: Paint all fetched photos to the DOM.


    loaderElement.remove(); // Anna: Remove loader element after first load of imges collection
    loadMoreBtn.style.opacity = "1"; // Anna: return button after load
  }

  load();
  // Yordanos: On click, move the paging window forward by 3 and load more photos.

  loadMoreBtn.addEventListener("click", () => {
    // Andreas valegard: Advance pagination in steps of three pages.
 page = page + 3;
    load();
  });

>>>>>>> origin/develop
}
