'use server';
/**
 * @fileOverview Flow untuk menangani asisten suara menggunakan Gemini 1.5 Flash (Optimized for Dialog).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const VoiceInputSchema = z.object({
  transcript: z.string().describe('Teks hasil transkrip suara pengguna'),
});

const VoiceOutputSchema = z.object({
  replyText: z.string().describe('Respon teks dari asisten'),
});

export async function processVoice(input: z.infer<typeof VoiceInputSchema>): Promise<z.infer<typeof VoiceOutputSchema>> {
  return voiceFlow(input);
}

const voicePrompt = ai.definePrompt({
  name: 'voicePrompt',
  // Kita bisa menggunakan model yang sama atau berbeda (misal: pro jika butuh lebih cerdas)
  // Di sini kita tetap pakai flash agar latency suara tetap rendah
  model: 'googleai/gemini-1.5-flash', 
  input: { schema: VoiceInputSchema },
  output: { schema: z.string() },
  config: {
    temperature: 0.7, // Sedikit lebih kreatif untuk percakapan suara
  },
  prompt: `
    Anda adalah asisten suara Vorgawall. 
    Berikan jawaban yang singkat, padat, dan ramah karena ini untuk interaksi suara.
    Hindari menggunakan simbol Markdown yang rumit.
    
    Input Suara: {{{transcript}}}
  `,
});

export const voiceFlow = ai.defineFlow(
  {
    name: 'voiceFlow',
    inputSchema: VoiceInputSchema,
    outputSchema: VoiceOutputSchema,
  },
  async (input) => {
    const { output } = await voicePrompt(input);
    return { replyText: output || "Saya mendengarkan, ada yang bisa saya bantu?" };
  }
);
