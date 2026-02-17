"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatHeader } from '@/components/chat-header';
import { ChatMessage } from '@/components/chat-message';
import { ChatInput } from '@/components/chat-input';
import { ChatWelcome } from '@/components/chat-welcome';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    const userMsg: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMsg]);
    
    // Simulate assistant response
    setIsTyping(true);
    setTimeout(() => {
      const response: Message = { 
        role: 'assistant', 
        content: getMockResponse(content) 
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
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