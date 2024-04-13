const chatinput = document.querySelector(".chat-input textarea")
const sendchatbtn = document.querySelector(".chat-input span")
const chatbox = document.querySelector(".chatbox")

let usermessage;
const apikey = "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";

const creatchatli = (message, classname) => {
    const chatli = document.createElement("li");
    chatli.classList.add("chat", classname);
    let chatcontent = classname === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span>
    <p>${message}</p>`
    chatli.innerHTML = chatcontent;
    return chatli;
}


const generateresponse = () => {

    const apiurl = "https://api.openai.com/v1/chat/completions";

    const requestoptions = {
        method: "POST",
        Headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${apikey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role:"user", content: usermessage}]
        })
    }

    fetch(apiurl, requestoptions).then(res => res.json()).then(data => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
}

const handlechat = () => {
    usermessage = chatinput.value.trim();
    if (!usermessage) return;

    chatbox.appendChild(creatchatli(usermessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(creatchatli("Thinking ...", "incoming"));
        generateresponse();
    }, 600);
}

sendchatbtn.addEventListener("click", handlechat);