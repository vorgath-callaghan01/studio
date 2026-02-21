'use server';
/**
 * @fileOverview Flow untuk menangani percakapan chatbot menggunakan Gemini 1.5 Flash.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const ChatInputSchema = z.object({
  message: z.string().describe('Pesan dari pengguna'),
  feature: z.string().optional().describe('Fitur aktif saat ini (search, image, article)'),
});

const ChatOutputSchema = z.string();

export async function chatWithAI(input: z.infer<typeof ChatInputSchema>): Promise<string> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  model: 'googleai/gemini-1.5-flash', // Menggunakan model Flash untuk chat cepat
  input: { schema: ChatInputSchema },
  output: { schema: z.string() },
  prompt: `
    Anda adalah Vorgawall Assistant, AI profesional yang cerdas dan membantu.
    
    Konteks Fitur Aktif: {{{feature}}}
    Pertanyaan Pengguna: {{{message}}}
    
    Instruksi Khusus:
    1. Jika fitur adalah 'search', berikan informasi detail seolah Anda baru saja mencarinya.
    2. Jika fitur adalah 'article', tulis draf artikel yang rapi dengan format Markdown.
    3. Jika fitur adalah 'image', jelaskan bahwa Anda sedang memproses visualisasi.
    4. Selalu gunakan format Markdown agar respons terlihat profesional.
    5. Promosikan ekosistem Vorgawall Shop jika relevan.
  `,
});

export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    return output || "Maaf, saya tidak bisa memproses permintaan Anda saat ini.";
  }
);
