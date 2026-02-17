"use client";

import { useState, useRef, useEffect } from 'react';
import { Plus, Settings2, AudioLines, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ToolsMenu } from './tools-menu';

interface ChatInputProps {
  onSendMessage: (msg: string) => void;
  isTyping?: boolean;
}

export function ChatInput({ onSendMessage, isTyping }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [showTools, setShowTools] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (value.trim()) {
      onSendMessage(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const hasText = value.trim().length > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-[#F0F0F0] via-[#F0F0F0] to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto w-full pointer-events-auto">
        
        <div className="bg-[#171717] rounded-3xl shadow-2xl overflow-hidden p-4 md:p-5 flex flex-col gap-2 transition-all duration-300 border border-white/5">
          {/* Top Row: Input Area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none max-h-40 p-0 text-white placeholder:text-neutral-500 font-body text-lg leading-relaxed"
          />

          {/* Bottom Row: Actions */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <Button 
                size="icon" 
                variant="ghost" 
                className="rounded-full w-8 h-8 text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </Button>
              
              <div className="relative">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn(
                    "rounded-full w-8 h-8 transition-colors",
                    showTools ? "text-white bg-white/10" : "text-neutral-400 hover:text-white hover:bg-white/10"
                  )}
                  onClick={() => setShowTools(!showTools)}
                >
                  <Settings2 className="w-5 h-5" />
                </Button>
                {showTools && <ToolsMenu onClose={() => setShowTools(false)} />}
              </div>
            </div>

            <div className="relative w-10 h-10 flex items-center justify-center">
              {/* Transition between AudioLines and ArrowUp */}
              <button
                onClick={handleSubmit}
                disabled={!hasText}
                className={cn(
                  "absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out",
                  hasText 
                    ? "bg-white text-black scale-100 rotate-0 opacity-100" 
                    : "bg-transparent text-neutral-400 scale-90 rotate-90 opacity-0 pointer-events-none"
                )}
              >
                <ArrowUp className="w-5 h-5 stroke-[2.5px]" />
              </button>
              
              <button
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out",
                  !hasText 
                    ? "opacity-100 scale-100 rotate-0 text-neutral-400" 
                    : "opacity-0 scale-50 -rotate-90 pointer-events-none"
                )}
              >
                <AudioLines className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-neutral-400 text-center mt-4 uppercase tracking-[0.2em] font-semibold opacity-50">
          Powered by Vorgawall AI
        </p>
      </div>
    </div>
  );
}
