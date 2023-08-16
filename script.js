let scrapeEmails = document.getElementById('scrapeEmails');


scrapeEmails.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active:
    true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEmailsFromPage,

    })
})

function scrapeEmailsFromPage() {
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    
    let emails = document.body.innerHTML.match
    (emailRegEx);

    alert(emails)




}