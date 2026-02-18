"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Trash2, Calendar, ChevronRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem('vorgawall_chats');
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  const confirmDelete = () => {
    if (!deleteId) return;
    const updatedChats = chats.filter(c => c.id !== deleteId);
    setChats(updatedChats);
    localStorage.setItem('vorgawall_chats', JSON.stringify(updatedChats));
    setDeleteId(null);
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
              <div key={chat.id} className="relative">
                <Link href={`/?id=${chat.id}`}>
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
                        <ChevronRight className="w-5 h-5 text-neutral-300 group-hover:text-neutral-900 transition-colors" />
                      </div>
                    </div>
                  </Card>
                </Link>

                <div className="absolute right-12 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10 rounded-full"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeleteId(chat.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="rounded-3xl border-neutral-200 bg-white max-w-[90vw] md:max-w-md mx-auto p-6">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold">Delete Conversation</AlertDialogTitle>
                        <AlertDialogDescription className="text-neutral-500">
                          Are you sure you want to permanently delete this conversation?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="gap-2 mt-4">
                        <AlertDialogCancel className="rounded-full border-neutral-200">Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          className="rounded-full bg-destructive text-white hover:bg-destructive/90"
                          onClick={confirmDelete}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
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
