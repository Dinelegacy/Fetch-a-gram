export default function setupPopup() {
    const popup = document.createElement("div");
    popup.id = "Image-popup" 
    popup.className = "hidden";

   popup.innerHTML = `
    <span id="close-popup">&times;</span>
    <img id="popup-img" src="" alt="popup image">
  `;

  document.body.appendChild(popup);

  const popupImg = popup.querySelector("#popup-img");
  const closeBtn = popup.querySelector("#close-popup");

  closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
  });

  return function openPopup(src){
    popupImg.src = src;
    popup.classList.remove("hidden");
  };
}