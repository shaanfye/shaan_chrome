var curVal;

// chrome.runtime.onMessage.addListener( data => {
// 	if ( data.type === 'notification' ) {
// 		notify( data.message );
// 	}
// });

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  console.log(sender.tab ?
				  "from a content script:" + sender.tab.url :
				  "from the extension");
	  if (request.activate === "yes") {
		chrome.storage.local.get(['links', 'notifyCount'], function(result){
			fetch('http://localhost:3000/log',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				action: "test",
				content: result.links,
				number: result.notifyCount
			}),
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
		sendResponse({farewell: "goodbye"});

		})
		
	  }
	}
  );

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log(tabId);
	console.log(changeInfo);
	console.log(tab);
	console.log(tab.url);
})

chrome.storage.onChanged.addListener( function (changes, namespace) {
	
	console.log(changes.notify.oldValue);
	for(let [key, {oldValue, newValue}] of Object.entries(changes)){
		console.log(`the values key ` + key);
		console.log(`the values are ${oldValue} and ${newValue}`);
	}
	
	console.log(`the namespaces are ` + namespace);
	chrome.storage.local.get(function(result){
		console.log(result);
	})
})



chrome.runtime.onInstalled.addListener( () => {
	chrome.contextMenus.create({
		id: 'notify',
		title: "Notify!: %s", 
		contexts:[ "selection" ]
	});
});

chrome.runtime.onStartup.addListener( () => {
	curVal = 0;
	chrome.storage.local.set({"notifyCount": curVal}, function() {
		//console.log(`Value is set to ` + curURL);
	});
})

// chrome.contextMenus.onClicked.addListener( ( info, tab ) => {
// 	if ( 'notify' === info.menuItemId ) {
// 		notify( info.selectionText );
// 	}
// } );

// const notify = message => {
// 	chrome.storage.local.get( ['notifyCount'], data => {
// 		let value = data.notifyCount || 0;
// 		chrome.storage.local.set({ 'notifyCount': Number( value ) + 1 });
// 	} );

// 	return chrome.notifications.create(
// 		'',
// 		{
// 			type: 'basic',
// 			title: 'Notify!',
// 			message: message || 'Notify!',
// 			iconUrl: './assets/icons/128.png',
// 		}
// 	);
// };

