// Asynchronously check the API key's validity
const checkApiKeyValidity = async (apiKey) => {
    const url = 'https://api.openai.com/v1/models';
    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await fetch(url, { headers });
        return response.ok; // Returns true if the API key is valid, false otherwise
    } catch (error) {
        console.error('An error occurred while checking the API key:', error);
        return false; // Assume the key is invalid if an error occurs
    }
};

// Function to show validation messages
const showValidationMessage = (isValid) => {
    const invalidMessageElement = document.querySelector(".page .api-key-section-container p[style*='color: red;']");
    const validMessageElement = document.querySelector(".page .api-key-section-container p[style*='color: var(--primary);']");

    if (isValid) {
        validMessageElement.style.display = 'block';
        invalidMessageElement.style.display = 'none';
    } else {
        validMessageElement.style.display = 'none';
        invalidMessageElement.style.display = 'block';
    }
};

document.addEventListener('DOMContentLoaded', function() {
    // Load and display the API key if it's already saved
    chrome.storage.local.get('apiKey', function(result) {
        if (result.apiKey) {
            document.getElementById('api-key-input').value = result.apiKey;
        }
    });

    var saveButton = document.getElementById('save-api-key');
    saveButton.addEventListener('click', async function() {
        var apiKey = document.getElementById('api-key-input').value;

        // Validate the API key before saving
        const isValid = await checkApiKeyValidity(apiKey);
        if (isValid) {
            // Save the API key in the local storage if it's valid
            chrome.storage.local.set({'apiKey': apiKey}, function() {
                console.log('API key saved');
                showValidationMessage(true);
            });
        } else {
            // Show an error message if the API key is invalid
            showValidationMessage(false);
        }
    });
});




document.addEventListener('DOMContentLoaded', function() {
    // Attempt to retrieve the API key from local storage
    
    chrome.storage.local.get('apiKey', function(result) {
        if (result.apiKey) {
            // If the API key exists, display it in the input field
            document.getElementById('api-key-input').value = result.apiKey;
        } else {
            document.getElementById('api-key-input').value = 'nothing';

            // If the API key does not exist, do nothing
            console.log('No API key found');
        }
    });
});
