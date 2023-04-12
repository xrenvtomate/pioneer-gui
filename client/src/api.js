const fetchDataButton = document.querySelector('#fetch-data');
const dataParagraph = document.querySelector('#data');

fetchDataButton.addEventListener('click', () => {
    fetch('http://127.0.0.1:8000/')
    .then(response => response.json())
    .then(data => {
        dataParagraph.textContent = data.message;
    })
    .catch(error => {
        console.error(error);
        dataParagraph.textContent = 'Error fetching data';
    });
});