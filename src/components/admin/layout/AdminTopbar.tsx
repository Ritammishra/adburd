"use client";

import { usePathname } from "next/navigation";
import { Bell, Search, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AdminTopbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // Create breadcrumbs from pathname
  const segments = pathname.split("/").filter(Boolean);
  const currentSection = segments[segments.length - 1] || "Dashboard";
  const title = currentSection.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <header className="h-20 bg-white border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0">
      <div>
        <h1 className="text-2xl font-bold text-dark">{title}</h1>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        {/* Search */}
        <div className="hidden md:flex relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 bg-light border border-border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Notifications */}
        <button className="relative text-muted hover:text-dark transition-colors p-2">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Dropdown Profile Placeholder */}
        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="hidden md:block text-right">
            <div className="text-sm font-bold text-dark leading-tight">{session?.user?.name || "Admin"}</div>
            <div className="text-xs text-muted capitalize">{(session?.user as any)?.role || "Administrator"}</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20 group relative cursor-pointer">
            <User className="w-5 h-5" />
            
            {/* Simple Dropdown on Hover */}
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
               <div className="p-2">
                  <button 
                    onClick={() => signOut({ callbackUrl: "/admin/login" })}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                     <LogOut className="w-4 h-4" />
                     Sign Out
                  </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
