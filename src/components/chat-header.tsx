"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MoreHorizontal, Pencil, History, Trash2, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface ChatHeaderProps {
  title?: string;
  onRename?: (newTitle: string) => void;
  onDelete?: () => void;
}

export function ChatHeader({ title, onRename, onDelete }: ChatHeaderProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [tempTitle, setTempTitle] = useState(title || '');

  const handleRenameSubmit = () => {
    if (tempTitle.trim() && onRename) {
      onRename(tempTitle);
      setShowRenameDialog(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#F0F0F0]/80 backdrop-blur-md border-b border-neutral-200">
        <div className="flex items-center gap-6">
          <Link href="https://vorgawall.shop" className="text-neutral-600 hover:text-[#0a0a0a] transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="flex flex-col overflow-hidden">
            {title ? (
              <h1 className="font-headline font-bold text-xl leading-none text-[#0a0a0a] animate-in fade-in slide-in-from-left-2 duration-500 truncate max-w-[200px] md:max-w-md">
                {title}
              </h1>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-2 duration-500">
                <h1 className="font-headline font-bold text-xl leading-none text-[#0a0a0a]">Vorgawall</h1>
                <span className="font-headline text-neutral-400 text-sm font-medium">Demo</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Set modal={false} to prevent pointer-events locking issues */}
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-[#171717] hover:bg-[#262626] text-white hover:text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors focus:ring-0 focus-visible:ring-0 data-[state=open]:text-white"
            >
              <MoreHorizontal className="w-6 h-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="rounded-3xl p-2 min-w-[180px] bg-neutral-800 border-neutral-700 shadow-xl z-[60]"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuItem 
              className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700"
              onSelect={(e) => {
                e.preventDefault();
                setTempTitle(title || '');
                setShowRenameDialog(true);
              }}
              disabled={!title}
            >
              <Pencil className="w-4 h-4 text-neutral-400" />
              <span className="font-medium text-neutral-100">Rename</span>
            </DropdownMenuItem>
            
            <Link href="/history">
              <DropdownMenuItem className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700">
                <History className="w-4 h-4 text-neutral-400" />
                <span className="font-medium text-neutral-100">History Chat</span>
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem 
              className="rounded-2xl gap-3 py-3 cursor-pointer text-destructive focus:text-destructive hover:bg-neutral-700 focus:bg-neutral-700"
              onSelect={(e) => {
                e.preventDefault();
                setShowDeleteAlert(true);
              }}
              disabled={!title}
            >
              <Trash2 className="w-4 h-4" />
              <span className="font-medium">Delete</span>
            </DropdownMenuItem>

            <DropdownMenuItem className="rounded-2xl gap-3 py-3 cursor-pointer hover:bg-neutral-700 focus:bg-neutral-700">
              <Bug className="w-4 h-4 text-neutral-400" />
              <span className="font-medium text-neutral-100">Reports bug</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Rename Dialog */}
      <Dialog open={showRenameDialog} onOpenChange={setShowRenameDialog}>
        <DialogContent className="rounded-3xl border-neutral-200 bg-white max-w-[90vw] md:max-w-md mx-auto p-6 z-[70]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Rename Chat</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input 
              value={tempTitle}
              onChange={(e) => setTempTitle(e.target.value)}
              placeholder="Enter new title..."
              className="rounded-2xl border-neutral-200 focus:ring-0 focus-visible:ring-0"
              onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="ghost" className="rounded-full" onClick={() => setShowRenameDialog(false)}>Cancel</Button>
            <Button className="rounded-full bg-[#171717] hover:bg-[#262626] text-white" onClick={handleRenameSubmit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Alert Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent className="rounded-3xl border-neutral-200 bg-white max-w-[90vw] md:max-w-md mx-auto p-6 z-[70]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-500">
              Are you sure you want to permanently delete this conversation?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 mt-4">
            <AlertDialogCancel className="rounded-full border-neutral-200" onClick={() => setShowDeleteAlert(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="rounded-full bg-destructive text-white hover:bg-destructive/90"
              onClick={() => {
                if (onDelete) onDelete();
                setShowDeleteAlert(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
