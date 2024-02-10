document.addEventListener('DOMContentLoaded', function() {
    var saveButton = document.getElementById('save-api-key');
    saveButton.addEventListener('click', function() {
        var apiKey = document.getElementById('api-key-input').value;
        // Save the API key in the local storage
        chrome.storage.local.set({'apiKey': apiKey}, function() {
            console.log('API key saved');
        });
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
