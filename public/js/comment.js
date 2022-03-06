const commentFormHandler = async (event) => {
  event.preventDefault();
  const comment_text = document.querySelector('#comment').value;
  const post_id = parseInt(document.querySelector('#post_id').value);

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment_text,
        post_id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("error adding comment");
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
