function insertHtmlAtTop(html) {
    document.body.insertAdjacentHTML('beforebegin', html);
}

function displayStyle(query, style) {
    var element = document.querySelector(query);
    element.style.display = style;
}

function loadSettings() {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'loadSettings' }, (response) => {
            resolve(response.apiKey || '');
        });
    });
}

function saveSettings(apiKey) {
    chrome.runtime.sendMessage(
        { action: 'saveSettings', apiKey },
        (response) => {
            if (response.success) {
                console.log('Settings saved successfully');
            } else {
                console.error('Error saving settings:', response.error);
            }
        }
    );
}

const settingSVG = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9" cy="14" r="4" stroke="white" stroke-width="2"/>
<path d="M12 11L15.5 7.5M17 6L15.5 7.5M15.5 7.5L18 10" stroke="white" stroke-width="2" stroke-linecap="round"/>
</svg>
`

const refreshSVG = `
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14 15.5L10 19.5L14 23.5" stroke="white" stroke-width="2" />
<path
    d="M18.0622 9C18.6766 10.0641 19 11.2712 19 12.5C19 13.7288 18.6766 14.9359 18.0622 16C17.4478 17.0641 16.5641 17.9478 15.5 18.5622C14.4359 19.1766 13.2288 19.5 12 19.5"
    stroke="white" stroke-width="2" stroke-linecap="round" />
<path d="M10 9.5L14 5.5L10 1.5" stroke="white" stroke-width="2" />
<path
    d="M5.93782 16C5.32344 14.9359 5 13.7288 5 12.5C5 11.2712 5.32344 10.0641 5.93782 9C6.5522 7.93587 7.43587 7.0522 8.5 6.43782C9.56413 5.82344 10.7712 5.5 12 5.5"
    stroke="white" stroke-width="2" stroke-linecap="round" />
</svg>
`

const correctSVG = `
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12.5" r="9" stroke="#010104" stroke-width="2" />
<path d="M8 12.5L11 15.5L16 9.5" stroke="#010104" stroke-width="2" />
</svg>
`

var modalHtml = `
<div id="myModal" class="korectic-modal">
    <div class="korectic-modal-content">
        <header class="korectic-modal-header">
            <h1 class="korectic-modal-title">Korectic</h1>
            <button id="settingsLink" class="korectic-modal-api-key-button">
                <p>API Key</p>
                ${settingSVG}
            </button>
        </header>
        <section class="korectic-modal-body">
            <textarea id="textInput" class="korectic-textarea" placeholder="Enter text to correct..."></textarea>
        </section>
        <footer id="correctButton" class="korectic-modal-footer">
            <button class="korectic-modal-action-button korectic-correct-button">
                <p>Correct</p>
                ${correctSVG}
            </button>
        </footer>
        <div class="korectic-follow-me">
            <a href="https://twitter.com/mak_1102?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @mak_1102</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
        </div>
    </div>
</div>
`;

insertHtmlAtTop(modalHtml);

document.getElementById('settingsLink').addEventListener('click', async function () {
    var currentApiKey = await loadSettings();
    var newApiKey = prompt("Please enter your API key:", currentApiKey);
    if (newApiKey !== null && newApiKey !== "") {
        saveSettings(newApiKey);
    }
});

window.addEventListener('click', function (event) {
    if (event.target === document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
    }
});

chrome.runtime.sendMessage({ contentScriptReady: true });
