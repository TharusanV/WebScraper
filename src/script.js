function getData(){
  fetch('http://localhost:3000/api/get-data')
  .then(response => response.json())
  .then(data => {
      console.log('Fetched from backend:', data);
  });
}