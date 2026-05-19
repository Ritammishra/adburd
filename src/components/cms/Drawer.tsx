"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import clsx from "clsx";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: "md" | "lg" | "xl" | "2xl" | "full";
}

export function Drawer({ isOpen, onClose, title, children, width = "md" }: DrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthClasses = {
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full sm:max-w-[calc(100vw-2rem)]",
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className={clsx(
        "relative w-full h-full bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out",
        widthClasses[width]
      )}>
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-light">
          <h2 className="text-lg font-bold text-dark">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 text-muted hover:text-dark hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
