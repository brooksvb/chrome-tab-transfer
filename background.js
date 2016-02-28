// background.js
'use strict'

const bkg = chrome.extension.getBackgroundPage();

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  // urls = [];
  // Send a message to the active tab
  chrome.tabs.query({'currentWindow': true}, function(tabs) {
	let urls = []; 
	let post = "";

    tabs.forEach(function(tab) {
		urls.push(tab.url);
	});
	
	bkg.console.log(urls);
	
	// Put all urls into one string, separated by lines
    urls.forEach(function(thing) {
	    post = post + thing + '%0A';
    });
	post = post.substring(0, post.length - 3);
    bkg.console.log(post);
  
    // String with data to be sent
    sendData("key=294676f65ed1be6b6580b6644f1a064d&description=links&paste=" + post + "&format=simple&return=link");
	urls = [];
	bkg.console.log(urls);
  });
});


function sendData(datastring) {
	const xhr = new XMLHttpRequest();
	xhr.open("POST", "http://paste.ee/api");
	
	xhr.onload = function() {
		bkg.console.log(xhr.response);
		openTab(xhr.response);
	};
		
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	
	xhr.onerror = function(e) {
		bkg.console.log(e);
	}
	
	xhr.send(datastring);

	bkg.console.log(urls);
}

function openTab(url) {
  chrome.tabs.create({"url": url});
}



