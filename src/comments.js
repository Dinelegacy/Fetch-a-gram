export function renderComments(commentsList, container) {
    container.querySelectorAll('.comments-container').forEach(el => el.remove());    // Clear previous comments

    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments-container';
    const commentsContainerTitle = document.createElement('h2');
    commentsContainerTitle.textContent = 'Comments';

    const showMoreBtn = document.createElement('button');
    showMoreBtn.classList.add('comments-show-more-btn');
    showMoreBtn.textContent = 'Show more comments';
    const commentsInfo = document.createElement('p');
    commentsInfo.classList.add('comments-info');
    commentsContainer.appendChild(commentsContainerTitle);

    const form = document.createElement('form');
    form.className = 'comment-form';
    form.innerHTML = `
    <div class="input-container">
      <input type="text" name="comment" placeholder="Your comment" required />
      <button type="submit" class="send-comment">⤴️</button>
    <div>
    `;

    let visibleCount = 3;
    let localComments = [...commentsList]; // копия исходных комментариев, чтобы можно было добавлять новые


    const updateInfo = () => {
        const total = localComments.length;
        const shown = commentsContainer.querySelectorAll('.comment').length;
        commentsInfo.textContent = `${shown} of ${total} comments`;
      };
      
    if (!commentsList || commentsList.length === 0) {
        commentsContainer.textContent = 'No comments yet.';
        container.appendChild(commentsContainer);
        return;
    }

    const renderVisibleComments = () => {
        // Очистить старые комментарии, кроме заголовка и кнопки
        commentsContainer.querySelectorAll('.comment').forEach(el => el.remove());

        
        // Отрисовать только нужное количество
        commentsList.slice(0, visibleCount).forEach(comment => {
            
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';

            const text = document.createElement('p');
            text.className = 'comment-text';
            text.textContent = comment.comment;

            const author = document.createElement('p');
            author.className = 'comment-author';
            author.textContent = `Author: ${comment.commenter_name}`;

            commentDiv.appendChild(text);
            commentDiv.appendChild(author);
            commentsContainer.appendChild(commentDiv);

            const totalComments = commentsList ? commentsList.length : 0;
            const numberOfShownComments = () => commentsContainer.querySelectorAll('.comment').length;
            commentsInfo.textContent = `${numberOfShownComments()} of ${totalComments} comments`;
    
            commentsContainer.appendChild(commentsInfo);


            commentsContainer.appendChild(showMoreBtn);
        });

        commentsContainer.appendChild(form);

    
    };



    showMoreBtn.addEventListener('click', () => {
        visibleCount += 3; // Показать ещё 3
        renderVisibleComments();

        // Скрыть кнопку, если показаны все комментарии
        if (visibleCount >= commentsList.length) {
            showMoreBtn.style.display = 'none';
        }
    });

    renderVisibleComments();
    container.appendChild(commentsContainer);
}