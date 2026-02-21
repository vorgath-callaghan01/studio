import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Inisialisasi Genkit
// Satu API Key ini bisa mengakses semua model Gemini (Flash, Pro, dll)
export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_API_KEY,
    }),
  ],
});
