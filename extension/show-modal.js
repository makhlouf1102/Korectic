function displayStyle(query, style) {
    var element = document.querySelector(query);
    element.style.display = style;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.action === "show-modal") {
        displayStyle('#myModal', 'block');
        sendResponse({ status: "Modal displayed" });
    }
});


document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' || event.key === 27) {
        document.getElementById('myModal').style.display = 'none';
    }
});