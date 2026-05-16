"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export default function BlogListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, catRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/categories")
        ]);
        
        const data = await postsRes.json();
        setPosts(Array.isArray(data) ? data : []);

        const catData = await catRes.json();
        if (Array.isArray(catData)) {
          setCategories(["All", ...catData]);
        }
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredPosts = (Array.isArray(posts) ? posts : []).filter((post) => {
    const q = searchQuery.toLowerCase();

    return (
      (post?.title?.toLowerCase().includes(q) ||
        post?.excerpt?.toLowerCase().includes(q)) &&
      (activeCategory === "All" ||
        post?.categories?.includes(activeCategory))
    );
  });

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

     
      <div className="text-center mb-14 space-y-3">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Our <span className="text-gradient">Blog</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Explore insights, ideas, and stories crafted for modern creators.
        </p>
      </div>

    
      <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-10">

    
        <div className="relative w-full md:w-96">
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-surface glass-card rounded-full"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
        </div>

   
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all duration-200
              ${activeCategory === cat
                  ? "bg-primary-600 text-white shadow-md scale-[1.02]"
                  : "bg-surface border border-border hover:bg-muted/10"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

   
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >

        {loading ? (
          <div className="col-span-full text-center py-12 text-muted">
            Loading posts...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted">
            No posts found.
          </div>
        ) : (
          filteredPosts.map((post) => {
            const featured = post?.featured;

            return (
              <motion.div key={post._id} variants={item}>
                <Link href={`/blog/${post.slug}`} className="block h-full">

                  <Card className="group h-full flex flex-col overflow-hidden glass-card border border-border hover:border-primary-500/30 transition-all duration-300 hover:shadow-xl">

          
                    <div className="relative h-48 overflow-hidden">

                 
                      {featured && (
                        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 text-white text-xs backdrop-blur-md">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </div>
                      )}

                      <img
                        src={
                          post.featuredImage?.url ||
                          "https://source.unsplash.com/random/800x600?blog"
                        }
                        alt={post.title || "Blog"}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

           
                    <CardContent className="flex-1 p-6 flex flex-col justify-between">

                      <div>

            
                        <div className="flex flex-wrap gap-2 mb-3">
                          {(post.categories?.length
                            ? post.categories
                            : ["Uncategorized"]
                          ).map((cat, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded-md bg-primary-100/40 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>

             
                        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h3>

          
                        <p className="text-sm text-muted mt-2 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

        
                      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">

                        <div className="w-9 h-9 rounded-full bg-primary-500 text-white flex items-center justify-center overflow-hidden font-semibold">
                          {post.author?.avatar ? (
                            <img
                              src={post.author.avatar}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            post.author?.name?.charAt(0) || "U"
                          )}
                        </div>

                        <div className="text-xs">
                          <p className="font-medium">
                            {post.author?.name || "Unknown"}
                          </p>

                          <p className="text-muted flex gap-2 flex-wrap">
                            <span>
                              {post.createdAt
                                ? new Date(post.createdAt).toLocaleDateString()
                                : "N/A"}
                            </span>

                            <span>•</span>

                            <span>
                              {Math.max(
                                1,
                                Math.ceil(
                                  (post.content?.split(" ").length || 0) / 200
                                )
                              )}{" "}
                              min read
                            </span>
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </div>
  );
}