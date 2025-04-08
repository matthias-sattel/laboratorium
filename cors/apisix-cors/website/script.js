document.addEventListener('DOMContentLoaded', function() {
    const employeeButton = document.getElementById('fetch-employee');
    const employeeContainer = document.getElementById('employee-container');
    
    employeeButton.addEventListener('click', function() {
        employeeContainer.innerHTML = '<p>Loading data...</p>';
        
        // Fetch data from the API container
        fetch('http://localhost:9080/employee/employee.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let html = '<h2>Data from API:</h2>';
                html += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                employeeContainer.innerHTML = html;
            })
            .catch(error => {
                employeeContainer.innerHTML = '<p>Error fetching data: ' + error.message + '</p>';
                console.error('Error fetching data:', error);
            });
    });

    const salaryButton = document.getElementById('fetch-salary');
    const salaryContainer = document.getElementById('salary-container');
    
    salaryButton.addEventListener('click', function() {
        salaryContainer.innerHTML = '<p>Loading data...</p>';
        
        // Fetch data from the API container
        fetch('http://localhost:9080/salary/salary.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let html = '<h2>Data from API:</h2>';
                html += '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
                salaryContainer.innerHTML = html;
            })
            .catch(error => {
                salaryContainer.innerHTML = '<p>Error fetching data: ' + error.message + '</p>';
                console.error('Error fetching data:', error);
            });
    });
});