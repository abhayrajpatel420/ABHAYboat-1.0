async function getAIResponse(message) {
  const res = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${HF_API_KEY}`,  // 👈 yeh hai 4th point ka matlab
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: message })
  });

  const data = await res.json();
  if (!data || !data[0]?.generated_text) {
    return "⚠️ जवाब नहीं मिला, कृपया दोबारा कोशिश करें।";
  }

  return data[0].generated_text;
}
<script src="secrets.js"></script>
