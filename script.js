const chatBox = document.getElementById('chatBox');
const input = document.getElementById('userInput');

// 🔁 Load chat history
window.onload = () => {
  const savedChat = JSON.parse(localStorage.getItem('abhay_chat') || '[]');
  savedChat.forEach(({ sender, text }) => appendMessage(text, sender));
};

function sendMessage() {
  const userText = input.value.trim();
  if (userText === '') return;

  appendMessage(userText, 'user');
  saveMessage(userText, 'user');
  input.value = '';

  getAIResponse(userText).then(botReply => {
    appendMessage(botReply, 'bot');
    saveMessage(botReply, 'bot');
  });
}

function appendMessage(text, sender) {
  const message = document.createElement('div');
  message.classList.add('message', sender);
  message.textContent = `${sender === 'user' ? '🧑' : '🤖'}: ${text}`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveMessage(text, sender) {
  const chat = JSON.parse(localStorage.getItem('abhay_chat') || '[]');
  chat.push({ sender, text });
  localStorage.setItem('abhay_chat', JSON.stringify(chat));
}

// 🎙️ Voice input
function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'hi-IN';
  recognition.start();
  recognition.onresult = event => {
    input.value = event.results[0][0].transcript;
    sendMessage();
  };
}

// 🤖 AI response using OpenAI
async function getAIResponse(message) {
  const apiKey = "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"; // 🛑 Replace with your real key
  const endpoint = "https://api.openai.com/v1/chat/completions";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        temperature: 0.7
      })
    });

    const data = await res.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    return "⚠️ AI जवाब नहीं मिल पाया। कृपया API key जांचें।";
  }
}
