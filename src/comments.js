export function renderComments(commentsList, container) {
    // Clear previous comments
    container.querySelectorAll('.comments-container').forEach(el => el.remove());

    const commentsContainer = document.createElement('div');
    commentsContainer.className = 'comments-container';

    if (!commentsList || commentsList.length === 0) {
        commentsContainer.textContent = 'No comments yet.';
        container.appendChild(commentsContainer);
        return;
    }

    commentsList.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';

        const author = document.createElement('p');
        author.className = 'comment-author';
        author.textContent = comment.commenter_name; // name of the commenter

        const text = document.createElement('p');
        text.className = 'comment-text';
        text.textContent = comment.comment; 

        commentDiv.appendChild(author);
        commentDiv.appendChild(text);
        commentsContainer.appendChild(commentDiv);
    });

    container.appendChild(commentsContainer);
}
