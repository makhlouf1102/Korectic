// Function to toggle pages
const togglePage = (showApiKeyPage) => {
    const apiKeyPage = document.getElementById('api-key-page');
    const productKeyPage = document.getElementById('product-key-page');
    const apiKeyButton = document.getElementById('section-button-api-key');
    const productKeyButton = document.getElementById('section-button-product-key');

    if (showApiKeyPage) {
        apiKeyPage.style.display = 'block';
        productKeyPage.style.display = 'none';
        apiKeyButton.classList.add('curr-page');
        productKeyButton.classList.remove('curr-page');
    } else {
        apiKeyPage.style.display = 'none';
        productKeyPage.style.display = 'block';
        apiKeyButton.classList.remove('curr-page');
        productKeyButton.classList.add('curr-page');
    }
};

// Asynchronously check the API key's validity
const checkApiKeyValidity = async (apiKey) => {
    const url = 'https://api.openai.com/v1/models';
    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await fetch(url, { headers });
        if (response.ok) return true; // Returns true if the API key is valid, 
        return false;
    } catch (error) {
        return false; // Assume the key is invalid if an error occurs
    }
};

// Asynchronously check the API key's validity
const checkProductKeyValidity = async (apiKey) => {
    const url = 'https://api.openai.com/v1/models';
    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    // complete the code here 
};

// Function to show validation messages
const showValidationMessage = (isValid) => {
    const invalidMessageElement = document.querySelector("#api-key-invalid");
    const validMessageElement = document.querySelector("#api-key-valid");
    if (isValid) {
        validMessageElement.style.display = 'block';
        invalidMessageElement.style.display = 'none';
    } else {
        validMessageElement.style.display = 'none';
        invalidMessageElement.style.display = 'block';
    }
};

document.addEventListener('DOMContentLoaded', function () {

    // Toggle to API key page
    const apiKeyButton = document.getElementById('section-button-api-key');
    apiKeyButton.addEventListener('click', function () {
        togglePage(true);
    });

    // Toggle to Product key page
    const productKeyButton = document.getElementById('section-button-product-key');
    productKeyButton.addEventListener('click', function () {
        togglePage(false);
    });

    // Load and display the API key if it's already saved
    chrome.storage.local.get('apiKey', function (result) {
        if (result.apiKey) {
            document.getElementById('api-key-input').value = result.apiKey;
        }
    });

    var saveButton = document.getElementById('save-api-key');
    saveButton.addEventListener('click', async function () {
        var apiKey = document.getElementById('api-key-input').value;

        // Validate the API key before saving
        const isValid = await checkApiKeyValidity(apiKey);
        if (isValid) {
            // Save the API key in the local storage if it's valid
            chrome.storage.local.set({ 'apiKey': apiKey }, function () {
                console.log('API key saved');
                showValidationMessage(true);
            });
        } else {
            // Show an error message if the API key is invalid
            showValidationMessage(false);
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Attempt to retrieve the API key from local storage

    chrome.storage.local.get('apiKey', function (result) {
        if (result.apiKey) {
            // If the API key exists, display it in the input field
            document.getElementById('api-key-input').value = result.apiKey;
            // alert(result.apiKey)
        } else {
            document.getElementById('api-key-input').value = 'nothing';

            // If the API key does not exist, do nothing
            console.log('No API key found');
        }
    });
});

