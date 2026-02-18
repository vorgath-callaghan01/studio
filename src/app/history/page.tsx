"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Trash2, Calendar, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

export default function HistoryPage() {
  const [chats, setChats] = useState<ChatSession[]>([]);

  useEffect(() => {
    const savedChats = localStorage.getItem('vorgawall_chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updatedChats = chats.filter(c => c.id !== id);
    setChats(updatedChats);
    localStorage.setItem('vorgawall_chats', JSON.stringify(updatedChats));
  };

  return (
    <main className="h-screen w-full flex flex-col bg-[#F0F0F0]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#F0F0F0]/80 backdrop-blur-md border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-200">
              <MessageCircle className="w-6 h-6 text-[#0a0a0a]" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl text-[#0a0a0a]">Chat History</h1>
        </div>
      </header>

      {/* Content */}
      <ScrollArea className="flex-1 pt-24 pb-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
              <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
              <p>No chat history found.</p>
            </div>
          ) : (
            chats.map((chat) => (
              <Link key={chat.id} href={`/?id=${chat.id}`}>
                <Card className="group p-5 rounded-3xl bg-white border-neutral-100 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-200 mb-4 cursor-pointer relative">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-10">
                      <h3 className="font-bold text-[#0a0a0a] line-clamp-1 mb-2">
                        {chat.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs text-neutral-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{chat.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{chat.messages.length} messages</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 rounded-full transition-opacity"
                        onClick={(e) => deleteChat(chat.id, e)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-colors" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))
          )}
        </div>
      </ScrollArea>
      
      <p className="text-[10px] text-[#0a0a0a] text-center mb-8 uppercase tracking-[0.2em] font-bold opacity-70">
        Vorgawall Shop • Local Storage Active
      </p>
    </main>
  );
}
