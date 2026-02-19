"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Code, Globe, AlertCircle, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

export default function LicensePage() {
  return (
    <main className="h-screen w-full flex flex-col bg-[#F0F0F0] overflow-hidden">
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-6 py-4 bg-[#F0F0F0]/80 backdrop-blur-md border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-200">
              <ArrowLeft className="w-6 h-6 text-[#0a0a0a]" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl text-[#0a0a0a]">Software License</h1>
        </div>
      </header>

      {/* Content */}
      <ScrollArea className="flex-1 px-4 md:px-8 py-10">
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-[#0a0a0a]">Basic AI Chatbot</h2>
            <p className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Standard License Agreement by Vorgawall Shop</p>
          </div>

          <Card className="p-8 rounded-3xl bg-white border-neutral-100 shadow-sm space-y-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold">1. Grant of License</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Vorgawall Shop grants you a non-exclusive, non-transferable, worldwide license to use the Software for personal and commercial client projects. You may modify the code and deploy it to production environments.
              </p>
              <div className="bg-red-50 p-4 rounded-2xl flex gap-3">
                <Ban className="w-5 h-5 text-red-600 shrink-0" />
                <div className="text-xs text-red-900 leading-relaxed">
                  <strong>Strictly Prohibited:</strong> You cannot redistribute, resell, sublicense, or share the source code. Publicly uploading the source code (e.g., to GitHub) is forbidden.
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold">2. Single Developer License</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                This license is valid for <strong>one developer</strong>. You can use the Software for unlimited projects, but the license is tied to you and is not transferable.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Globe className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold">3. Commercial Usage</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                You may monetize applications built with this Software. However, you cannot sell the source code itself as a template or boilerplate product that competes with Vorgawall Shop.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <FileText className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold">4. Support and Updates</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                We provide 30 days of basic support via email. Minor updates are included, while major feature updates may require a separate purchase.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <AlertCircle className="w-5 h-5 text-neutral-400" />
                <h3 className="text-lg font-bold">5. No Warranty</h3>
              </div>
              <p className="text-xs text-neutral-500 italic leading-relaxed uppercase bg-neutral-50 p-4 rounded-2xl">
                The software is provided "as is" without warranties of any kind. Vorgawall Shop is not liable for any damages resulting from the use or inability to use this software.
              </p>
            </section>

            <div className="pt-6 border-t border-neutral-100 flex flex-col items-center gap-4">
               <p className="text-[10px] text-[#0a0a0a] text-center uppercase tracking-[0.2em] font-bold opacity-30">
                Vorgawall Shop • License Version 1.0
              </p>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </main>
  );
}
