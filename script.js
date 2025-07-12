const HF_API_KEY = "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"; // Make sure this is declared only once
const HF_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";

async function generateBotReply(userMessage) {
    try {
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HF_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: userMessage })
        });

        const data = await response.json();
        const botReply = data.generated_text || "Maaf kijiye, mujhe jawab nahi mila.";
        displayMessage("ABHAYboat 🤖", botReply);
    } catch (error) {
        console.error("Error:", error);
        displayMessage("ABHAYboat 🤖", "Kuch galat ho gaya... firse koshish karein?");
    }
}

function displayMessage(sender, message) {
    const chatContainer = document.getElementById("chatContainer");
    const msgElem = document.createElement("div");
    msgElem.className = "message";
    msgElem.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(msgElem);
}

document.getElementById("sendButton").addEventListener("click", () => {
    const userInput = document.getElementById("userInput").value.trim();
    if (userInput !== "") {
        displayMessage("Aap 🧑‍💻", userInput);
        generateBotReply(userInput);
    }
});
