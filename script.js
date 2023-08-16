let scrapeEmails = document.getElementById('scrapeEmails');


scrapeEmails.addEventListener('click', () => {
    let [tab] = await chrome.tabs.query({active:
    true, currentWindow: true});
    
})