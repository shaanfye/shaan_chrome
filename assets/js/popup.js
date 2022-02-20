const text = document.getElementById( 'notify-text' );
const notify = document.getElementById( 'notify-button' );
const reset = document.getElementById( 'notify-reset' );
const counter = document.getElementById( 'notify-count' );
const shaan = document.getElementById( 'shaan-button' );
let curURL; 
let curVal = 0;
var the_array = [];

chrome.storage.local.get( ['notifyCount'], data => {
	//curVal = data.notifyCount || 0; // gets the value or sets to 0
	//curVal = 0;
	//counter.innerHTML = curVal;
} );

chrome.storage.onChanged.addListener( ( changes, namespace ) => {
	chrome.storage.local.get({'links': []}, function(obj) {
		console.log(obj.links);
		the_array = obj.links;
		// need to make sure it grabs ddata on startup
	})
	
	if ( changes.notifyCount ) {
		let value = changes.notifyCount.newValue || 0;
		counter.innerHTML = value;
	}
});

reset.addEventListener( 'click', () => {
	chrome.storage.local.clear();
	curVal = 0;
	the_array = [];
} );

notify.addEventListener( 'click', () => {
	chrome.runtime.sendMessage( '', {
		type: 'notification',
		message: text.value
	});
} );


shaan.addEventListener( 'click', () => {
	curVal +=1;
	chrome.storage.local.set({"notifyCount": curVal}, function() {
		console.log(`Value of your URL is set to ` + curVal);
	
		chrome.tabs.query({active: true, lastFocusedWindow: true}, async tabs => {
			curURL = await tabs[0].url;
			// need to figure out how to wait for this to occur
			the_array.push(curURL); // inline push
			chrome.storage.local.set({links: the_array}, function() {
				//console.log(`Value is set to ` + curURL);
			});
		})		
		
	});
	
} );

