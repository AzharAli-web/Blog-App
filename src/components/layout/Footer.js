"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

const Github = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.53 6-6.42 0-1.42-.5-2.6-1.3-3.52.13-.33.58-1.67-.1-3.48 0 0-1.1-.35-3.6 1.34A12.3 12.3 0 0 0 12 5.5a12.3 12.3 0 0 0-3.6.46C5.9 4.25 4.8 4.6 4.8 4.6c-.68 1.8-.23 3.15-.1 3.48A4.9 4.9 0 0 0 3.4 12c0 4.89 3 6.08 6 6.42A4.8 4.8 0 0 0 8.4 22v3" /></svg>;
const Twitter = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>;
const Linkedin = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

  return (
    <footer className="relative border-t border-border/40 bg-background/80 backdrop-blur-xl mt-20 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="text-gradient text-3xl font-bold tracking-tight">BlogApp</span>
            </Link>
            <p className="text-muted max-w-sm mb-8 leading-relaxed">
              A premium space to read, write, and share your stories with the world. Built with Next.js and elegant design principles for a superior reading experience.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 p-2.5 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-transparent hover:border-primary-100 dark:hover:border-primary-900/50">
                <Github size={20} />
              </a>
              <a href="#" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 p-2.5 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-transparent hover:border-primary-100 dark:hover:border-primary-900/50">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 p-2.5 rounded-full hover:bg-primary-50 dark:hover:bg-primary-900/20 border border-transparent hover:border-primary-100 dark:hover:border-primary-900/50">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6">Explore</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Home</Link></li>
              <li><Link href="/blog" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Latest Posts</Link></li>
              <li><Link href="/blog?tab=featured" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Featured</Link></li>
              <li><Link href="/authors" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Authors</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-6">Categories</h3>
            <ul className="space-y-4">
              <li><Link href="/blog?category=Technology" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Technology</Link></li>
              <li><Link href="/blog?category=Business" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Business</Link></li>
              <li><Link href="/blog?category=Lifestyle" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Lifestyle</Link></li>
              <li><Link href="/blog?category=Travel" className="text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center group"><ArrowRight className="w-3 h-3 mr-2 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Travel</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-1">
            <h3 className="font-bold text-foreground mb-6">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface border border-border/60 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  required
                />
              </div>
              <Button type="submit" className="w-full text-sm py-2" disabled={status !== 'idle'}>
                {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border/40 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm font-medium">
            &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy" className="text-muted hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-muted hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/contact" className="text-muted hover:text-foreground transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
