"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, User as UserIcon, LogOut } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 w-full backdrop-blur transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-gradient text-2xl font-bold tracking-tight">BlogApp</span>
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Home</Link>
            <Link href="/blog" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Articles</Link>
            <Link href="/about" className="text-sm font-medium text-muted hover:text-foreground transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-muted hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="rounded-full p-2 text-muted hover:bg-surface hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-500 text-white overflow-hidden ring-2 ring-primary-100 dark:ring-primary-900 transition-all focus:outline-none"
                >
                  {session.user.avatar ? (
                    <img src={session.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-semibold">{session.user.name?.charAt(0).toUpperCase()}</span>
                  )}
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 rounded-xl border border-border bg-surface p-2 shadow-xl glass-card"
                    >
                      <div className="px-3 py-2 border-b border-border mb-2">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-muted truncate">{session.user.email}</p>
                      </div>
                      <Link href="/dashboard" className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-background rounded-lg transition-colors">
                        <UserIcon size={16} /> Dashboard
                      </Link>
                      <button
                        onClick={() => signOut()}
                        className="flex items-center gap-2 w-full mt-1 px-3 py-2 text-sm text-red-500 hover:bg-background rounded-lg transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-medium text-muted hover:text-foreground transition-colors">
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/90 transition-all shadow-md hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass-nav border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 space-y-4">
              <Link href="/" className="text-base font-medium">Home</Link>
              <Link href="/blog" className="text-base font-medium">Articles</Link>
              <Link href="/about" className="text-base font-medium">About</Link>
              <Link href="/contact" className="text-base font-medium">Contact</Link>
              {session ? (
                <>
                  <Link href="/dashboard" className="text-base font-medium text-primary-500">Dashboard</Link>
                  <button onClick={() => signOut()} className="text-left text-base font-medium text-red-500">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-base font-medium">Sign In</Link>
                  <Link href="/register" className="text-base font-medium text-primary-500">Sign Up</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
