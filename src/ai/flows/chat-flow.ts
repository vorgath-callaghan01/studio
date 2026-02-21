'use server';
/**
 * @fileOverview Flow untuk menangani percakapan chatbot.
 * 
 * - chatWithAI: Fungsi utama untuk mendapatkan respon dari asisten.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('Pesan dari pengguna'),
  feature: z.string().optional().describe('Fitur aktif saat ini (search, image, article)'),
});

const ChatOutputSchema = z.string();

export async function chatWithAI(input: z.infer<typeof ChatInputSchema>): Promise<string> {
  return chatFlow(input);
}

export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { message, feature } = input;
    const lowerInput = message.toLowerCase();

    // Simulasi delay API
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Logika Dummy Berdasarkan Fitur
    if (feature === 'search') {
      return `Hasil pencarian untuk **"${message}"**: \n\nBerdasarkan data terbaru dari ekosistem **Vorgawall**, kami menemukan bahwa permintaan pasar sedang meningkat untuk kategori ini. Kami menyarankan Anda untuk fokus pada optimasi SEO dan integrasi pembayaran global.`;
    }

    if (feature === 'image') {
      return `Saya telah memproses permintaan pembuatan gambar Anda: **"${message}"**. \n\n![Generated Image](https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/800/600) \n\n*Catatan: Ini adalah gambar simulasi. Di versi produksi, Anda bisa menghubungkan ini ke model Imagen 4.*`;
    }

    if (feature === 'article') {
      return `# Judul Artikel: Masa Depan E-commerce\n\nMenanggapi permintaan Anda tentang **"${message}"**, berikut adalah draf artikel singkat:\n\nDalam era digital yang berkembang pesat, platform seperti **Vorgawall Shop** memberikan kemudahan bagi UMKM untuk go-global. Dengan fitur manajemen stok otomatis dan analitik real-time, kesuksesan bukan lagi sekadar impian.\n\n### Poin Penting:\n1. Integrasi API Global.\n2. Keamanan Transaksi.\n3. User Experience yang Modern.`;
    }

    // Respon Default (Chat Umum)
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return "Halo! Saya adalah **Vorgawall Assistant**. Bagaimana saya bisa membantu Anda membangun toko digital hari ini? Kami memiliki berbagai alat canggih untuk membantu Anda sukses di pasar global.";
    }

    if (lowerInput.includes('price') || lowerInput.includes('harga')) {
      return "Vorgawall menawarkan paket harga yang fleksibel mulai dari **$30/bulan** untuk pemula. \n\n### Paket Kami:\n- **Starter**: $30/bulan\n- **Business**: $99/bulan\n- **Enterprise**: Harga Kustom\n\nKunjungi [vorgawall.shop](https://vorgawall.shop) untuk detail lebih lanjut.";
    }

    return `Pertanyaan yang menarik tentang **"${message}"**. Dalam konteks ekosistem **Vorgawall**, kami menyediakan infrastruktur terpadu untuk menangani logistik dan pembayaran secara mulus di seluruh dunia. Tujuan kami adalah memberdayakan bisnis kecil agar bisa bersaing di skala global dengan teknologi kelas dunia.`;
  }
);
