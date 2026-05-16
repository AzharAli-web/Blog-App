"use client";

import { motion } from "framer-motion";

export default function BlogContent({ content }) {
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={contentVariants}
      className="relative z-10"
    >
      <div className="glass-card bg-surface/90 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] rounded-[2.5rem] p-6 md:p-12 lg:p-16 border border-border/50">
        <div
          className="prose prose-lg md:prose-xl dark:prose-invert max-w-none 
            break-words overflow-hidden
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-foreground
            prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-10
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-border/50
            prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6
            prose-p:text-foreground/80 prose-p:leading-[1.8] prose-p:mb-8
            prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-bold prose-a:no-underline hover:prose-a:underline transition-all
            prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-500/5 prose-blockquote:rounded-2xl prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-foreground/90
            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:my-12 prose-img:max-w-full prose-img:h-auto
            prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-primary-500/10 prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:before:content-none prose-code:after:content-none prose-code:font-bold prose-code:text-[0.9em]
            prose-pre:bg-slate-950 prose-pre:rounded-2xl prose-pre:shadow-2xl prose-pre:p-6 prose-pre:overflow-x-auto prose-pre:border prose-pre:border-white/5
            prose-li:marker:text-primary-500 prose-li:mb-2
            prose-table:block prose-table:overflow-x-auto prose-table:w-full prose-table:my-8
            prose-th:bg-muted/10 prose-th:p-4 prose-th:text-left prose-th:font-bold
            prose-td:p-4 prose-td:border-b prose-td:border-border/50
            ql-editor !p-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </motion.div>
  );
}

