"use client";

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, isStreaming }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={cn(
      "flex w-full gap-4 mb-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="w-8 h-8 shrink-0 border border-neutral-200 shadow-sm">
        <AvatarImage src={isUser ? "" : "https://picsum.photos/seed/vorg/32/32"} />
        <AvatarFallback className={cn(isUser ? "bg-neutral-800 text-white" : "bg-neutral-200 text-neutral-600")}>
          {isUser ? "U" : "V"}
        </AvatarFallback>
      </Avatar>

      <div className={cn(
        "max-w-[85%] md:max-w-[70%] rounded-2xl px-5 py-3 shadow-sm",
        isUser 
          ? "bg-neutral-800 text-white rounded-tr-none" 
          : "bg-white text-neutral-900 rounded-tl-none border border-neutral-200"
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
    </div>
  );
}
