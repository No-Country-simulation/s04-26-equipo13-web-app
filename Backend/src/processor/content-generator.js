const { GoogleGenerativeAI } = require("@google/generative-ai");

async function generateContent(messages, apiKey) {
    // 1. Crear el cliente de Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // 2. Convertir los mensajes a texto plano para el prompt
    const messagesText = messages
        .map(msg => `- ${msg.author} dijo: "${msg.content}" (${msg.reactions} reacciones)`)
        .join("\n");

    // 3. El prompt: le decimos al LLM exactamente qué queremos
    const prompt = `
Sos un editor de contenido de una comunidad tech llamada TalentCircle.
Estas son las contribuciones más relevantes de la semana en Discord:

${messagesText}

Generá 3 borradores de contenido basados en esta actividad:

1. **NEWSLETTER** (formato largo, 2-3 párrafos, tono profesional)
2. **LINKEDIN** (formato medio, 1 párrafo, tono profesional con emojis)
3. **TWITTER** (máximo 280 caracteres, directo y con hashtags)

Respondé en formato JSON con esta estructura:
{
    "newsletter": "...",
    "linkedin": "...",
    "twitter": "..."
}
Solo respondé con el JSON, sin texto adicional.
`;

    // 4. Enviar al LLM y obtener respuesta
    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // 5. Parsear el JSON de la respuesta
    const clean = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const drafts = JSON.parse(clean);

    return drafts;
}

module.exports = { generateContent };
