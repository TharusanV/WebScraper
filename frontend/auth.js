const loginForm = document.getElementById('loginForm');


loginForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch('http://localhost:5000/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  // if (data.accessToken) {
  if (res.ok) {
    // sessionStorage.setItem('accessToken', data.accessToken);
    switchToDashboard();
  } else {
    alert(data.message || 'Login failed');
  }
});