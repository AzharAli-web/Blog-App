"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function RelatedPosts({ posts }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-32 border-t border-border/50 bg-surface/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">Keep Exploring</h2>
            <p className="text-muted text-lg font-medium">Hand-picked articles you might enjoy reading next.</p>
          </div>
          <Link href="/blog">
            <Button size="lg" variant="secondary" className="rounded-full px-8 h-14 bg-surface shadow-xl hover:bg-primary-500 hover:text-white transition-all font-black text-xs uppercase tracking-[0.2em] group">
              Browse All <ArrowRight size={18} className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {posts.map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Link href={`/blog/${post.slug}`} className="group h-full block">
                <Card className="h-full flex flex-col border border-border/40 glass-card hover:border-primary-500/30 transition-all duration-700 hover:-translate-y-3 overflow-hidden shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] rounded-[2.5rem] bg-surface/50">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img 
                      src={post.featuredImage?.url || "https://images.unsplash.com/photo-1519389950473-17b0a99835d1?q=80&w=2070&auto=format&fit=crop"} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="absolute top-6 left-6 z-20">
                      {post.categories?.slice(0, 1).map((cat, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 bg-white text-black rounded-full shadow-2xl">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <CardContent className="p-8 flex-1 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-black mb-4 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight tracking-tight">
                      {post.title}
                    </h3>
                    <p className="text-muted text-sm line-clamp-3 mb-8 leading-relaxed font-medium">
                      {post.excerpt || "Dive deep into this comprehensive guide covering the latest trends and best practices in the industry."}
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-border/30 flex items-center justify-between text-muted">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-primary-500 overflow-hidden ring-4 ring-primary-500/10 shadow-lg">
                          {post.author?.avatar ? (
                            <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-white uppercase font-black">
                              {post.author?.name?.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest text-foreground/80">{post.author?.name || 'Author'}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest bg-muted/10 px-3 py-1 rounded-full">
                        <Clock size={12} className="text-primary-500" /> {Math.ceil((post.content?.split(' ').length || 0) / 200) || 1} MIN
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
