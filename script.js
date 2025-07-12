const HF_API_KEY = "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";
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

        // Updated response handling
        let botReply = "Maaf kijiye, mujhe jawab nahi mila.";
        if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            botReply = data[0].generated_text;
        } else if (data.generated_text) {
            botReply = data.generated_text;
        } else if (data.text) {
            botReply = data.text;
        }

        displayMessage("ABHAYboat 🤖", botReply);
    } catch (error) {
        console.error("Error:", error);
        displayMessage("ABHAYboat 🤖", "Kuch galat ho gaya... firse koshish karein?");
    }
}
