async function getAIResponse(message) {
  const hfKey = "YOUR_HF_TOKEN"; // replace yahan
  const res = await fetch("https://api-inference.huggingface.co/models/gpt2", {
    method: "POST",
    headers: { 
      "Authorization": `Bearer ${hfKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: message })
  });
  const data = await res.json();
  if(data.error || !data[0]?.generated_text) 
    return "⚠️ AI reply aaye nahi. Check token.";
  return data[0].generated_text;
}
<script src="secrets.js"></script>
