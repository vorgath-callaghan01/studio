"use client";

import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get('id');
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  // Load chat from local storage if ID is present
  useEffect(() => {
    if (chatId) {
      const savedChats = localStorage.getItem('vorgawall_chats');
      if (savedChats) {
        const chats: ChatSession[] = JSON.parse(savedChats);
        const currentChat = chats.find(c => c.id === chatId);
        if (currentChat) {
          setMessages(currentChat.messages);
        }
      }
    } else {
      setMessages([]);
    }
  }, [chatId]);

  const handleSendMessage = (content: string) => {
    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    
    // Save/Update to Local Storage
    saveChatToLocal(newMessages);

    // Simulate assistant response
    setIsTyping(true);
    setTimeout(() => {
      const assistantMsg: Message = { 
        role: 'assistant', 
        content: getMockResponse(content) 
      };
      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      saveChatToLocal(finalMessages);
      setIsTyping(false);
    }, 1500);
  };

  const saveChatToLocal = (msgs: Message[]) => {
    const savedChats = localStorage.getItem('vorgawall_chats');
    let chats: ChatSession[] = savedChats ? JSON.parse(savedChats) : [];
    
    const currentId = chatId || Math.random().toString(36).substring(7);
    const existingIndex = chats.findIndex(c => c.id === currentId);

    const updatedChat: ChatSession = {
      id: currentId,
      title: msgs[0]?.content.substring(0, 30) || 'New Chat',
      date: new Date().toLocaleString(),
      messages: msgs
    };

    if (existingIndex > -1) {
      chats[existingIndex] = updatedChat;
    } else {
      chats.unshift(updatedChat);
      // Update URL without refreshing if it's a new chat
      if (!chatId) {
        window.history.pushState({}, '', `?id=${currentId}`);
      }
    }

    localStorage.setItem('vorgawall_chats', JSON.stringify(chats));
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
    <main className="relative h-screen w-full flex flex-col bg-[#F0F0F0] overflow-hidden">
      <ChatHeader />
      
      <ScrollArea className="flex-1 pt-20 pb-40">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
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
    </main>
  );
}
