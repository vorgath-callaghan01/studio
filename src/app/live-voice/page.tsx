"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, MicOff, PhoneOff, MoreVertical, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function LiveVoicePage() {
  const [isMuted, setIsMuted] = useState(false);
  const [isCalling, setIsCalling] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCalling) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCalling]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="h-screen w-full flex flex-col bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6">
        <Link href="/">
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
            <ArrowLeft className="w-6 h-6" />
          </Button>
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-neutral-500 mb-1">Live Agent</span>
          <span className="text-sm font-medium">{formatTime(timer)}</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/10 text-white">
          <MoreVertical className="w-6 h-6" />
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
        <div className="relative mb-12">
          {/* Animated Rings */}
          <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping duration-[3000ms]" />
          <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping duration-[2000ms] delay-500" />
          
          <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center p-6 backdrop-blur-xl relative overflow-hidden">
            <Image 
              src="https://0xjfocldlbtienb8.public.blob.vercel-storage.com/file_000000006a147206ae541ccfce29fda9%20%281%29.png"
              alt="Vorgawall Agent"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">Vorgawall Assistant</h2>
        <p className="text-neutral-400 text-center max-w-xs mb-12">
          {isMuted ? "Microphone muted" : "Listening for your voice..."}
        </p>

        {/* Waveform Animation */}
        {!isMuted && isCalling && (
          <div className="flex items-center gap-1.5 h-12 mb-12">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i}
                className="w-1 bg-white/40 rounded-full animate-pulse"
                style={{ 
                  height: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      <footer className="relative z-10 p-12 flex items-center justify-center gap-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className={cn(
            "w-16 h-16 rounded-full border transition-all duration-300",
            isMuted 
              ? "bg-red-500/10 border-red-500/50 text-red-500 hover:bg-red-500/20" 
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          )}
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </Button>

        <Link href="/">
          <Button 
            className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-[0_0_40px_-10px_rgba(220,38,38,0.5)] transition-all active:scale-90"
            onClick={() => setIsCalling(false)}
          >
            <PhoneOff className="w-8 h-8 fill-white" />
          </Button>
        </Link>

        <Button 
          variant="ghost" 
          size="icon" 
          className="w-16 h-16 rounded-full border bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all"
        >
          <Volume2 className="w-6 h-6" />
        </Button>
      </footer>

      <p className="relative z-10 text-[10px] text-center mb-8 uppercase tracking-[0.2em] font-bold opacity-30">
        Encrypted Voice Session • Vorgawall Shop
      </p>
    </main>
  );
}
