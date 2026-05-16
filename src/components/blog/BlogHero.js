"use client";

import { motion } from "framer-motion";
import { Clock, Calendar } from "lucide-react";

export default function BlogHero({ post }) {
  const readingTime =
    Math.ceil((post.content?.split(" ").length || 0) / 200) || 1;

  return (
    <section className="relative w-full min-h-[55vh] md:min-h-[65vh] flex items-center overflow-hidden">

      <div className="absolute inset-0 z-0">
        <img
          src={
            post.featuredImage?.url ||
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop"
          }
          alt={post.title}
          className="w-full h-full object-cover scale-105 brightness-[0.75] contrast-110"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background/90" />
      </div>

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-80 h-80 bg-primary/20 rounded-full blur-[120px] pointer-events-none z-10"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none z-10"
      />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >

          {post.categories?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {post.categories.map((cat, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ scale: 1.08 }}
                  className="
                    relative
                    overflow-hidden
                    px-5 py-2
                    rounded-full
                    text-xs
                    font-black
                    uppercase
                    tracking-[0.2em]
                    border
                    border-white/20
                    bg-white/15
                    backdrop-blur-xl
                    text-white
                    shadow-2xl
                  "
                >
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="
                      absolute inset-0
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                    "
                  />

                  <span className="relative z-10">
                    {cat}
                  </span>
                </motion.span>
              ))}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8 text-balance drop-shadow-2xl">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">

            <div className="flex items-center gap-3 bg-white/15 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/20 shadow-2xl">
              <div className="w-11 h-11 rounded-xl bg-primary overflow-hidden ring-2 ring-white/20 flex-shrink-0">
                {post.author?.avatar ? (
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-white text-lg">
                    {post.author?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              <div className="text-left min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {post.author?.name || "Anonymous"}
                </p>

                <p className="text-[10px] uppercase tracking-[0.15em] text-white/70 font-medium">
                  Author
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 text-xs sm:text-sm font-bold uppercase tracking-wide text-white">
              <span className="flex items-center gap-2 whitespace-nowrap">
                <Calendar size={16} className="text-primary-300" />
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>

              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/40" />

              <span className="flex items-center gap-2 whitespace-nowrap">
                <Clock size={16} className="text-primary-300" />
                {readingTime} MIN READ
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}