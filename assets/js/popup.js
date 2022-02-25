const text = document.getElementById( 'notify-text' );
const notify = document.getElementById( 'notify-button' );
const reset = document.getElementById( 'notify-reset' );
const counter = document.getElementById( 'notify-count' );
const shaan = document.getElementById( 'shaan-button' );
let curURL; 


reset.addEventListener( 'click', () => {
	chrome.storage.local.clear();
});

// this is the thing that will batch send my message along with erasing the db 

notify.addEventListener( 'click', () => {
	chrome.storage.local.get(['links'], (result) => {
		chrome.storage.local.set({"notifyCount": result.links.length, "Summary": text.value}, () => {
			console.log(result.links.length);
			chrome.runtime.sendMessage({activate: "yes"}, function(response){
				console.log(response.farewell);
				// once farewell is received, you can reset the storage
				chrome.storage.local.clear();

			})

		})
	})
} );


shaan.addEventListener( 'click', () => {	
	chrome.tabs.query({active: true, currentWindow: true}, async tabs => {
		curURL = await tabs[0].url;
		var make_array = [];
		chrome.storage.local.get({'links': []}, function(obj) {
			console.log(obj.links);
			make_array = obj.links;
			make_array.push(curURL); // inline push
			chrome.storage.local.set({links: make_array}, function() {
			});
		})
	})		
});

// chrome.storage.local.get( ['notifyCount'], data => {
// 	//curVal = data.notifyCount || 0; // gets the value or sets to 0
// 	//counter.innerHTML = curVal;
// } );


// chrome.storage.onChanged.addListener( ( changes, namespace ) => {
// 	chrome.storage.local.get({'links': []}, function(obj) {
// 		console.log(obj.links);
// 		the_array = obj.links;
// 		// need to make sure it grabs ddata on startup
// 	})
	
// 	if ( changes.notifyCount ) {
// 		let value = changes.notifyCount.newValue || 0;
// 		counter.innerHTML = value;
// 	}
// });