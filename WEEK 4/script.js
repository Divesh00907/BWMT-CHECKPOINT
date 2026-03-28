document.addEventListener('DOMContentLoaded', () => {
    const loadBtn = document.getElementById('loadBtn');
    const output = document.getElementById('output');

    loadBtn.addEventListener('click', () => {
        output.textContent = 'Loading...';
        output.className = 'loading';

        fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
            .then(response => {
                console.log('Response:', response);
                return response.json();
            })
            .then(data => {
                console.log('Data:', data);
                output.textContent = JSON.stringify(data, null, 2);
                output.className = '';
            })
            .catch(error => {
                console.error('Error:', error);
                output.textContent = 'Error: ' + error.message;
                output.className = 'error';
            });
    });
});