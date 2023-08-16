// Get the element with id 'scrapeEmails'
let scrapeEmails = document.getElementById('scrapeEmails');

// Add a listener for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    let emails = request.emails;
    let list = document.getElementById('emailsList')

    // Check if there are no emails
    // Add all emails into list
    if(emails == null || emails.length == 0){
        let li = document.createElement('li');
        li.innerText = "No emails were found";
        list.appendChild(li);
    }
    else{
        emails.forEach((email) => {
            let li = document.createElement("li");
            li.innerText = email;

            list.appendChild(li)

        });
    }

})

// Add an event listener for when the 'scrapeEmails' button is clicked
scrapeEmails.addEventListener('click', async () => {
    // Get the current active tab
    let [tab] = await chrome.tabs.query({active:
    true, currentWindow: true});

    // Execute the 'scrapeEmailsFromPage' function on the current tab
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEmailsFromPage,

    })
})

// Function to scrape emails from a page using its regex
function scrapeEmailsFromPage() {
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/
    let emails = document.body.innerHTML.match(emailRegEx)
    chrome.runtime.sendMessage({emails})
}
