const editFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value;
  const id = window.location.pathname.split('/').pop();

  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }
};

const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.pathname.split('/').pop();

  if (id) {
    const response = await fetch('/api/post/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#edit-post')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-button')
  .addEventListener('click', deleteFormHandler);
