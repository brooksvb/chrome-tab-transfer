chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to the active tab
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs, {"message": "clicked_browser_action"});
  });
});