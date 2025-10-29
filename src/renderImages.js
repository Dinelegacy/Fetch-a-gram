const APIURL = 'https://image-feed-api.vercel.app/';

const photoList = document.querySelector('.photo-list');
const showMoreBtn = document.querySelector('.show-more-btn');
let currentPage = 1;

function createImageCard(item) {
    const img = document.createElement('img');
    img.src = item.image_url;
    img.alt = 'image';
    return img;
}

function renderImages(imagesData) {
    imagesData.forEach(item => {
        const li = document.createElement('li');
        li.classList.add('photo-item');

        const card = createImageCard(item);
        const likes = document.createElement('p');
        likes.textContent = `❤️ ${item.likes_count} Likes`;

        const comments = document.createElement('p');
        const count = item.comments.length;
        comments.textContent = `💬 ${count} ${count === 1 ? 'Comment' : 'Comments'}`;

        li.appendChild(card);
        li.appendChild(likes);
        li.appendChild(comments);

        photoList.appendChild(li);
        
    });
}

async function fetchImages(page = 1) {
    try {
        const response = await fetch(`${APIURL}api/images?page=${page}`);
        const data = await response.json();
        return data.data; // ✅ возвращаем данные!
    } catch (error) {
        console.error('Error:', error);
    }
}

export async function loadMoreImages() {
    const images = await fetchImages(currentPage);
    renderImages(images);
    currentPage++; // ✅ переходим к следующей странице
}
;

// ✅ слушаем кнопку
showMoreBtn.addEventListener('click', loadMoreImages);
