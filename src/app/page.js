"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen, PenTool, Sparkles, Mail, TrendingUp, Clock, Eye, Users, FileText, CheckCircle, Search, Laptop, Briefcase, Coffee, Plane, Heart, ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";


const getMockViews = (id) => (parseInt(id.slice(0,5), 16) || 1200) % 5000 + 500;
const getMockReadingTime = (text) => Math.max(2, Math.ceil((text?.length || 1000) / 1000));

const getCategoryIcon = (cat) => {
  switch (cat.toLowerCase()) {
    case 'technology': return <Laptop className="w-5 h-5" />;
    case 'business': return <Briefcase className="w-5 h-5" />;
    case 'lifestyle': return <Coffee className="w-5 h-5" />;
    case 'travel': return <Plane className="w-5 h-5" />;
    case 'health': return <Heart className="w-5 h-5" />;
    default: return <FileText className="w-5 h-5" />;
  }
};

export default function Home() {
  const [allPosts, setAllPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState("idle");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribeStatus("error");
      return;
    }
    setSubscribeStatus("loading");
    
    setTimeout(() => {
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus("idle"), 3000);
    }, 1500);
  };

  const [categoriesList, setCategoriesList] = useState(["All"]);

  const [trendingPosts, setTrendingPosts] = useState([]);
  const [loadingTrending, setLoadingTrending] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [postsRes, catRes, trendingRes] = await Promise.all([
          fetch("/api/posts"),
          fetch("/api/categories"),
          fetch("/api/posts/trending")
        ]);
        
        const postsData = await postsRes.json();
        setAllPosts(Array.isArray(postsData) ? postsData : []);

        const catData = await catRes.json();
        if (Array.isArray(catData)) {
          setCategoriesList(["All", ...catData]);
        }

        const trendingData = await trendingRes.json();
        setTrendingPosts(Array.isArray(trendingData) ? trendingData : []);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setAllPosts([]);
      } finally {
        setLoading(false);
        setLoadingTrending(false);
      }
    }
    fetchData();
  }, []);

  
  
  
  const showcaseCategories = categoriesList.filter(c => c !== "All").map(cat => ({
    name: cat,
    count: allPosts.filter(p => p.categories?.includes(cat)).length || Math.floor(Math.random() * 20) + 5
  })).sort((a,b) => b.count - a.count).slice(0, 6);

  const filteredLatestPosts = (activeCategory === "All"
    ? allPosts
    : allPosts.filter(post => post.categories?.includes(activeCategory))
  ).slice(0, 6);

  const featuredPosts = (allPosts || []).filter(post => 
    post.featured === true || post.featured === "true"
  ).slice(0, 4);

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className="flex flex-col items-center bg-background min-h-screen">
     
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 overflow-hidden">
       
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-40 dark:opacity-20">
          <motion.div 
             animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }} 
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-primary-500/20 to-purple-500/20 rounded-full blur-[120px] mix-blend-screen" 
          />
          <motion.div 
             animate={{ scale: [1, 1.2, 1], rotate: [0, -90, 0] }} 
             transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             className="absolute w-[600px] h-[600px] bg-gradient-to-bl from-blue-500/20 to-cyan-500/20 rounded-full blur-[100px] mix-blend-screen" 
          />
        </div>
        
       
        <div className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="lg:col-span-7 space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/20 bg-primary-500/10 backdrop-blur-md text-sm font-medium text-primary-600 dark:text-primary-400">
              <Sparkles size={16} className="text-primary-500" /> 
              <span>Discover the New BlogApp 2.0</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
            >
              Stories that <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-400 dark:to-purple-400">shape the future.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
            >
              A premium publishing platform for modern creators. Write beautifully, build your audience, and explore insights from top minds across the globe.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link href="/blog" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-14 px-8 text-base shadow-xl shadow-primary-500/20 rounded-xl transition-all hover:scale-105 active:scale-95">
                  Start Reading <BookOpen className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/dashboard/create" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full h-14 px-8 text-base rounded-xl border-border/60 hover:bg-surface backdrop-blur-sm transition-all hover:scale-105 active:scale-95">
                  Write a Story <PenTool className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-8 flex items-center gap-4 text-sm text-muted">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-10 h-10 rounded-full border-2 border-background z-10" style={{ zIndex: 5-i }} />
                ))}
              </div>
              <p>Join <strong className="text-foreground">10,000+</strong> writers and readers</p>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-border/50 shadow-2xl bg-surface">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent z-10 pointer-events-none" />
              <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" alt="Hero Illustration" className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-1000" />
              
              
              <motion.div 
                className="absolute top-8 -left-6 sm:-left-12 z-20 bg-background/80 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-xl flex items-center gap-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5K+</p>
                  <p className="text-xs text-muted font-medium uppercase tracking-wider">Articles</p>
                </div>
              </motion.div>

            
              <motion.div 
                className="absolute bottom-12 -right-6 sm:-right-12 z-20 bg-background/80 backdrop-blur-xl border border-border/50 p-4 rounded-2xl shadow-xl flex items-center gap-4"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold">2M+</p>
                  <p className="text-xs text-muted font-medium uppercase tracking-wider">Readers</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    
      <section className="w-full bg-surface/50 py-24 relative border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">Editor's Choice</h2>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight">Featured Reading</h3>
            </div>
            <Link href="/blog?tab=featured" className="hidden sm:flex group items-center text-sm font-medium hover:text-primary-600 transition-colors">
              View all featured <div className="ml-2 w-8 h-8 rounded-full bg-border/50 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all"><ArrowRight className="w-4 h-4" /></div>
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => <div key={i} className="h-96 rounded-3xl bg-muted/20 animate-pulse" />)}
            </div>
          ) : featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
              {featuredPosts.slice(0,3).map((post, index) => {
                const isLarge = index === 0;
                return (
                  <motion.div 
                    key={post._id}
                    className={`group ${isLarge ? 'md:col-span-6 lg:col-span-8' : 'md:col-span-3 lg:col-span-4'}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-[400px] md:h-[500px] relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
                      <img 
                        src={post.featuredImage?.url || `https://source.unsplash.com/random/800x600?sig=${index}`} 
                        alt={post.title} 
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      
                      <div className="absolute inset-0 z-20 p-6 sm:p-8 flex flex-col justify-end text-white">
                        <div className="flex gap-2 mb-4">
                          {post.categories?.slice(0,2).map(cat => (
                            <span key={cat} className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold text-white border border-white/10">
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h4 className={`${isLarge ? 'text-3xl md:text-4xl' : 'text-2xl'} font-bold mb-3 line-clamp-2 leading-tight group-hover:text-primary-300 transition-colors`}>
                          {post.title}
                        </h4>
                        {isLarge && (
                          <p className="text-white/80 line-clamp-2 mb-6 max-w-2xl text-sm md:text-base">
                            {post.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs font-medium text-white/70">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary-500 overflow-hidden border border-white/20">
                              {post.author?.avatar ? <img src={post.author.avatar} className="w-full h-full object-cover" /> : <span className="flex items-center justify-center h-full w-full text-white">{post.author?.name?.charAt(0) || 'U'}</span>}
                            </div>
                            <span>{post.author?.name || 'Unknown'}</span>
                          </div>
                          <span className="w-1 h-1 rounded-full bg-white/30" />
                          <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {getMockReadingTime(post.excerpt)} min read</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          ) : (
             <div className="text-center py-20 bg-background rounded-3xl border border-dashed border-border text-muted">
                No featured posts available.
             </div>
          )}
        </div>
      </section>

      
      <section className="w-full py-24 bg-background overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Explore Categories</h2>
            <p className="text-muted max-w-2xl mx-auto">Find the content that matters to you across our wide range of topics and disciplines.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {showcaseCategories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link href={`/category/${cat.name.toLowerCase()}`} className="block group">
                  <div className="bg-surface border border-border/50 rounded-2xl p-6 text-center hover:bg-primary-50 dark:hover:bg-primary-900/10 hover:border-primary-500/30 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md">
                    <div className="w-12 h-12 mx-auto rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                      {getCategoryIcon(cat.name)}
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{cat.name}</h3>
                    <p className="text-xs text-muted">{cat.count} Articles</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     
      <section className="w-full py-20 bg-surface border-y border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-10">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold">Trending Now</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {loadingTrending ? (
               <div className="col-span-full py-10 flex gap-4 overflow-hidden">
                 {[1,2,3].map(i => <div key={i} className="flex-1 h-32 bg-muted/20 animate-pulse rounded-2xl" />)}
               </div>
            ) : trendingPosts.length === 0 ? (
               <div className="col-span-full py-10 text-center text-muted">No trending posts available right now.</div>
            ) : trendingPosts.map((post, i) => (
              <motion.div 
                key={post._id.toString()}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`} className="flex items-center gap-6 group p-4 rounded-2xl hover:bg-background border border-transparent hover:border-border/50 transition-all">
                  <span className="text-5xl font-extrabold text-border group-hover:text-primary-500/20 transition-colors w-12 text-center">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-3 mb-2 flex-wrap">
                      <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 bg-primary-500/10 px-2 py-0.5 rounded-full">{post.categories?.[0] || 'General'}</span>
                      <span className="text-xs text-muted flex items-center"><Eye className="w-3 h-3 mr-1" /> {post.views || 0}</span>
                      <span className="text-xs text-muted flex items-center"><Heart className="w-3 h-3 mr-1" /> {post.likesCount || 0}</span>
                      <span className="text-xs text-muted flex items-center"><MessageSquare className="w-3 h-3 mr-1" /> {post.commentsCount || 0}</span>
                    </div>
                    <h4 className="text-lg font-bold text-foreground group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span className="font-medium text-foreground">{post.author?.name || 'Unknown'}</span>
                      <span>•</span>
                      <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> {getMockReadingTime(post.excerpt)} min read</span>
                    </div>
                  </div>
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 hidden sm:block shadow-sm">
                     <img src={post.featuredImage?.url || 'https://source.unsplash.com/random/400x400?tech'} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="w-full py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Latest Articles</h2>
              <p className="text-muted max-w-xl">Dive into our newest content, carefully crafted and curated by our community of experts.</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categoriesList.slice(0, 5).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300
                    ${activeCategory === cat
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30 scale-105'
                      : 'bg-surface border border-border text-foreground hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-500/30'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => <div key={i} className="h-96 bg-surface animate-pulse rounded-3xl" />)}
             </div>
          ) : filteredLatestPosts.length === 0 ? (
            <div className="text-center py-24 bg-surface border border-dashed border-border/60 rounded-3xl">
              <Search className="w-12 h-12 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground">No posts found</h3>
              <p className="text-muted">There are currently no posts in this category.</p>
              <Button onClick={() => setActiveCategory("All")} variant="outline" className="mt-4">Clear Filter</Button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredLatestPosts.map((post) => (
                  <motion.div
                    key={post._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="h-full"
                  >
                    <Link href={`/blog/${post.slug}`} className="block h-full group">
                      <Card className="h-full flex flex-col bg-surface border-border/50 hover:border-primary-500/40 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:bg-surface/30">
                        <div className="w-full h-56 relative overflow-hidden">
                          <img
                            src={post.featuredImage?.url || 'https://source.unsplash.com/random/800x600?nature'}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute top-4 left-4 flex gap-2">
                            {post.categories?.slice(0, 1).map(cat => (
                              <span key={cat} className="px-3 py-1 bg-white/90 dark:bg-black/80 backdrop-blur-md text-xs font-bold rounded-full shadow-sm">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                        <CardContent className="flex-1 p-6 md:p-8 flex flex-col">
                          <div className="flex items-center text-xs text-muted font-medium mb-3 gap-3">
                            <span>{new Date(post.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span>{getMockReadingTime(post.excerpt)} min read</span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-bold mb-3 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-muted text-sm line-clamp-3 mb-6 flex-1">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between pt-6 border-t border-border/50 mt-auto">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary-100 overflow-hidden">
                                {post.author?.avatar ? <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-primary-700 text-xs font-bold">{post.author?.name?.charAt(0) || 'U'}</div>}
                              </div>
                              <span className="text-sm font-medium">{post.author?.name || 'Anonymous'}</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary-500 group-hover:border-primary-500 group-hover:text-white transition-all text-muted">
                              <ChevronRight className="w-4 h-4" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          <div className="mt-16 text-center">
             <Link href="/blog">
               <Button size="lg" variant="outline" className="rounded-full px-8 h-12 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                 View All Articles <ArrowRight className="w-4 h-4 ml-2" />
               </Button>
             </Link>
          </div>
        </div>
      </section>

      
      <section className="w-full py-24 bg-primary-900 dark:bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary-500/30 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Join the Community of Thinkers.</h2>
              <p className="text-white/70 text-lg leading-relaxed">
                BlogApp isn't just another platform. It's a space where ideas flourish. Created by writers, for writers, we provide the tools you need to express yourself beautifully and reach an audience that cares.
              </p>
              <ul className="space-y-3 text-white/80 pb-4">
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary-400" /> Premium glassmorphism editor</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary-400" /> SEO-optimized out of the box</li>
                <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-primary-400" /> Built-in audience analytics</li>
              </ul>
              <Link href="/about">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-xl px-8">
                  Learn About Us
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden border border-white/20"
            >
               <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" alt="Community" className="absolute inset-0 w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

     
      <section className="w-full py-32 bg-background relative overflow-hidden">
       
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-r from-primary-500/20 via-purple-500/20 to-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-surface/50 backdrop-blur-2xl border border-border/50 shadow-2xl rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent dark:from-white/5 pointer-events-none" />
            
            <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/30 mb-8 transform -rotate-6">
              <Mail className="w-10 h-10 transform rotate-6" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Never Miss an Update</h2>
            <p className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Join 10,000+ subscribers to get the latest articles, exclusive tutorials, and weekly inspiration delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-lg mx-auto relative">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (subscribeStatus === "error") setSubscribeStatus("idle");
                    }}
                    className={`h-14 w-full rounded-2xl pl-12 pr-4 bg-background border-2 ${subscribeStatus === 'error' ? 'border-red-500 focus:ring-red-500' : 'border-border focus:border-primary-500 focus:ring-primary-500/20'} transition-all text-base`}
                    disabled={subscribeStatus === "loading" || subscribeStatus === "success"}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="h-14 rounded-2xl px-8 w-full sm:w-auto shadow-lg shadow-primary-500/20 text-base"
                  disabled={subscribeStatus === "loading" || subscribeStatus === "success"}
                >
                  {subscribeStatus === "loading" ? "Subscribing..." : subscribeStatus === "success" ? "Subscribed!" : "Subscribe Now"}
                </Button>
              </div>
              
              <div className="h-8 mt-3 relative w-full flex items-center justify-center">
                <AnimatePresence>
                  {subscribeStatus === "error" && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-sm font-medium absolute">
                      Please enter a valid email address.
                    </motion.p>
                  )}
                  {subscribeStatus === "success" && (
                    <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-600 dark:text-green-400 font-medium text-sm absolute flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Welcome to the community!
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-xs text-muted mt-2">No spam. Unsubscribe at any time.</p>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
