// background.js

var bkg = chrome.extension.getBackgroundPage();

var urls = [];
// String to be sent to pastebin
var post = "";

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  // Send a message to the active tab
  chrome.tabs.query({'lastFocusedWindow': true}, function(tabs) {
    tabs.forEach(function(tab) {
		urls.push(tab.url);
	});
	
	bkg.console.log(urls);
	
	// Put all urls into one string, separated by lines
    urls.forEach(function(thing) {
	    post = post + thing + '%0A';
    });
    bkg.console.log(post);
  
    // String with data to be sent
    sendData("api_option=paste&api_dev_key=19c52018fd0282b55c8cefe5f22d16f8&api_paste_code=" + post);
  });
});


function sendData(datastring) {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "http://pastebin.com/api/api_post.php");
	
	xhr.onload = function() {
		bkg.console.log(xhr.response);
		openTab(xhr.response);
	};
		
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	
	xhr.onerror = function(e) {
		bkg.console.log(e);
	}
	
	xhr.send(datastring);
	
}

function openTab(url) {
  chrome.tabs.create({"url": url});
}



