document.getElementById('correctButton').addEventListener('click', async () => {
    const textToCorrect = document.getElementById('textInput').value;

    try {
        const response = await chrome.runtime.sendMessage({ action: 'loadSettings' });
        const apiKey = response.apiKey;
        if (!apiKey) {
            console.log('API key not set in extension storage.');
            return;
        }

        const url = 'https://api.openai.com/v1/chat/completions';
        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: "correct this : " + textToCorrect
                },
            ],
            temperature: 0,
        };

        const options = { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(data)
        };
        const fetchResponse = await fetch(url, options);
        const result = await fetchResponse.json();
        if (fetchResponse.status == 429) {
            alert("Sorry there is a problem with your API")
        }
        const correctedText = result.choices[0].message.content;
        document.getElementById('textInput').innerText = correctedText;
        return;
    } catch (error) {
        console.log(error)
    }
});
