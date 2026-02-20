"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle, Trash2, Calendar, ChevronRight, MessageSquare, AlertCircle } from 'lucide-react';
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
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  attachments?: any[];
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
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showClearAllAlert, setShowClearAllAlert] = useState(false);

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
    setShowDeleteAlert(false);
    toast({
      description: "Conversation deleted successfully.",
      className: "rounded-3xl bg-neutral-800 text-white border-neutral-700 shadow-2xl p-5",
    });
  };

  const confirmClearAll = () => {
    setChats([]);
    localStorage.removeItem('vorgawall_chats');
    setShowClearAllAlert(false);
    toast({
      description: "All chat history cleared.",
      className: "rounded-3xl bg-neutral-800 text-white border-neutral-700 shadow-2xl p-5",
    });
  };

  return (
    <main className="h-screen w-full flex flex-col bg-[#F0F0F0] overflow-hidden">
      {/* Header */}
      <header className="flex-none flex items-center justify-between px-6 py-4 bg-[#F0F0F0]/80 backdrop-blur-md border-b border-neutral-200">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-200">
              <MessageCircle className="w-6 h-6 text-[#0a0a0a]" />
            </Button>
          </Link>
          <h1 className="font-headline font-bold text-xl text-[#0a0a0a]">Chat History</h1>
        </div>
        
        {chats.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-destructive hover:bg-destructive/10 rounded-full text-xs font-bold uppercase tracking-wider"
            onClick={()={() => setShowClearAllAlert(true)}}
          >
            Clear All
          </Button>
        )}
      </header>

      {/* Content */}
      <ScrollArea className="flex-1 px-4 md:px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-4 pb-10">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-40 text-neutral-400">
              <MessageSquare className="w-16 h-16 mb-4 opacity-10" />
              <p className="text-sm font-medium">No chat history found.</p>
              <Link href="/" className="mt-4">
                <Button variant="outline" className="rounded-full border-neutral-300 text-neutral-600 hover:bg-white transition-colors">
                  Start a new chat
                </Button>
              </Link>
            </div>
          ) : (
            chats.map((chat) => (
              <div key={chat.id} className="relative group">
                <Card className="p-0 rounded-3xl bg-white border-neutral-100 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="flex items-stretch">
                    <Link href={`/?id=${chat.id}`} className="flex-1 p-5">
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
                    </Link>
                    
                    <div className="flex items-center pr-4 gap-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-neutral-300 hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDeleteId(chat.id);
                          setShowDeleteAlert(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Link href={`/?id=${chat.id}`}>
                        <Button variant="ghost" size="icon" className="rounded-full hover:bg-neutral-100">
                           <ChevronRight className="w-5 h-5 text-neutral-400" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </div>
            ))
          )}
          
          <div className="pt-10 flex flex-col items-center gap-2">
            <p className="text-[10px] text-[#0a0a0a] text-center uppercase tracking-[0.2em] font-bold opacity-30">
              Vorgawall Shop • Local Storage Active
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Delete Single Chat Alert */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="rounded-3xl border-neutral-700 bg-neutral-800 text-white max-w-[90vw] md:max-w-md mx-auto p-6 z-[100]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-white">Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Are you sure you want to permanently delete this conversation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 mt-4">
            <AlertDialogCancel className="rounded-full bg-white text-black hover:bg-neutral-200 border-none">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="rounded-full bg-destructive text-white hover:bg-destructive/90 border-none"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Clear All Chats Alert */}
      <AlertDialog open={showClearAllAlert} onOpenChange={setShowClearAllAlert}>
        <AlertDialogContent className="rounded-3xl border-neutral-700 bg-neutral-800 text-white max-w-[90vw] md:max-w-md mx-auto p-6 z-[100]">
          <AlertDialogHeader className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-xl font-bold text-white">Clear All History</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              This will permanently delete ALL your chat history. Are you absolutely sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 mt-6 sm:justify-center">
            <AlertDialogCancel className="rounded-full bg-white text-black hover:bg-neutral-200 border-none flex-1">Keep History</AlertDialogCancel>
            <AlertDialogAction 
              className="rounded-full bg-destructive text-white hover:bg-destructive/90 border-none flex-1"
              onClick={confirmClearAll}
            >
              Yes, Clear All
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}