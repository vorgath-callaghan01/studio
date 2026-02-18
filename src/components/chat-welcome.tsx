"use client";

import Image from 'next/image';

export function ChatWelcome() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 animate-in fade-in zoom-in-95 duration-700">
      <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-xl ring-4 ring-white overflow-hidden relative">
        <Image 
          src="https://0xjfocldlbtienb8.public.blob.vercel-storage.com/file_000000006a147206ae541ccfce29fda9%20%281%29.png"
          alt="Vorgawall Shop Logo"
          fill
          className="object-contain p-2"
        />
      </div>
      <h2 className="text-3xl font-headline font-bold text-neutral-900 mb-3 tracking-tight">Hello everyone, welcome to Vorgawall Shop 👋🏻 😀.</h2>
      <p className="text-neutral-500 max-w-md mx-auto leading-relaxed">
        All conversations are saved in your device storage.
      </p>
    </div>
  );
}
