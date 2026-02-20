"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Copy, ThumbsUp, ThumbsDown, Bot, Check, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface Attachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
}

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isStreaming?: boolean;
  attachments?: Attachment[];
}

export function ChatMessage({ role, content, isStreaming, attachments }: ChatMessageProps) {
  const isUser = role === 'user';
  const [copied, setCopied] = useState(false);
  const [showDislikeDialog, setShowDislikeDialog] = useState(false);
  const [showModelInfoDialog, setShowModelInfoDialog] = useState(false);
  const [dislikeReason, setDislikeReason] = useState('');

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast({
      description: "Message copied to clipboard",
      className: "rounded-3xl bg-neutral-800 text-white border-neutral-700 shadow-2xl p-5",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleThumbsUp = () => {
    toast({
      description: "Thank you for liking our chatbot!",
      className: "rounded-3xl bg-neutral-800 text-white border-neutral-700 shadow-2xl p-5",
    });
  };

  const handleDislikeSubmit = () => {
    if (dislikeReason.trim()) {
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your honest feedback. We'll use it to improve!",
        className: "rounded-3xl bg-neutral-800 text-white border-neutral-700 shadow-2xl p-5",
      });
      setDislikeReason('');
      setShowDislikeDialog(false);
    } else {
      toast({
        variant: "destructive",
        description: "Please provide a reason.",
      });
    }
  };

  return (
    <>
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
            "rounded-2xl px-5 py-3 shadow-lg w-full flex flex-col gap-3",
            isUser 
              ? "rounded-tr-none bg-neutral-800 text-white" 
              : "rounded-tl-none bg-neutral-800 text-white"
          )}>
            {/* Attachments Section */}
            {attachments && attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-1">
                {attachments.map((att) => (
                  <div key={att.id} className="max-w-full">
                    {att.type === 'image' ? (
                      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-neutral-900/50">
                        <img 
                          src={att.url} 
                          alt={att.name} 
                          className="max-h-60 w-auto object-contain rounded-xl"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-neutral-900/40 p-3 rounded-xl border border-white/5 backdrop-blur-sm">
                        <div className="w-10 h-10 rounded-lg bg-neutral-700 flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-neutral-300" />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-white truncate max-w-[150px]">{att.name}</span>
                          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Document</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Message Content */}
            {isStreaming && !content ? (
              <div className="py-2 flex items-center justify-center">
                <div className="dot-flashing" />
              </div>
            ) : (
              <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words overflow-wrap-anywhere">
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
                onClick={handleThumbsUp}
              >
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-neutral-400 hover:text-[#0a0a0a] hover:bg-white/20 rounded-lg transition-colors"
                title="Bad response"
                onClick={() => setShowDislikeDialog(true)}
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-neutral-400 hover:text-[#0a0a0a] hover:bg-white/20 rounded-lg transition-colors"
                title="Model Info"
                onClick={() => setShowModelInfoDialog(true)}
              >
                <Bot className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Dislike Feedback Dialog */}
      <Dialog open={showDislikeDialog} onOpenChange={setShowDislikeDialog}>
        <DialogContent className="rounded-3xl border-neutral-700 bg-neutral-800 text-white max-w-[90vw] md:max-w-md mx-auto p-6 z-[100]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">Feedback</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Why did you dislike our chatbot? Please provide your reason 🙏🏼🥺
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              value={dislikeReason}
              onChange={(e) => setDislikeReason(e.target.value)}
              placeholder="Your reason..."
              className="rounded-2xl border-neutral-700 bg-neutral-900 text-white focus:ring-0 focus:outline-none focus-visible:ring-0 min-h-[100px] resize-none"
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" className="rounded-full bg-white text-black hover:bg-neutral-200" onClick={() => setShowDislikeDialog(false)}>Cancel</Button>
            <Button 
              className="rounded-full bg-white text-black hover:bg-neutral-200" 
              onClick={handleDislikeSubmit}
            >
              Submit Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Model Info Dialog */}
      <Dialog open={showModelInfoDialog} onOpenChange={setShowModelInfoDialog}>
        <DialogContent className="rounded-3xl border-neutral-700 bg-neutral-800 text-white max-w-[90vw] md:max-w-md mx-auto p-6 z-[100]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-white">AI Model Information</DialogTitle>
            <DialogDescription className="text-neutral-400">
              This is where you display the AI model being used, transparency is number 1 in business 🙏🏼☺️
            </DialogDescription>
          </DialogHeader>
          <div className="py-6 flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
              <Bot className="w-8 h-8 text-white" />
            </div>
            <p className="text-center text-sm text-neutral-300">
              Current Model: <span className="font-bold text-white">Vorgawall LLM v2.5</span>
            </p>
          </div>
          <DialogFooter>
            <Button 
              className="rounded-full bg-white text-black hover:bg-neutral-200 w-full" 
              onClick={() => setShowModelInfoDialog(false)}
            >
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}