// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : window.location.origin + '/api';

// Update API URL display
document.getElementById('apiUrl').textContent = API_BASE_URL;

// Check backend health on page load
window.addEventListener('load', () => {
    checkBackendHealth();
});

/**
 * Check backend health status
 */
function checkBackendHealth() {
    const statusElement = document.getElementById('status');
    statusElement.textContent = 'Checking...';
    statusElement.className = 'status-pending';

    fetch(`${API_BASE_URL}/health`)
        .then(response => response.json())
        .then(data => {
            statusElement.textContent = 'Online ✓';
            statusElement.className = 'status-online';
        })
        .catch(error => {
            statusElement.textContent = 'Offline ✗';
            statusElement.className = 'status-offline';
            console.error('Health check failed:', error);
        });
}

/**
 * Call the Greeting API
 */
function callGreeting() {
    const name = document.getElementById('nameInput').value || 'World';
    const resultDiv = document.getElementById('greetingResult');

    resultDiv.classList.remove('show', 'error', 'success');
    resultDiv.textContent = 'Loading...';
    resultDiv.classList.add('show');

    fetch(`${API_BASE_URL}/greeting?name=${encodeURIComponent(name)}`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `
                <strong>✓ Success:</strong><br>
                <code>${JSON.stringify(data, null, 2)}</code>
            `;
            resultDiv.classList.add('success');
        })
        .catch(error => {
            resultDiv.innerHTML = `
                <strong>✗ Error:</strong><br>
                <code>${error.message}</code><br><br>
                Make sure the backend is running at: <code>${API_BASE_URL}</code>
            `;
            resultDiv.classList.add('error');
            console.error('Greeting API error:', error);
        });
}

/**
 * Call the Health Check API
 */
function callHealth() {
    const resultDiv = document.getElementById('healthResult');

    resultDiv.classList.remove('show', 'error', 'success');
    resultDiv.textContent = 'Loading...';
    resultDiv.classList.add('show');

    fetch(`${API_BASE_URL}/health`)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `
                <strong>✓ Backend Status:</strong><br>
                <code>${JSON.stringify(data, null, 2)}</code>
            `;
            resultDiv.classList.add('success');
        })
        .catch(error => {
            resultDiv.innerHTML = `
                <strong>✗ Error:</strong><br>
                <code>${error.message}</code><br><br>
                Backend is not responding. Check if it's running at <code>${API_BASE_URL}</code>
            `;
            resultDiv.classList.add('error');
            console.error('Health check error:', error);
        });
}

/**
 * Call the Echo API
 */
function callEcho() {
    const message = document.getElementById('echoInput').value || 'Hello';
    const resultDiv = document.getElementById('echoResult');

    resultDiv.classList.remove('show', 'error', 'success');
    resultDiv.textContent = 'Loading...';
    resultDiv.classList.add('show');

    fetch(`${API_BASE_URL}/echo`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response.json();
        })
        .then(data => {
            resultDiv.innerHTML = `
                <strong>✓ Backend Response:</strong><br>
                <code>${JSON.stringify(data, null, 2)}</code>
            `;
            resultDiv.classList.add('success');
        })
        .catch(error => {
            resultDiv.innerHTML = `
                <strong>✗ Error:</strong><br>
                <code>${error.message}</code><br><br>
                Make sure the backend is running and accessible.
            `;
            resultDiv.classList.add('error');
            console.error('Echo API error:', error);
        });
}

// Allow Enter key to trigger actions
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') callGreeting();
    });

    document.getElementById('echoInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') callEcho();
    });
});
