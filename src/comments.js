export function renderComments(photo, container) {
    // delete old comments 
    container.querySelectorAll('.comments-container').forEach(el => el.remove());

    // create comments elements
    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments-container';

    const title = document.createElement('h2');
    title.textContent = 'Comments';
    commentsContainer.appendChild(title);

    const info = document.createElement('p');
    info.classList.add('comments-info');
    commentsContainer.appendChild(info);

    const btns = document.createElement('div');
    btns.classList.add('container-btn');

    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('comments-show-more-btn');
    showMoreBtn.textContent = 'Show more';

    const addYourCommentBtn = document.createElement('button');
    addYourCommentBtn.classList.add('your-comment-btn');
    addYourCommentBtn.textContent = 'Comment';

    btns.appendChild(showMoreBtn);
    btns.appendChild(addYourCommentBtn);

    const popup = document.getElementById('comments-popup');
    const popupForm = popup.querySelector('form');
    const nameInput = popup.querySelector('.input-name');
    const commentInput = popup.querySelector('.input-comment');

    let visibleCount = 3;

    // create a local copy of comments in reverse order (newest first)
    let localComments = Array.isArray(photo.comments) ? [...photo.comments].reverse() : [];

    const listEl = document.createElement('ul');
    listEl.classList.add('comments-list');
    commentsContainer.appendChild(listEl);

    const updateInfo = () => {
        const total = localComments.length;
        const shown = listEl.querySelectorAll('.comment').length;
        info.textContent = `${shown} of ${total} comments`;
    };

    const openCommentPopup = () => {
        popup.classList.add('active');
    };

    const closeCommentPopup = () => {
        popup.classList.remove('active');
    };

    const renderVisible = () => {
        listEl.innerHTML = '';

        if (localComments.length === 0) {
            const empty = document.createElement('li');
            empty.className = 'comment';
            const text = document.createElement('p');
            text.className = 'comment-text';
            text.textContent = 'No comments yet.';
            empty.appendChild(text);
            listEl.appendChild(empty);
            showMoreBtn.style.display = 'none';
            info.textContent = `0 of 0 comments`;
            return;
        }

        localComments.slice(0, visibleCount).forEach(c => {
            const item = document.createElement('li');
            item.className = 'comment';

            const author = document.createElement('p');
            author.className = 'comment-author';
            author.textContent = `Author: ${c.commenter_name}`;

            const text = document.createElement('p');
            text.className = 'comment-text';
            text.textContent = c.comment;
            
            item.appendChild(text);
            item.appendChild(author);
            listEl.appendChild(item);
        });

        updateInfo();
        showMoreBtn.style.display =
            visibleCount >= localComments.length ? 'none' : 'block';
    };

    // add comment 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        const commentText = commentInput.value.trim();
        if (!name || !commentText) return;

        const id = photo.id;
        if (!id) {
            console.error('❌ Missing photo ID, please reopen the popup');
            return;
        }

        try {
            const res = await fetch(`https://image-feed-api.vercel.app/api/images/${id}/comment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commenter_name: name, comment: commentText }),
            });

            if (!res.ok) throw new Error('Failed to post comment');
            const data = await res.json();

            if (data.success) {
                const newComment = data.comment;

                // show latest comment on top
                localComments.unshift(newComment);
                if (!Array.isArray(photo.comments)) photo.comments = [];
                photo.comments.unshift(newComment);

                renderVisible();

                nameInput.value = '';
                commentInput.value = '';
                closeCommentPopup();

                // update comments counter in the photo card
                const card = document.querySelector(`.photo-card[data-photo-id="${id}"]`);
                const counter = card?.querySelector('.comments-info');
                if (counter) {
                    const svg = counter.querySelector('svg')?.outerHTML || '';
                    const count = photo.comments.length;
                    counter.innerHTML = `${svg} ${count} ${count === 1 ? 'Comment' : 'Comments'}`;
                }
            }
        } catch (err) {
            console.error('Error posting comment:', err);
            alert('Something went wrong while posting your comment 😢');
        }
    };

    // listeners
    popupForm.removeEventListener('submit', handleSubmit);
    popupForm.addEventListener('submit', handleSubmit);

    showMoreBtn.addEventListener('click', () => {
        visibleCount += 3;
        renderVisible();
    });

    addYourCommentBtn.addEventListener('click', openCommentPopup);

    popup.addEventListener('click', (e) => {
        if (e.target.classList.contains('comments-popup')) {
            closeCommentPopup();
        }
    });

    // render 
    renderVisible();
    commentsContainer.appendChild(btns);
    container.appendChild(commentsContainer);
}