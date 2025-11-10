import { renderComments } from './comments.js';

export default function setupPopup() {
  const popup = document.createElement("div");
  const body = document.body;

  popup.id = "Image-popup";
  popup.className = "hidden";

  popup.innerHTML = `
    <div class="popup-card">
      <span id="close-popup">&times;</span>

      <div class="popup-left">
        <img id="popup-img" src="" alt="popup image">
      </div>

      <div class="popup-right">
      
      </div>

      </div> 

 <button id="prev-popup" class="popup-nav">&#10094;</button>
  <button id="next-popup" class="popup-nav">&#10095;</button>
 

 `;
   

  // TODO: delete old elements:
  // <h3>Post Info</h3>
  // <p>(This space is for Anna and Saheena to add likes and comments 😍 )</p> 

  document.body.appendChild(popup);

  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");

  const prevBtn = popup.querySelector("#prev-popup");
  const nextBtn = popup.querySelector("#next-popup");

  let currentIndex = 0;
  let photosArray = [];

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    body.classList.remove('popup-open'); // Anna: re-enable background scroll when popup is closed
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + photosArray.length) % photosArray.length;
    popupImg.src = photosArray[currentIndex];
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % photosArray.length;
    popupImg.src = photosArray[currentIndex];
  });

  return function openPopup(index, allPhotos) { // Anna: modified to accept allPhotos
    const photo = allPhotos[index];
    console.log("Opening popup for photo:", photo); //
    currentIndex = index;
    photosArray = allPhotos.map(photo => photo.src || photo.url || photo);
    popupImg.src = photo.src;
    popup.classList.remove("hidden");
    body.classList.add('popup-open'); // Anna: prevent background scroll when popup is open
    const popupRight = popup.querySelector('.popup-right');
    console.log('Opening popup for photo:', photo);
    renderComments(photo, popupRight); // Anna: render comments in the popup right section
  };
}



