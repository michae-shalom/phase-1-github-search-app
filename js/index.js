document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const searchValue = document.getElementById('search').value.trim();
      
      if (searchValue) {
        searchUsers(searchValue);
      }
    });
  
    async function searchUsers(username) {
      const endpoint = `https://api.github.com/search/users?q=${username}`;
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayUsers(data.items);
      } catch (error) {
        console.error('Error fetching GitHub users:', error);
      }
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" class="avatar">
          <span>${user.login}</span>
          <a href="${user.html_url}" target="_blank">Profile</a>
        `;
        li.addEventListener('click', function() {
          fetchUserRepos(user.login);
        });
        userList.appendChild(li);
      });
    }
  
    async function fetchUserRepos(username) {
      const endpoint = `https://api.github.com/users/${username}/repos`;
      try {
        const response = await fetch(endpoint, {
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayUserRepos(data);
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    }
  
    function displayUserRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.name;
        reposList.appendChild(li);
      });
    }
  });
  