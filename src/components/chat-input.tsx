"use client";

import { useState, useRef, useEffect } from 'react';
import { Plus, Settings2, Mic, Send, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ToolsMenu } from './tools-menu';

interface ChatInputProps {
  onSendMessage: (msg: string) => void;
  isTyping?: boolean;
}

export function ChatInput({ onSendMessage, isTyping }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Simulate recording logic
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-[#F0F0F0] via-[#F0F0F0] to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto w-full pointer-events-auto">
        
        {/* Neon Ring Container */}
        <div className="neon-ring-container rounded-3xl shadow-2xl">
          <div className="neon-ring-inner rounded-[calc(1.5rem-2px)] flex items-end p-2 md:p-3 gap-2">
            
            {/* Left Buttons */}
            <div className="flex items-center gap-1 mb-1">
              <Button size="icon" variant="ghost" className="rounded-full w-10 h-10 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors">
                <Plus className="w-5 h-5" />
              </Button>
              <div className="relative">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className={cn(
                    "rounded-full w-10 h-10 transition-colors",
                    showTools ? "text-neutral-900 bg-neutral-100" : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                  )}
                  onClick={() => setShowTools(!showTools)}
                >
                  <Settings2 className="w-5 h-5" />
                </Button>
                {showTools && <ToolsMenu onClose={() => setShowTools(false)} />}
              </div>
            </div>

            {/* Input Area */}
            <textarea
              ref={textareaRef}
              rows={1}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isRecording ? "Listening..." : "Message Vorgawall..."}
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-40 py-3 px-2 text-neutral-800 placeholder:text-neutral-400 font-body text-base"
            />

            {/* Right Buttons */}
            <div className="flex items-center gap-2 mb-1">
              <Button 
                onClick={toggleRecording}
                size="icon" 
                variant="ghost" 
                className={cn(
                  "rounded-full w-10 h-10 transition-all",
                  isRecording 
                    ? "bg-red-50 text-red-500 hover:bg-red-100 animate-pulse" 
                    : "text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100"
                )}
              >
                {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button 
                onClick={handleSubmit}
                disabled={!value.trim() && !isRecording}
                size="icon" 
                className={cn(
                  "rounded-full w-10 h-10 transition-all duration-300",
                  value.trim() ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-400"
                )}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-neutral-400 text-center mt-3 uppercase tracking-widest font-medium">
          Powered by Vorgawall AI • Demo Version
        </p>
      </div>
    </div>
  );
}