import likeIcon from './icons/heart-solid-full.svg?raw'; //Anna: import like icon as SVG code (needed to use it in innerHTML and change colors)
import commentIcon from './icons/comment-solid-full.svg?raw'; //Anna: import comment icon as SVG code (needed to use it in innerHTML and change colors)

const loaderElement = document.querySelector('.lds-ripple-container'); // Anna: Select loader element. Alrady exist in the index.html

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

  function renderPhotos(photos) {
    photos.forEach(p => {
      const card = document.createElement("div");
      card.className = "photo-card";

      const img = document.createElement("img");
      img.src = p.src;
      img.id = p.id;
      img.alt = "photo";

  img.addEventListener("click", () => {
  const likeSpan = img.parentElement.querySelector(".likes");
  const match = likeSpan?.textContent.match(/\d+/);
  const currentLikes = match ? parseInt(match[0], 10) : 0;
  
  openPopup(p.src, currentLikes, p.id);
}); //instead of sending first api fetched data send the dom like data dynamically
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

      card.appendChild(img);
      card.appendChild(actions);
      section.appendChild(card);
    });
  }

  async function load() {
    loadMoreBtn.style.opacity = "0"; // Anna: Hide button during load
    await new Promise(requestAnimationFrame); // Anna: Allow UI to update

    const photos = [
      ...await fetchPhotos(page),
      ...await fetchPhotos(page + 1),
      ...await fetchPhotos(page + 2)
    ];

    renderPhotos(photos);

    loaderElement.remove(); // Anna: Remove loader element after first load of imges collection
    loadMoreBtn.style.opacity = "1"; // Anna: return button after load
  }

  load();

  loadMoreBtn.addEventListener("click", () => {
    page = page + 3;
    load();
  });

}
