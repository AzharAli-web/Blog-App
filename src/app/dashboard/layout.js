"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PenTool, Settings, FileText, User } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="w-8 h-8 relative">
          <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!session) return null;

  const getLinkClass = (path) => {
    const isActive = pathname === path || (path !== "/dashboard" && pathname.startsWith(path));
    return `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
      isActive
        ? "bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium"
        : "text-muted hover:bg-surface hover:text-foreground"
    }`;
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col md:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8">
    
      <aside className="w-full md:w-64 shrink-0">
        <div className="glass-card p-6 rounded-2xl sticky top-24">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
            <div className="w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg overflow-hidden shrink-0">
              {session.user.avatar ? (
                <img src={session.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                session.user.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden shadow-none min-w-0 flex-1">
              <h3 className="font-semibold text-sm truncate w-full block">{session.user.name}</h3>
              <p className="text-xs text-muted">Author</p>
            </div>
          </div>

          <nav className="space-y-2">
            <Link href="/dashboard" className={getLinkClass("/dashboard")}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link href="/dashboard/create" className={getLinkClass("/dashboard/create")}>
              <PenTool size={20} /> Write a Post
            </Link>
            <Link href="/blog" className={getLinkClass("/blog")}>
              <FileText size={20} /> View All Posts
            </Link>
            <Link href="/dashboard/profile" className={getLinkClass("/dashboard/profile")}>
              <User size={20} /> Profile
            </Link>
          </nav>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
