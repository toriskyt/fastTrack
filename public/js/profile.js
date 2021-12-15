const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#project-name').value.trim();
  const needed_funding = document.querySelector('#project-funding').value.trim();
  const description = document.querySelector('#project-desc').value.trim();
  const date_fast_end = document.querySelectorAll('#countdown')
  // need to get value of date entered (similar to line 6) will need to send date to api
  // inside route, will need to create a post for a fast that includes the date
  // 
  if (name && needed_funding && description) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ name, needed_funding, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create project');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    console.log(id);
    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

const fastButton = async (event) => {
  if (event.target.hasAttribute('data-name')) {
    const name = event.target.getAttribute('data-name');
    console.log(name);
    const response = await fetch(`project/${name}`, {
      method: 'GET',
    });

    
    if (response.ok) {
      document.location.replace(`/project/${name}`);
    } else {
      alert('Failed to select project');
    }
  }
}




document
  .querySelector('.new-project-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.new-project-form')
  .addEventListener('click', fastButton);

document
  .querySelector('.project-list')
  .addEventListener('click', delButtonHandler);

