import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Inisialisasi AI dengan pengecekan API Key agar tidak menyebabkan crash/hang saat start-up
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || 'dummy-key-for-build',
    }),
  ],
  model: 'googleai/gemini-2.5-flash',
});
