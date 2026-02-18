"use client";

import Link from 'next/link';
import { ArrowLeft, MoreHorizontal, Pencil, History, Trash2, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="bg-[#171717] hover:bg-[#262626] text-white hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors focus:ring-0 focus-visible:ring-0"
          >
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-3xl p-2 min-w-[180px] bg-neutral-800 border-neutral-700 shadow-xl">
          <DropdownMenuItem className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700">
            <Pencil className="w-4 h-4 text-neutral-400" />
            <span className="font-medium text-neutral-100">Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700">
            <History className="w-4 h-4 text-neutral-400" />
            <span className="font-medium text-neutral-100">History Chat</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-2xl gap-3 py-3 cursor-pointer text-destructive focus:text-destructive hover:bg-neutral-700 focus:bg-neutral-700">
            <Trash2 className="w-4 h-4" />
            <span className="font-medium">Delete</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700">
            <Bug className="w-4 h-4 text-neutral-400" />
            <span className="font-medium text-neutral-100">Reports bug</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
