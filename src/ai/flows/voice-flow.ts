
'use server';
/**
 * @fileOverview Flow untuk menangani asisten suara menggunakan Gemini.
 * 
 * - processVoice: Fungsi utama untuk mendapatkan respon suara dari asisten.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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
  input: { schema: VoiceInputSchema },
  output: { schema: z.string() },
  prompt: `
    Anda adalah asisten suara Vorgawall. 
    Berikan jawaban yang singkat, padat, dan ramah karena ini untuk interaksi suara.
    Hindari menggunakan terlalu banyak simbol Markdown yang sulit dibaca oleh Text-to-Speech.
    
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
