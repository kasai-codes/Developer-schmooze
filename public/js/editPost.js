const editFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value;
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1  
  ];

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/dashboard`);
    } else {
      alert('Failed to edit post');
    }
  };


const deleteFormHandler = async (event) => {
  event.preventDefault();

  const id = window.location.pathname.split('/').pop();

  if (id) {
    const response = await fetch('/api/posts/' + id, {
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
  .querySelector('.edit-post-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-post-btn')
  .addEventListener('click', deleteFormHandler);
