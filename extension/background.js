

// listen to the keyboard
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'corrector_modal') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { action: "show-modal" }, function (response) { });
    });
  }
});
