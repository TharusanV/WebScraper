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

  // Log the response data for debugging
  console.log('Login Response:', data);

  if (res.ok) {
    switchToDashboard();
  } else {
    alert(data.message || 'Login failed');
  }
});
