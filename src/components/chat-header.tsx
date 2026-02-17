import Link from 'next/link';
import { History, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#F0F0F0]/80 backdrop-blur-md border-b border-neutral-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#0a0a0a] flex items-center justify-center">
          <span className="text-white font-bold text-xs">V</span>
        </div>
        <h1 className="font-headline font-bold text-xl tracking-tight text-[#0a0a0a]">Vorgawall <span className="font-normal opacity-50">Demo</span></h1>
      </div>
      <nav className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild className="hidden sm:flex text-neutral-600 hover:text-[#0a0a0a]">
          <Link href="#" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Chat History
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild className="text-neutral-600 hover:text-[#0a0a0a]">
          <Link href="https://vorgawall.shop" target="_blank" className="flex items-center gap-2">
            vorgawall.shop
            <ExternalLink className="w-3 h-3" />
          </Link>
        </Button>
      </nav>
    </header>
  );
}