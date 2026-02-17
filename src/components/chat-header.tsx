import Link from 'next/link';
import { ArrowLeft, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#F0F0F0]/80 backdrop-blur-md border-b border-neutral-200">
      <div className="flex items-center gap-6">
        <Link href="https://vorgawall.shop" className="text-neutral-600 hover:text-[#0a0a0a] transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div className="flex flex-col">
          <h1 className="font-headline font-bold text-xl leading-none text-[#0a0a0a]">Vorgawall</h1>
          <span className="font-headline text-neutral-400 text-sm font-medium">Demo</span>
        </div>
      </div>
      
      <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-[#0a0a0a] rounded-full">
        <MoreHorizontal className="w-6 h-6" />
      </Button>
    </header>
  );
}
