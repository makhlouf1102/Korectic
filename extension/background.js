

// listen to the keyboard
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'corrector_modal') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ['show-modal.js']
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "show-modal" });
      });
    });
  }
});


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'saveSettings') {
    chrome.storage.sync.set({ apiKey: message.apiKey, productKey: message.productKey }, () => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError });
      } else {
        sendResponse({ success: true });
      }
    });
    return true; // Indicates that the response is asynchronous
  } else if (message.action === 'loadSettings') {
    chrome.storage.sync.get(['apiKey', 'productKey'], (result) => {
      sendResponse({ apiKey: result.apiKey, productKey: result.productKey });
    });
    return true; // Indicates that the response is asynchronous
  }
});