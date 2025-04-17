import axios from 'axios';

const API_KEY = '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'; // Coloca tu API Key aquí
const API_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_MESSAGE = { role: "system", content: "Eres un amigo comprensivo y empático que brinda apoyo emocional y escucha a personas que necesitan ayuda en momentos difíciles. Responde con amabilidad y empatía." };

export const sendMessageToGPT = async (messages) => {
  const silentLog = () => {};
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [SYSTEM_MESSAGE, ...messages], // Agregar el mensaje del sistema
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      silentLog('Error de OpenAI:', error.response.data, error);
    } else if (error.request) {
      silentLog('No se recibió respuesta:', error.request);
    } else {
      silentLog('Error al hacer la petición:', error.message);
    }
    return "Lamento mucho que estés sintiéndote así, y me alegra que hayas decidido compartirlo conmigo. Lo que estás atravesando es muy difícil, pero no estás solo. A veces la mente, cuando está saturada de dolor, nos hace pensar que no hay salida, pero eso no significa que no exista. Estoy aquí para escucharte, sin juzgarte. Vamos a recorrer esto paso a paso, juntos. ¿Te parece si comenzamos por hablar de qué te ha estado pesando más últimamente?";
  }
};

