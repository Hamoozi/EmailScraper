let scrapeEmails = document.getElementById('scrapeEmails');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    let emails = request.emails;
    let list = document.getElementById('emailsList')

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
scrapeEmails.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active:
    true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEmailsFromPage,

    })
})

function scrapeEmailsFromPage() {
    const emailRegEx = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/
    
    let emails = document.body.innerHTML.match
    (emailRegEx);

    chrome.runtime.sendMessage({emails})




}