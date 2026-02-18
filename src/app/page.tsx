"use client";

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChatHeader } from '@/components/chat-header';
import { ChatMessage } from '@/components/chat-message';
import { ChatInput } from '@/components/chat-input';
import { ChatWelcome } from '@/components/chat-welcome';
import { ScrollArea } from '@/components/ui/scroll-area';

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

function ChatContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get('id');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChat, setCurrentChat] = useState<ChatSession | null>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedChats = localStorage.getItem('vorgawall_chats');
    if (chatId && savedChats) {
      const chats: ChatSession[] = JSON.parse(savedChats);
      const session = chats.find(c => c.id === chatId);
      if (session) {
        setMessages(session.messages);
        setCurrentChat(session);
        return;
      }
    }
    setMessages([]);
    setCurrentChat(null);
  }, [chatId]);

  const handleSendMessage = (content: string) => {
    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    
    const activeId = saveChatToLocal(newMessages);

    setIsTyping(true);
    setTimeout(() => {
      const assistantMsg: Message = { 
        role: 'assistant', 
        content: getMockResponse(content) 
      };
      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      saveChatToLocal(finalMessages, activeId);
      setIsTyping(false);
    }, 1500);
  };

  const saveChatToLocal = (msgs: Message[], forceId?: string) => {
    const savedChats = localStorage.getItem('vorgawall_chats');
    let chats: ChatSession[] = savedChats ? JSON.parse(savedChats) : [];
    
    const currentId = chatId || forceId || Math.random().toString(36).substring(7);
    const existingIndex = chats.findIndex(c => c.id === currentId);

    const updatedChat: ChatSession = {
      id: currentId,
      title: currentChat?.title || msgs[0]?.content.substring(0, 30) || 'New Chat',
      date: currentChat?.date || new Date().toLocaleString(),
      messages: msgs
    };

    if (existingIndex > -1) {
      chats[existingIndex] = updatedChat;
    } else {
      chats.unshift(updatedChat);
      if (!chatId) {
        window.history.pushState({}, '', `?id=${currentId}`);
      }
    }

    setCurrentChat(updatedChat);
    localStorage.setItem('vorgawall_chats', JSON.stringify(chats));
    return currentId;
  };

  const handleRename = (newTitle: string) => {
    if (!currentChat) return;
    const savedChats = localStorage.getItem('vorgawall_chats');
    if (savedChats) {
      let chats: ChatSession[] = JSON.parse(savedChats);
      const index = chats.findIndex(c => c.id === currentChat.id);
      if (index > -1) {
        chats[index].title = newTitle;
        localStorage.setItem('vorgawall_chats', JSON.stringify(chats));
        setCurrentChat({ ...currentChat, title: newTitle });
      }
    }
  };

  const handleDelete = () => {
    if (!currentChat) return;
    const savedChats = localStorage.getItem('vorgawall_chats');
    if (savedChats) {
      let chats: ChatSession[] = JSON.parse(savedChats);
      const filtered = chats.filter(c => c.id !== currentChat.id);
      localStorage.setItem('vorgawall_chats', JSON.stringify(filtered));
      router.push('/');
    }
  };

  const getMockResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) return "Hello! I'm the Vorgawall Assistant. How can I help you build your shop today?";
    if (lowerInput.includes('price')) return "Vorgawall offers flexible pricing starting from $0/mo for starters. Check out vorgawall.shop for details.";
    return "That's an interesting question. In the context of the Vorgawall ecosystem, we provide a unified API to handle global logistics and payments seamlessly.";
  };

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <ChatHeader 
        title={currentChat?.title} 
        onRename={handleRename}
        onDelete={handleDelete}
      />
      
      <ScrollArea className="flex-1 min-h-0">
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-24 pb-44">
          {messages.length === 0 ? (
            <ChatWelcome />
          ) : (
            <div className="flex flex-col">
              {messages.map((msg, i) => (
                <ChatMessage 
                  key={i} 
                  role={msg.role} 
                  content={msg.content} 
                />
              ))}
              {isTyping && (
                <ChatMessage 
                  role="assistant" 
                  content="" 
                  isStreaming={true} 
                />
              )}
              <div ref={scrollEndRef} />
            </div>
          )}
        </div>
      </ScrollArea>

      <ChatInput onSendMessage={handleSendMessage} isTyping={isTyping} />
    </div>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col bg-[#F0F0F0] overflow-hidden fixed inset-0">
      <Suspense fallback={
        <div className="h-full w-full flex items-center justify-center bg-[#F0F0F0]">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg relative overflow-hidden">
               <Image 
                src="https://0xjfocldlbtienb8.public.blob.vercel-storage.com/file_000000006a147206ae541ccfce29fda9%20%281%29.png"
                alt="Loading..."
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="h-4 w-24 bg-neutral-200 rounded-full" />
          </div>
        </div>
      }>
        <ChatContent />
      </Suspense>
    </main>
  );
}
