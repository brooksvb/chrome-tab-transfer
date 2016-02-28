'use strict'

const bkg = chrome.extension.getBackgroundPage(); // Debug console

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function() {
  // Obtain array containing Tab objects
  chrome.tabs.query({'currentWindow': true}, function(tabs) {
	let urls = []; // Array containing URLs 
	let post = ""; // String containing formatted URLs to be pasted

	// Extract URL from each tab to array
    tabs.forEach(function(tab) {
		urls.push(tab.url);
	});
	
	// bkg.console.log(urls); // Debug
	
	// Put all urls into one string, separated by lines
    urls.forEach(function(thing) {
	    post = post + thing + '%0A';
    });
	// Remove extra newline char at end of string
	post = post.substring(0, post.length - 3);
	
    //bkg.console.log(post); // Debug
  
    // Call to send function with datastring
    sendData("key=294676f65ed1be6b6580b6644f1a064d&description=links&paste=" + post + "&format=simple&return=link");
	});
});


function sendData(datastring) {
	// Create connections object
	const xhr = new XMLHttpRequest();
	// Open Connection
	xhr.open("POST", "http://paste.ee/api");
	
	xhr.onload = function() { // When finished
	  // bkg.console.log(xhr.response); // Debug
	  openTab(xhr.response); // Open tab with response (URL)
	};
	
	// Set header containing metadata
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
	
	xhr.onerror = function(e) { // When recieving error response
		bkg.console.log(e); // Log error message
	}
	
	// Send the data
	xhr.send(datastring);
}

function openTab(url) {
  chrome.tabs.create({
	  "url": url // Object containing URL key with string value
	  });
}



