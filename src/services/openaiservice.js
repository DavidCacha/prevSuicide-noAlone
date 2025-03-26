import axios from 'axios';

const API_KEY = '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'; // Coloca tu API Key aquí
const API_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_MESSAGE = { role: "system", content: "Eres un amigo comprensivo y empático que brinda apoyo emocional y escucha a personas que necesitan ayuda en momentos difíciles. Responde con amabilidad y empatía." };

export const sendMessageToGPT = async (messages) => {
    console.log('test', messages)
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
    console.log('ffff', response);
    return response.data.choices[0].message.content;
  } catch (error) {
    if (error.response) {
      console.error('Error de OpenAI:', error.response.data, error);
    } else if (error.request) {
      console.error('No se recibió respuesta:', error.request);
    } else {
      console.error('Error al hacer la petición:', error.message);
    }
    return "Lo siento, ocurrió un error al procesar tu mensaje.";
  }
};

