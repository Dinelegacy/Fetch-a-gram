import likeIcon from './icons/heart-solid-full.svg?raw'; // :heart: icon SVG
// -------------------
// Like image via API
// -------------------
export async function likeImage(id, iconSpan, countSpan, changedLikes, updateLikeCountInFeed) {
    try {
        const response = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/like`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (data.success) {
            const count = data.likes_count ?? 0;
            countSpan.textContent = `${count} ${count === 1 ? "Like" : "Likes"}`;
            const svgEl = iconSpan.querySelector("svg");
            if (svgEl) svgEl.style.fill = "red";
            changedLikes.add(id);
            await updateLikeCountInFeed(id, count);
        }
    } catch (err) {
        console.error("Error liking image:", err);
    }
}
// -------------------
// Refresh feed image
// -------------------
export async function refreshSingleImage(id, updateLikeCountInFeed) {
    try {
        const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}`);
        const p = await res.json();
        if (!p) return;
        updateLikeCountInFeed(p.id, p.likes_count ?? 0);
    } catch (err) {
        console.error(err);
    }
}
// -------------------
// Update feed DOM + local data
// -------------------
export async function updateLikeCountInFeed(id, newCount) {
    const card = document.querySelector(`.photo-card[data-photo-id="${id}"]`);
    if (card) {
        const likeSpan = card.querySelector(".likes");
        if (likeSpan) {
            likeSpan.innerHTML = `${likeIcon} ${newCount} ${newCount === 1 ? "Like" : "Likes"}`;
        }
    }
    const photo = window.__allPhotos?.find(p => p.id === id);
    if (photo) photo.likes_count = newCount;
}