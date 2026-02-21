'use server';
/**
 * @fileOverview Flow untuk menangani asisten suara (Live Voice).
 * 
 * - processVoice: Fungsi utama untuk mendapatkan respon suara dari asisten.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VoiceInputSchema = z.object({
  transcript: z.string().describe('Teks hasil transkrip suara pengguna (simulasi)'),
});

const VoiceOutputSchema = z.object({
  replyText: z.string().describe('Respon teks dari asisten'),
});

export async function processVoice(input: z.infer<typeof VoiceInputSchema>): Promise<z.infer<typeof VoiceOutputSchema>> {
  return voiceFlow(input);
}

export const voiceFlow = ai.defineFlow(
  {
    name: 'voiceFlow',
    inputSchema: VoiceInputSchema,
    outputSchema: VoiceOutputSchema,
  },
  async (input) => {
    const { transcript } = input;
    
    // Simulasi delay pemrosesan suara agar terasa natural
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const lowerTranscript = transcript.toLowerCase();

    // Logika Dummy Berdasarkan Kata Kunci
    if (lowerTranscript.includes('halo') || lowerTranscript.includes('hi')) {
      return { replyText: "Halo! Saya adalah asisten suara Vorgawall. Bagaimana kabar Anda hari ini? Ada yang bisa saya bantu dengan toko digital Anda?" };
    }

    if (lowerTranscript.includes('produk') || lowerTranscript.includes('jual')) {
      return { replyText: "Platform Vorgawall dirancang untuk memaksimalkan penjualan produk Anda secara global. Kami memiliki fitur analitik yang sangat tajam." };
    }

    if (lowerTranscript.includes('harga') || lowerTranscript.includes('bayar')) {
      return { replyText: "Sistem pembayaran kami sangat aman dan mendukung berbagai mata uang dunia. Anda bisa fokus berjualan tanpa khawatir masalah transaksi." };
    }

    return { replyText: `Menarik sekali. Mengenai "${transcript}", tim kami di Vorgawall selalu berusaha memberikan solusi infrastruktur terbaik untuk bisnis skala kecil maupun besar.` };
  }
);
