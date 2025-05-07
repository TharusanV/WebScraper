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

///////////////////////////////////////////////////////////////////////////////////


document.getElementById('addTarget').addEventListener('click', () => {
  const container = document.getElementById('targetsContainer');

  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '10px';
  wrapper.innerHTML = `
    <input type="text" name="selector" placeholder="CSS Selector" required />
    <select name="type" required>
      <option value="text">Text</option>
      <option value="attribute">Attribute</option>
    </select>
    <input type="text" name="attribute" placeholder="Attribute (if type is attribute)" />
  `;

  container.appendChild(wrapper);
});



///////////////////////////////////////////////////////////////////////////////////////////

document.getElementById('scrapeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const url = document.getElementById('url').value;

  const targetDivs = document.querySelectorAll('#targetsContainer > div');
  const targets = Array.from(targetDivs).map(div => {
    const selector = div.querySelector('input[name="selector"]').value;
    const type = div.querySelector('select[name="type"]').value;
    const attribute = div.querySelector('input[name="attribute"]').value;
    const target = { selector, type };

    if (type === 'attribute'){
      target.attribute = attribute; //In js you can dynamically add fields to an object e.g. objectName.field
    }
    
    return target;
  });

  const response = await fetch('http://localhost:5000/api/scrapes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ url, targets })
  });

  const result = await response.json();
  document.getElementById('results').textContent = JSON.stringify(result, null, 2);
});
