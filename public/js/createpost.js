const createFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
     
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create new post');
    }
  }
  
  document.querySelector('.post-form').addEventListener('submit', createFormHandler);