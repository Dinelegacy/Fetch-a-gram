/* 
  ================================
  Feed Rendering Module (Yordanos)
  ================================
  What this file does (by Yordanos):
  - Fetches paginated images from the  API: https://image-feed-api.vercel.app/api/images
  - Normalizes each photo object 

 
  - Loads data in groups of 3 pages per click to reduce network waits

  
  My contribution (by Yordanos):
  - Implemented the data fetching pipeline (fetchPhotos) and rendering flow (renderPhotos).
  - Wired the paging logic (page increments by 3, batch fetching of page/page+1/page+2).

*/

import likeIcon from './icons/heart-solid-full.svg?raw'; //Anna: import like icon as SVG code (needed to use it in innerHTML and change colors)
import commentIcon from './icons/comment-solid-full.svg?raw'; //Anna: import comment icon as SVG code (needed to use it in innerHTML and change colors)

const loaderElement = document.querySelector('.lds-ripple-container'); // Anna: Select loader element. Alrady exist in the index.html

export default function setupFeed(openPopup) {
  // Yordanos: Grab the main feed section and the "Load more" button.
  const section = document.getElementById("section1");
  const loadMoreBtn = document.getElementById("load-more");
  if (!section || !loadMoreBtn) return; // Yordanos: If required elements are missing, exit early to avoid errors.

  let page = 1; // Yordanos: Start from page 1 of the API.

  // Yordanos: Fetch one page of photos from the API and normalize the shape we use in the UI.
  async function fetchPhotos(page) {
    try {
      const res = await fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`); // Yordanos: Request specific page.
      const data = await res.json(); // Yordanos: Parse JSON payload from the API.

      // Yordanos: Normalize each item to ensure stable fields for rendering.
      return data.data.map(p => ({
        src: p.image_url,     // Yordanos: Image source URL used by the <img>.
        likes_count: p.likes_count ?? 0,          
        comments: Array.isArray(p.comments) ? p.comments : [], 
      }));
    } catch (err) {
      console.error("Error loading API:", err); // Yordanos: Log and recover.
      return []; // Yordanos: Return empty list so UI keeps working even if a page fails.
    }
  }

  // Yordanos: Render a list of photos into the feed (DOM creation + event wiring).
  function renderPhotos(photos) {
    photos.forEach(p => {
      const card = document.createElement("div");
      card.className = "photo-card"; // Yordanos: Container for each photo and its actions.

      const img = document.createElement("img");
      img.src = p.src;
      img.alt = "photo";

      // Yordanos: When the image is clicked, open the popup with the full image.
      img.addEventListener("click", () => openPopup(p.src));

      const actions = document.createElement("div");
      actions.className = "actions"; // Yordanos: Row for likes and comments counters.

      const likeInfo = document.createElement("span");
      likeInfo.className = "likes";
      likeInfo.innerHTML = `${likeIcon} ${p.likes_count} Likes`; // Anna: Use likeIcon SVG code here

      const commentsCount = p.comments.length;
      const commentsInfo = document.createElement("span");
      commentsInfo.className = "comments-info";
      commentsInfo.innerHTML = `${commentIcon} ${commentsCount} ${commentsCount === 1 ? 'Comment' : 'Comments'}`; // Anna: Use commentIcon SVG code here

      // Yordanos: Attach counters to the actions row, then assemble the card.
      actions.appendChild(likeInfo);
      actions.appendChild(commentsInfo);

      card.appendChild(img);
      card.appendChild(actions);
      section.appendChild(card); // Yordanos: Insert the card into the main feed.
    });
  }

  
  async function load() {
    loadMoreBtn.style.opacity = "0"; // Anna: Hide button during load
    await new Promise(requestAnimationFrame); // Anna: Allow UI to update

    // Yordanos
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

  load(); // Yordanos: Do the initial load automatically when the feed is set up.

  // Yordanos: On click, move the paging window forward by 3 and load more photos.
  loadMoreBtn.addEventListener("click", () => {
    page = page + 3; // Andreas valegard: Advance pagination in steps of three pages.
    load();
  });

}
