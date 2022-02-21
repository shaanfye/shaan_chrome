const text = document.getElementById( 'notify-text' );
const notify = document.getElementById( 'notify-button' );
const reset = document.getElementById( 'notify-reset' );
const counter = document.getElementById( 'notify-count' );
const shaan = document.getElementById( 'shaan-button' );
let curURL; 
var the_array = [];


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
	the_array = [];
} );

// this is the thing that will batch send my message along with erasing the db 

notify.addEventListener( 'click', () => {
	chrome.storage.local.get(['links'], (result) => {
		chrome.storage.local.set({"notifyCount": result.links.length}, () => {
			console.log(result.links.length);
		})
	})
	console.log(text.value);
	chrome.storage.local.set({"Summary": text.value}, function() {
		console.log(`Your summary is: `, text.value);
		text.value = '';

		// send the message to activate the node
		chrome.runtime.sendMessage({activate: "yes"}, function(response){
			console.log(response.farewell);
		})

	});


} );


shaan.addEventListener( 'click', () => {	
	chrome.tabs.query({active: true, currentWindow: true}, async tabs => {
		curURL = await tabs[0].url;
		the_array.push(curURL); // inline push
		chrome.storage.local.set({links: the_array}, function() {
		});
	})		
});

// chrome.storage.local.get( ['notifyCount'], data => {
// 	//curVal = data.notifyCount || 0; // gets the value or sets to 0
// 	//counter.innerHTML = curVal;
// } );
