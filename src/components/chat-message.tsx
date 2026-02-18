"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, ThumbsDown, Bot, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      description: "Message copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "flex w-full gap-4 mb-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="w-8 h-8 shrink-0 border border-neutral-200 shadow-sm bg-white overflow-hidden">
        <AvatarImage 
          src={isUser ? "" : "https://0xjfocldlbtienb8.public.blob.vercel-storage.com/file_000000006a147206ae541ccfce29fda9%20%281%29.png"} 
          className="object-contain p-1"
        />
        <AvatarFallback className={cn(isUser ? "bg-neutral-700 text-white" : "bg-white text-black")}>
          {isUser ? "U" : "V"}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "flex flex-col gap-2 max-w-[85%] md:max-w-[70%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-5 py-3 shadow-lg bg-neutral-800 text-white w-full",
          isUser 
            ? "rounded-tr-none" 
            : "rounded-tl-none"
        )}>
          {isStreaming && !content ? (
            <div className="py-2 flex items-center justify-center">
              <div className="dot-flashing" />
            </div>
          ) : (
            <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
              {content}
            </p>
          )}
        </div>

        {!isUser && !isStreaming && content && (
          <div className="flex items-center gap-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-500">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-neutral-400 hover:text-[#0a0a0a] hover:bg-white/20 rounded-lg transition-colors"
              onClick={handleCopy}
              title="Copy message"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-neutral-400 hover:text-[#0a0a0a] hover:bg-white/20 rounded-lg transition-colors"
              title="Good response"
            >
              <ThumbsUp className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-neutral-400 hover:text-[#0a0a0a] hover:bg-white/20 rounded-lg transition-colors"
              title="Bad response"
            >
              <ThumbsDown className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-neutral-400 hover:text-[#0a0a0a] hover:bg-white/20 rounded-lg transition-colors"
              title="Regenerate"
            >
              <Bot className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
