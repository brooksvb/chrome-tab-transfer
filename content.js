chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("I'm in content.js");
		if( request.message === "clicked_browser_action" ) {
			console.log(tabs);
		}
	}
);