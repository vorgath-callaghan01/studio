'use server';
/**
 * @fileOverview Flow for handling voice assistant interactions using Gemini 2.5 Flash (Optimized for Dialog).
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VoiceInputSchema = z.object({
  transcript: z.string().describe('User voice transcript'),
});

const VoiceOutputSchema = z.object({
  replyText: z.string().describe('Assistant text response'),
});

export async function processVoice(input: z.infer<typeof VoiceInputSchema>): Promise<z.infer<typeof VoiceOutputSchema>> {
  return voiceFlow(input);
}

const voicePrompt = ai.definePrompt({
  name: 'voicePrompt',
  model: 'googleai/gemini-2.5-flash-native-audio-preview-12-2025', 
  input: { schema: VoiceInputSchema },
  output: { schema: z.string() },
  config: {
    temperature: 0.9,
  },
  prompt: `
    You are the Vorgawall Voice Assistant. 
    Provide concise, friendly, and helpful responses suitable for voice interaction.
    Avoid complex Markdown formatting as this text will be spoken.
    
    User Input: {{{transcript}}}
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
    return { replyText: output || "I'm listening. How can I help you today?" };
  }
);
