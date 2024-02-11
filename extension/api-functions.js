const checkApiKeyValidity = async () => {
    const url = 'https://api.openai.com/v1/models';
    const headers = {
        'Authorization': `Bearer ${apiKey}`
    };

    try {
        const response = await fetch(url, { headers });
        if (response.ok) {
            // If the request was successful, the API key is valid.
            console.log('The API key is valid.');
            // Optionally, process the response further, e.g., list models.
            const data = await response.json();
            console.log(data);
        } else {
            // If the API request was not successful, determine the reason.
            const errorData = await response.json();
            console.error('The API key is invalid or there was another issue:', errorData);
        }
    } catch (error) {
        console.error('An error occurred while checking the API key:', error);
    }
};

module.exports = {
    checkApiKeyValidity
}