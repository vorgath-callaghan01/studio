"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Settings2, AudioLines, ArrowUp, Camera, Image as ImageIcon, FileUp, Search, Sparkles, FileText, X, File } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Attachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
}

interface ChatInputProps {
  onSendMessage: (msg: string, attachments?: Attachment[]) => void;
  isTyping?: boolean;
}

interface Feature {
  id: string;
  label: string;
  placeholder: string;
  icon: any;
}

const FEATURES: Record<string, Feature> = {
  search: {
    id: 'search',
    label: 'Search',
    placeholder: 'Search for anything you want on the internet...',
    icon: Search,
  },
  image: {
    id: 'image',
    label: 'Image Generate',
    placeholder: 'Creativity above all else...',
    icon: Sparkles,
  },
  article: {
    id: 'article',
    label: 'Create Articles',
    placeholder: 'Write any article, you are in control...',
    icon: FileText,
  }
};

export function ChatInput({ onSendMessage, isTyping }: ChatInputProps) {
  const [value, setValue] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
  const [openMenu, setOpenMenu] = useState<'plus' | 'settings' | null>(null);
  
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (value.trim() || attachments.length > 0) {
      onSendMessage(value, attachments);
      setValue('');
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'file') => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      const newAttachment: Attachment = {
        id: Math.random().toString(36).substring(7),
        type,
        url,
        name: file.name
      };
      setAttachments(prev => [...prev, newAttachment]);
    });
    
    e.target.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const hasContent = value.trim().length > 0 || attachments.length > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-[#F0F0F0] via-[#F0F0F0] to-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto w-full pointer-events-auto">
        
        <input 
          type="file" 
          ref={cameraInputRef} 
          accept="image/*" 
          capture="environment" 
          className="hidden" 
          onChange={(e) => handleFileChange(e, 'image')}
        />
        <input 
          type="file" 
          ref={galleryInputRef} 
          accept="image/*" 
          className="hidden" 
          multiple
          onChange={(e) => handleFileChange(e, 'image')}
        />
        <input 
          type="file" 
          ref={fileInputRef} 
          accept=".pdf,.txt,.html,.js,.css,.tsx,.json,.md,.doc,.docx" 
          className="hidden" 
          multiple
          onChange={(e) => handleFileChange(e, 'file')}
        />
        
        <div className="bg-[#171717] rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden p-4 md:p-5 flex flex-col gap-2 transition-all duration-300 border border-white/5">
          
          {attachments.length > 0 && (
            <div className="flex flex-row overflow-x-auto gap-3 mb-2 pb-2 scrollbar-hide animate-in fade-in slide-in-from-top-2 duration-300">
              {attachments.map((file) => (
                <div key={file.id} className="relative flex-shrink-0 group">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 bg-neutral-800 flex items-center justify-center shadow-lg">
                    {file.type === 'image' ? (
                      <img src={file.url} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-2 text-center">
                        <File className="w-8 h-8 text-neutral-400 mb-1" />
                        <span className="text-[10px] text-white truncate w-16 px-1">{file.name}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => removeAttachment(file.id)}
                    className="absolute -top-1 -right-1 bg-neutral-900 text-white rounded-full p-1 shadow-md border border-white/20 hover:bg-neutral-700 transition-colors z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={activeFeature ? activeFeature.placeholder : "Ask anything..."}
            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none outline-none resize-none max-h-40 p-0 text-white placeholder:text-neutral-500 font-body text-lg leading-relaxed shadow-none"
          />

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-3">
              <DropdownMenu 
                open={openMenu === 'plus'} 
                onOpenChange={(open) => setOpenMenu(open ? 'plus' : null)}
              >
                <DropdownMenuTrigger asChild>
                  <button 
                    type="button"
                    className="rounded-full w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="top" align="start" className="rounded-3xl p-2 min-w-[180px] bg-neutral-800 border-neutral-700 shadow-2xl mb-2">
                  <DropdownMenuItem 
                    className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera className="w-4 h-4 text-neutral-400" />
                    <span className="font-medium text-neutral-100">Camera</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700"
                    onClick={() => galleryInputRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4 text-neutral-400" />
                    <span className="font-medium text-neutral-100">Upload image</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <FileUp className="w-4 h-4 text-neutral-400" />
                    <span className="font-medium text-neutral-100">Upload file</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {activeFeature ? (
                <div className="flex items-center gap-2 bg-[#2a2a2a] text-white px-4 py-1.5 rounded-full border border-white/10 animate-in fade-in zoom-in-95 duration-200">
                  <activeFeature.icon className="w-4 h-4 text-white" />
                  <span className="text-sm font-medium">{activeFeature.label}</span>
                  <button 
                    onClick={() => setActiveFeature(null)}
                    className="ml-1 hover:text-neutral-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <DropdownMenu 
                  open={openMenu === 'settings'} 
                  onOpenChange={(open) => setOpenMenu(open ? 'settings' : null)}
                >
                  <DropdownMenuTrigger asChild>
                    <button 
                      type="button"
                      className="rounded-full w-8 h-8 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
                    >
                      <Settings2 className="w-5 h-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="start" className="rounded-3xl p-2 min-w-[180px] bg-neutral-800 border-neutral-700 shadow-2xl mb-2">
                    <DropdownMenuItem 
                      className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700"
                      onClick={() => setActiveFeature(FEATURES.search)}
                    >
                      <Search className="w-4 h-4 text-neutral-400" />
                      <span className="font-medium text-neutral-100">Search</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700"
                      onClick={() => setActiveFeature(FEATURES.image)}
                    >
                      <Sparkles className="w-4 h-4 text-neutral-400" />
                      <span className="font-medium text-neutral-100">Image Generate</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700"
                      onClick={() => setActiveFeature(FEATURES.article)}
                    >
                      <FileText className="w-4 h-4 text-neutral-400" />
                      <span className="font-medium text-neutral-100">Create Articles</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            <div className="relative w-10 h-10 flex items-center justify-center">
              <button
                onClick={handleSubmit}
                disabled={!hasContent}
                className={cn(
                  "absolute inset-0 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out focus:outline-none",
                  hasContent 
                    ? "bg-white text-black scale-100 rotate-0 opacity-100 shadow-lg" 
                    : "bg-transparent text-neutral-400 scale-90 rotate-90 opacity-0 pointer-events-none"
                )}
              >
                <ArrowUp className="w-5 h-5 stroke-[2.5px]" />
              </button>
              
              <Link 
                href="/live-voice"
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out focus:outline-none",
                  !hasContent 
                    ? "opacity-100 scale-100 rotate-0 text-neutral-400" 
                    : "opacity-0 scale-50 -rotate-90 pointer-events-none"
                )}
              >
                <AudioLines className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-[10px] text-[#0a0a0a] text-center mt-4 uppercase tracking-[0.2em] font-bold opacity-70">
          Powered by Vorgawall Shop • Demo Version
        </p>
      </div>
    </div>
  );
}