"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Link as LinkIcon,
  Heart,
  MessageCircle,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function BlogSidebar({
  post,
  likesCount,
  hasLiked,
  handleLike,
  commentsCount,
  shareUrl,
}) {
  const [toc, setToc] = useState([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parser = new DOMParser();
      const doc = parser.parseFromString(post.content, "text/html");

      const headings = Array.from(doc.querySelectorAll("h1, h2, h3"));

      const tocItems = headings.map((heading, index) => ({
        id: `heading-${index}`,
        text: heading.innerText,
        level: parseInt(heading.tagName[1]),
      }));

      setToc(tocItems);
    }
  }, [post.content]);

  const handleShare = (platform) => {
    let url = "";
    const title = encodeURIComponent(post.title);
    const link = encodeURIComponent(shareUrl);

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${title}&url=${link}`;
        break;

      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
        break;

      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${link}`;
        break;

      case "copy":
        navigator.clipboard.writeText(shareUrl);
        return;
    }

    if (url) window.open(url, "_blank");
  };

  return (
    <div className="w-full space-y-8 lg:sticky lg:top-24">
      {/* Author Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-background/80 backdrop-blur-2xl shadow-xl p-8"
      >
        <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-primary-500 to-blue-600" />

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl overflow-hidden bg-primary-500 shadow-lg flex-shrink-0">
            {post.author?.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white font-black text-2xl uppercase">
                {post.author?.name?.charAt(0) || "U"}
              </div>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-lg font-black truncate text-foreground">
              {post.author?.name || "Anonymous"}
            </h3>

            <p className="text-[10px] uppercase tracking-widest text-primary-500 font-black">
              Expert Contributor
            </p>
          </div>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground mb-6">
          {post.author?.bio ||
            "Passionate about sharing high-quality insights and deep dives into technology and creative fields."}
        </p>

        <Button className="w-full h-11 rounded-xl bg-foreground text-background hover:opacity-90 font-bold transition-all flex items-center justify-center gap-2">
          <UserPlus size={16} />
          Follow Author
        </Button>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={handleLike}
          className={`h-16 rounded-2xl border flex items-center justify-center gap-3 transition-all ${hasLiked
            ? "bg-red-500/10 border-red-500/40 text-red-500"
            : "bg-background/60 border-border hover:border-red-500/50 text-muted-foreground"
            }`}
        >
          <Heart size={20} className={hasLiked ? "fill-current" : ""} />
          <span className="font-black text-lg">{likesCount}</span>
        </button>

        <div className="h-16 rounded-2xl border border-border bg-background/60 text-muted-foreground flex items-center justify-center gap-3">
          <MessageCircle size={20} />
          <span className="font-black text-lg">{commentsCount}</span>
        </div>
      </div>

      {toc.length > 0 && (
        <div className="rounded-[2rem] border border-border/60 bg-background/80 backdrop-blur-2xl shadow-lg p-8">
          <h4 className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">
            <span className="w-6 h-[1px] bg-border" />
            On This Page
          </h4>

          <nav className="space-y-4">
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group flex items-start gap-3 transition-all hover:text-primary-500 ${item.level === 1
                  ? "font-bold text-foreground"
                  : item.level === 2
                    ? "font-medium pl-4 text-muted-foreground"
                    : "text-sm pl-6 text-muted-foreground/80"
                  }`}
              >
                <span className="w-1 h-1 rounded-full bg-primary-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />

                {item.text}
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="rounded-[2rem] border border-border/60 bg-background/80 backdrop-blur-2xl shadow-lg p-8">
        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Share This Article
        </h4>

        <div className="grid grid-cols-4 gap-3">
          {[
            {
              id: "twitter",
              icon: Twitter,
              color: "hover:bg-sky-500",
            },
            {
              id: "facebook",
              icon: Facebook,
              color: "hover:bg-blue-600",
            },
            {
              id: "linkedin",
              icon: Linkedin,
              color: "hover:bg-blue-700",
            },
            {
              id: "copy",
              icon: LinkIcon,
              color: "hover:bg-foreground",
            },
          ].map((social) => (
            <button
              key={social.id}
              onClick={() => handleShare(social.id)}
              className={`aspect-square rounded-xl border border-border bg-muted/30 flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.color} hover:text-white hover:scale-105`}
            >
              <social.icon size={20} />
            </button>
          ))}
        </div>
      </div>


      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-300 to-blue-400 dark:from-primary-300 dark:to-blue-350 p-8 text-black dark:text-white shadow-2xl">

        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-white/10 blur-3xl" />

        <Mail className="w-12 h-12 mb-6 opacity-40 relative z-10" />

        <h4 className="text-2xl font-black leading-tight mb-3 relative z-10">
          Weekly insights, delivered.
        </h4>

        <p className="text-black/70 dark:text-white/80 text-sm leading-relaxed mb-6 relative z-10">
          Join 5,000+ readers getting curated industry deep-dives every week.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubscribed(true);
          }}
          className="space-y-3 relative z-10"
        >
          <Input
            placeholder="Your best email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
        h-12 rounded-xl
        border-black/10 dark:border-white/20
        bg-white/40 dark:bg-white/10
        text-black dark:text-white
        placeholder:text-black/50 dark:placeholder:text-white/60
        focus-visible:ring-black/20 dark:focus-visible:ring-white/40
      "
          />

          <Button className="
      w-full h-12 rounded-xl
      bg-black dark:bg-white
      text-white dark:text-primary-700
      hover:opacity-90
      font-black text-sm uppercase tracking-widest shadow-xl
    ">
            {subscribed ? "Welcome!" : "Join Now"}
          </Button>
        </form>
      </div>
    </div>
  );
}
