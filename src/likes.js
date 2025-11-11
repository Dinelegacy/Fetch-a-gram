import likeIcon from './icons/heart-solid-full.svg?raw';


export async function getLikesCount(id) {
    try {
        const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}`);
        const data = await res.json();
        return data.likes_count ?? 0;
    } catch (err) {
        console.error("Failed to fetch like count:", err);
        return 0;
    }
}

export async function toggleLike(id, isLiked) {
    try {
        const method = isLiked ? "DELETE" : "POST";
        const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/like`, {
            method,
            headers: {"Content-Type": "application/json" },
        });
        
const data = await res.json();
if(data.success) {
    return { count: data.likes_count ?? 0, liked: !isLiked };
    }
    } catch(err) {
        console.log("Error toggling like:", err);
    }
    return { count:0, liked: isLiked };
}
export function renderLikesState({ button, count, isLiked }) {
    const icon = button.querySelector('.icon');
    const countSpan = button.querySelector('.count');

    icon.innerHTML = likeIcon.replace(/\n/g, '');
    const svg = icon.querySelector('svg');
    if (svg) svg.style.fill = isLiked ? 'red' : 'black';
    countSpan.textContent = `${count} $(count ===1 ? 'Like' : 'Likes'}`;
}
export function updateFeedLikes(id, newCount){
    const card = document.querySelector(`.photo-card[data-photo-id="${id}"]`);
    if(!card) return;

    const likeSpan = card.querySelector('.likes');
    if(likeSpan){
        likeSpan.innerHTML = `${likeIcon} ${newCount} ${newCount === 1 ? 'Like' : 'Likes'}`;
    }
const photo = window.__allPhotos?.find(p => p.id === id);
 if (photo) photo.likes_count = newCount;
}