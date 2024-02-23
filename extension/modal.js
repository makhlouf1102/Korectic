function insertHtmlAtTop(html) {
    document.body.insertAdjacentHTML('afterbegin', html);
}

function displayStyle(query, style) {
    var element = document.querySelector(query);
    element.style.display = style;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "show-modal") {
        // displayStyle('#myModal', 'block')
        sendResponse({ status: "done" });
    }
  });

var modalHtml =
    '<div id="myModal" class="modal">' +
    '<div class="modal-content">' +
    '<span class="close">&times;</span>' +
    '<nav><ul>' +
    '<li><a href="#" id="settingsLink">Settings</a></li>' +
    '<li><a href="#" id="correctorLink">Corrector</a></li>' +
    '</ul></nav>' +
    '<div id="settingsSection" style="display:none;"><input type="text" placeholder="API Key 1">' +
    '<input type="text" placeholder="API Key 2"></div>' +
    '<div id="correctorSection"><input type="text" placeholder="Enter text">' +
    '<button>Submit</button></div>' +
    '</div>' +
    '</div>';


insertHtmlAtTop(modalHtml);

document.getElementById('settingsLink').addEventListener('click', function() {
    displayStyle('#settingsSection', 'block');
    displayStyle('#correctorSection', 'none');
});

document.getElementById('correctorLink').addEventListener('click', function() {
    displayStyle('#correctorSection', 'block');
    displayStyle('#settingsSection', 'none');
});

document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('myModal').style.display = 'none';
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = 'none';
    }
});

chrome.runtime.sendMessage({contentScriptReady: true});