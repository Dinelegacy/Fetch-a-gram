export function renderImages() {
  const sections = document.querySelectorAll('.photo-section');

  fetch('https://image-feed-api.vercel.app/images')
    .then((res) => res.json())
    .then((data) => {
      const perSection = Math.ceil(data.length / sections.length);

      sections.forEach((section, i) => {
        const start = i * perSection;
        const end = start + perSection;
        const group = data.slice(start, end);

        group.forEach((img) => {
          const imageEl = document.createElement('img');
          imageEl.src = img.download_url;
          imageEl.alt = img.author || 'Photo';
          section.appendChild(imageEl);
        });
      });
    })
    .catch((err) => console.error('Error fetching images:', err));
}
