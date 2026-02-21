"use client";

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Code, Globe, AlertCircle, Ban, ShoppingCart } from 'lucide-react';
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
          <h1 className="font-headline font-bold text-xl text-[#0a0a0a]">Commercial License</h1>
        </div>
      </header>

      {/* Content */}
      <ScrollArea className="flex-1 px-4 md:px-8 py-10">
        <div className="max-w-3xl mx-auto space-y-8 pb-20">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-[#0a0a0a]">Vorgawall AI Enterprise</h2>
            <p className="text-destructive uppercase tracking-widest text-xs font-black">Strict Ownership & Usage Policy</p>
          </div>

          <Card className="p-8 rounded-3xl bg-white border-neutral-100 shadow-sm space-y-8">
            <div className="bg-neutral-900 text-white p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h4 className="font-bold text-lg">Missing a License?</h4>
                <p className="text-neutral-400 text-xs">Usage without purchase from our official shop is illegal.</p>
              </div>
              <Link href="https://vorgawall.shop">
                <Button className="rounded-full bg-white text-black hover:bg-neutral-200 gap-2 font-bold px-6">
                  <ShoppingCart className="w-4 h-4" />
                  Buy Official License
                </Button>
              </Link>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Ban className="w-5 h-5 text-destructive" />
                <h3 className="text-lg font-bold">1. Mandatory Purchase Policy</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                You MUST purchase this source code directly from <span className="text-[#0a0a0a] font-bold underline">vorgawall.shop</span> before downloading or using it. Accessing this code via GitHub or other repositories does not grant you the right to use, modify, or deploy the software.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-bold">2. Anti-Redistribution Clause</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Redistributing, reselling, sub-licensing, or sharing the source code in its original or modified form is strictly forbidden. You cannot use this code to create "AI Templates" or "Chatbot Starters" that compete with Vorgawall Shop products.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold">3. Developer Limit</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Each license is valid for <span className="font-bold">one (1) developer</span>. For team or agency use, multiple licenses or an Enterprise License must be acquired.
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-3 text-[#0a0a0a]">
                <Globe className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold">4. Legal Enforcement</h3>
              </div>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Vorgawall Shop reserves the right to take legal action against individuals or organizations found using this software without a verifiable purchase record. 
              </p>
            </section>

            <div className="pt-6 border-t border-neutral-100 flex flex-col items-center gap-4">
               <p className="text-[10px] text-[#0a0a0a] text-center uppercase tracking-[0.2em] font-bold opacity-30">
                © 2026 Vorgawall Shop • Premium AI Solutions
              </p>
            </div>
          </Card>
        </div>
      </ScrollArea>
    </main>
  );
}
