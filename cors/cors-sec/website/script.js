document.addEventListener('DOMContentLoaded', function() {
    const fetchButton = document.getElementById('fetch-data');
    const dataContainer = document.getElementById('data-container');
    
    fetchButton.addEventListener('click', function() {
        dataContainer.innerHTML = '<p>Loading data...</p>';
        
        // Fetch data from the API container
        fetch('http://localhost:8081/data/sample.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let html = '<h2>Data from API:</h2>';
                html += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                dataContainer.innerHTML = html;
            })
            .catch(error => {
                dataContainer.innerHTML = '<p>Error fetching data: ' + error.message + '</p>';
                console.error('Error fetching data:', error);
            });
    });
});