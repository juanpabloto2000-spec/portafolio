// Google Gemini AI Assistant Integration for Dynamind Studios
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

export const isGeminiConfigured = Boolean(GEMINI_API_KEY);

/**
 * Generate human-like conversational response using Google Gemini (gemini-1.5-pro / gemini-2.0-flash)
 */
export async function generateAgentResponse({
  userMessage,
  conversationHistory = [],
  agentConfig,
  clientContext = {}
}) {
  if (!isGeminiConfigured) {
    return null;
  }

  const model = "gemini-1.5-flash"; // Ultra-fast and highly conversational
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;

  // Build System Instructions from Agent Brain Settings
  const systemInstructionText = `
${agentConfig.systemPrompt.roleAndTone}

REGLAS DE COMPORTAMIENTO OBLIGATORIAS:
${agentConfig.systemPrompt.behavioralRules.map(r => `- ${r}`).join('\n')}

INFORMACIÓN DEL NEGOCIO:
- Empresa: ${agentConfig.businessInfo.businessName}
- Teléfono: ${agentConfig.businessInfo.phone}
- Dirección: ${agentConfig.businessInfo.physicalAddress}

BASE DE CONOCIMIENTO (FAQs):
${agentConfig.businessInfo.knowledgeBase.map(f => `P: ${f.question}\nR: ${f.answer}`).join('\n\n')}

SERVICIOS OFRECIDOS:
${agentConfig.services.map(s => `- ${s.name}: ${s.description} (Duración: ${s.durationMinutes} min)`).join('\n')}

DATOS DEL CLIENTE ACTUAL:
- Nombre: ${clientContext.clientName || 'Cliente'}
- Negocio: ${clientContext.businessName || 'Su empresa'}
- Servicios de interés: ${clientContext.services?.join(', ') || 'No especificado'}
- Cita tentativa: ${clientContext.date || 'Pendiente'} a las ${clientContext.time || 'Pendiente'}
- Estado actual en backend: ${clientContext.status || 'pendiente'}

INSTRUCCIÓN DE TONO Y ESTILO:
Responde de manera natural, humana, empática, ejecutiva y directa. No suenes como un robot genérico de soporte. Usa respuestas concisas aptas para WhatsApp (máximo 2 a 3 párrafos cortos). Si el cliente confirma la cita, felicítalo y menciónale que se genera su enlace de Google Meet. Si pide hablar con una persona, utiliza el mensaje de transferencia.
`;

  // Format conversation history for Gemini
  const contents = [
    ...conversationHistory.map(m => ({
      role: m.sender === 'user' || m.sender === 'client' ? 'user' : 'model',
      parts: [{ text: m.text }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemInstructionText }]
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 500
        }
      })
    });

    if (!response.ok) {
      console.warn("Gemini API error, falling back to local heuristic response");
      return null;
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return candidate ? candidate.trim() : null;
  } catch (error) {
    console.error("Gemini API request failed:", error);
    return null;
  }
}
