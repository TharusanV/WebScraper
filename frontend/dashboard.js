document.getElementById('loadUsersBtn').addEventListener('click', getUsers);
document.getElementById('logoutBtn').addEventListener('click', logout);

async function getUsers() {
  // let token = sessionStorage.getItem('accessToken');

  let res = await fetch('http://localhost:5000/api/users', {
    // headers: {
    //   Authorization: `Bearer ${token}`
    // },
    credentials: 'include'
  });

  // if (res.status === 401 || res.status === 403) {
  //   const refreshRes = await fetch('http://localhost:5000/api/users/refresh', {
  //     method: 'POST',
  //     credentials: 'include'
  //   });

  //   const refreshData = await refreshRes.json();
  //   if (refreshData.accessToken) {
  //     sessionStorage.setItem('accessToken', refreshData.accessToken);
  //     return getUsers();
  //   } else {
  //     alert('Session expired. Please log in again.');
  //     switchToLogin();
  //   }
  // } else {
    const users = await res.json();
    userList.innerHTML = '';
    users.forEach(u => {
      const li = document.createElement('li');
      li.innerText = u.username;
      userList.appendChild(li);
    });
  // }
}

async function logout() {
  await fetch('http://localhost:5000/api/users/logout', {
    method: 'POST',
    credentials: 'include'
  });

  // sessionStorage.removeItem('accessToken');
  switchToLogin();
}

function switchToDashboard() {
  loginSection.style.display = 'none';
  dashboardSection.style.display = 'block';
}

function switchToLogin() {
  loginSection.style.display = 'block';
  dashboardSection.style.display = 'none';
  loginForm.reset();
  userList.innerHTML = '';
}