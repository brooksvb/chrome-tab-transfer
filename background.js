chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to the active tab
	chrome.tabs.query({"windowId": chrome.windows.WINDOW_ID_CURRENT}, function(tabs) {
		console.log("I'm in background.js");
		chrome.tabs.sendMessage(tabs, {"message": "clicked_browser_action"});
	});
});