chrome.runtime.onMessage.addListener( data => {
	if ( data.type === 'notification' ) {
		notify( data.message );
	}
});

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

