document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const statusLed = document.getElementById('statusLed');

    const updateUI = (isEnabled) => {
        const action = isEnabled ? 'add' : 'remove';
        const reverseAction = isEnabled ? 'remove' : 'add';
        const buttonText = isEnabled ? 'Toggle OFF' : 'Toggle ON';

        toggleButton.textContent = buttonText;
        statusLed.classList[action]('on');
        statusLed.classList[reverseAction]('off');
    };

    chrome.storage.sync.get('isEnabled', (data) => {
        updateUI(data.isEnabled);
    });

    toggleButton.addEventListener('click', () => {
        chrome.storage.sync.get('isEnabled', (data) => {
            const newStatus = !data.isEnabled;
            chrome.storage.sync.set({ isEnabled: newStatus }, () => {
                updateUI(newStatus);
            });
        });
    });
});
