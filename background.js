chrome.storage.onChanged.addListener((changes, namespace) => {
    if (changes.hasOwnProperty('isEnabled')) {
        const isEnabled = changes.isEnabled.newValue;
        console.log("Toggle state changed:", isEnabled);

        // Send a message to the content script with the new state
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {isEnabled: isEnabled});
        });
    }
});
