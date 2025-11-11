export async function fetchPhotos(page) {
  try {
    const res = await fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`);
    const data = await res.json();
    return data.data.map(p => ({
      id: p.id,
      src: p.image_url,
      likes_count: p.likes_count ?? 0,
      comments: Array.isArray(p.comments) ? p.comments : [],
    }));
  } catch (err) {
    console.error("Error loading API:", err);
    return [];
  }
}

export async function fetchSinglePhoto(id) {
  try {
    const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}`);
    const data = await res.json();
    return data.likes_count ?? 0;
  } catch (err) {
    console.error("Error refreshing single photo:", err);
    return 0;
  }
}

export async function refreshLikesForPhotos(photos) {
  return Promise.all(
    photos.map(async (p) => {
      const updatedLikes = await fetchSinglePhoto(p.id);
      return { ...p, likes_count: updatedLikes };
    })
  );
}
