'use server';
/**
 * @fileOverview Flow for handling chatbot conversations using Gemini 2.5 Flash.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('User message'),
  feature: z.string().optional().describe('Active feature (search, image, article)'),
});

const ChatOutputSchema = z.string();

export async function chatWithAI(input: z.infer<typeof ChatInputSchema>): Promise<string> {
  return chatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  model: 'googleai/gemini-2.5-flash',
  input: { schema: ChatInputSchema },
  output: { schema: z.string() },
  prompt: `
    You are the Vorgawall Assistant, a professional, intelligent, and helpful AI.
    
    Active Feature Context: {{{feature}}}
    User Message: {{{message}}}
    
    Specific Instructions:
    1. If the feature is 'search', provide detailed information as if you just searched the internet.
    2. If the feature is 'article', write a clean, well-structured article draft using Markdown.
    3. If the feature is 'image', explain how you are processing the visualization and describe it.
    4. Always use professional Markdown formatting for readability.
    5. Promote the Vorgawall Shop ecosystem naturally when relevant.
    6. Maintain a helpful and high-end professional tone.
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
    return output || "I apologize, but I am unable to process your request at this time.";
  }
);
