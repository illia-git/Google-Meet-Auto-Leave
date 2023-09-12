jQuery(($) => {
    if (!window.location.href.includes("https://meet.google.com/")) return;

    console.log("You're on a meeting");

    const goodbyePhrases = [
        "alright guys bye",
        "bye guys thanks",
        "catch you all later",
        "thanks for the meeting",
        "talk to you soon",
        "see you next time",
        "goodbye everyone",
        "thanks for your time",
        "let's wrap this up",
        "catch you later",
        "that's it for today",
        "see you all next week",
        "take care everyone",
        "have a great day",
        "thanks for joining",
        "let's end here",
        "signing off now",
        "bye for now",
        "good meeting everyone",
        "hitler"
    ];

    let previousSubtitle = '';
    let extensionEnabled = false;

    const detectGoodbyePhrase = (subtitle) => {
        return goodbyePhrases.some(phrase => subtitle.includes(phrase));
    };

    // Listen for messages from the background script
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.hasOwnProperty('isEnabled')) {
            extensionEnabled = message.isEnabled;
        }
    });

    setInterval(() => {
        const currentSubtitle = $('div[jsname="tgaKEf"]').text().trim().toLowerCase();

        if (currentSubtitle !== previousSubtitle && detectGoodbyePhrase(currentSubtitle)) {
            console.log("Detected goodbye phrase!");

            if (extensionEnabled) {
                try {
                    const thumbsUpButton = $('button[jsname="vnVdbf"][data-emoji="👍"]');
                    const leaveCallButton = $('button[jsname="CQylAd"][aria-label="Leave call"]');
                    
                    thumbsUpButton.trigger('click');
                    setTimeout(() => {
                        leaveCallButton.trigger('click');
                    }, 2000);
                } catch (error) {
                    console.error("Error while trying to interact with the page:", error);
                }
            }
            previousSubtitle = currentSubtitle;
        }
    }, 1000); // Check every second
});
