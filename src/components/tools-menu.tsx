"use client";

import { useEffect, useRef } from 'react';
import { Monitor, Zap, Shield, Moon, User } from 'lucide-react';

export function ToolsMenu({ onClose }: { onClose: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const menuItems = [
    { icon: User, label: "Account Profile" },
    { icon: Monitor, label: "Interface Settings" },
    { icon: Zap, label: "Performance Mode" },
    { icon: Shield, label: "Privacy & Data" },
    { icon: Moon, label: "Dark Mode" },
  ];

  return (
    <div 
      ref={menuRef}
      className="absolute bottom-full left-0 mb-4 w-64 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 z-[60]"
    >
      <div className="p-3 border-b border-neutral-50 bg-neutral-50/50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-2">Assistant Settings</h3>
      </div>
      <div className="py-2">
        {menuItems.map((item, idx) => (
          <button 
            key={idx}
            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 transition-colors text-neutral-700 text-sm group"
          >
            <item.icon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-900" />
            <span className="group-hover:text-neutral-900 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}