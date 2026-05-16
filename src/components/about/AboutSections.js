"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import {
  BookOpen, Lightbulb, Users, Award, Star, Heart, Zap, Globe,
  Github, Twitter, Linkedin, Mail, ArrowRight, CheckCircle,
  Code2, Layout, Search, PenTool, Brain, TrendingUp,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  const stats = [
    { label: "Articles Published", value: 120, suffix: "+", color: "text-primary-600 dark:text-primary-400" },
    { label: "Monthly Readers", value: 25, suffix: "K+", color: "text-purple-600 dark:text-purple-400" },
    { label: "Topics Covered", value: 18, suffix: "", color: "text-emerald-600 dark:text-emerald-400" },
    { label: "Years Writing", value: 5, suffix: "+", color: "text-orange-600 dark:text-orange-400" },
  ];
  return (
    <section className="w-full py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="glass-card border border-border/50 text-center p-6">
                <p className={`text-4xl md:text-5xl font-bold mb-2 ${s.color}`}>
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="text-muted text-sm font-medium">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const skills = [
  { name: "React / Next.js", pct: 95, icon: <Code2 className="w-4 h-4" /> },
  { name: "JavaScript", pct: 92, icon: <Zap className="w-4 h-4" /> },
  { name: "UI/UX Design", pct: 85, icon: <Layout className="w-4 h-4" /> },
  { name: "Technical Writing", pct: 90, icon: <PenTool className="w-4 h-4" /> },
  { name: "SEO Optimization", pct: 80, icon: <Search className="w-4 h-4" /> },
  { name: "AI Tools", pct: 88, icon: <Brain className="w-4 h-4" /> },
];
const chips = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB", "SEO", "Blogging", "AI Tools"];

export function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & <span className="text-gradient">Expertise</span></h2>
          <p className="text-muted max-w-xl mx-auto">Technologies and tools I use to craft high-quality content and experiences.</p>
        </motion.div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div ref={ref} className="space-y-6">
            {skills.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium">{s.icon}{s.name}</div>
                  <span className="text-sm text-muted">{s.pct}%</span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden border border-border/30">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-purple-500"
                    initial={{ width: 0 }} animate={inView ? { width: `${s.pct}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }} />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-wrap gap-3">
            {chips.map((c, i) => (
              <motion.span key={i} custom={i} variants={fadeUp} whileHover={{ scale: 1.08, y: -3 }}
                className="px-4 py-2 rounded-full glass-card border border-border text-sm font-medium text-foreground hover:border-primary-500/50 hover:text-primary-600 transition-all cursor-default">
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const timeline = [
  { year: "2019", title: "The Beginning", desc: "Started writing about web development, sharing learnings from personal projects.", icon: <PenTool className="w-5 h-5" /> },
  { year: "2020", title: "First 1K Readers", desc: "Crossed 1,000 monthly readers and expanded topics to design and career advice.", icon: <Users className="w-5 h-5" /> },
  { year: "2021", title: "Full-Stack Content", desc: "Launched in-depth tutorials on React, Next.js, and backend development.", icon: <Code2 className="w-5 h-5" /> },
  { year: "2022", title: "Community Grows", desc: "Reached 10K readers per month. Opened newsletter and Discord community.", icon: <Globe className="w-5 h-5" /> },
  { year: "2023", title: "AI Integration", desc: "Started covering AI tools, prompt engineering, and the future of development.", icon: <Brain className="w-5 h-5" /> },
  { year: "2024+", title: "What's Next", desc: "Building a premium course, expanding guest contributions, and growing to 50K+.", icon: <TrendingUp className="w-5 h-5" /> },
];

export function TimelineSection() {
  return (
    <section className="w-full py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The <span className="text-gradient">Journey</span></h2>
          <p className="text-muted">From a personal blog to a growing developer community.</p>
        </motion.div>
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-500/50 via-purple-500/30 to-transparent" />
          <div className="space-y-10">
            {timeline.map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-500/10 border-2 border-primary-500 flex items-center justify-center text-primary-500 z-10 shrink-0">
                  {item.icon}
                </div>
                <div className={`ml-16 md:ml-0 md:w-5/12 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"}`}>
                  <Card className="glass-card border border-border/50 hover:border-primary-500/30 transition-all hover:-translate-y-1">
                    <CardContent className="p-5">
                      <span className="text-xs font-bold text-primary-500 mb-1 block">{item.year}</span>
                      <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-muted text-sm">{item.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const values = [
  { icon: <Lightbulb className="w-6 h-6" />, title: "Innovation", desc: "Always exploring new tools, patterns, and ideas to stay at the cutting edge.", color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/30" },
  { icon: <Star className="w-6 h-6" />, title: "Quality", desc: "Every article is researched, tested, and polished before publishing.", color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
  { icon: <Heart className="w-6 h-6" />, title: "Community", desc: "Writing for real people, with empathy, clarity, and practical examples.", color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/30" },
  { icon: <CheckCircle className="w-6 h-6" />, title: "Honesty", desc: "Transparent about limitations, failures, and what actually works.", color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/30" },
  { icon: <BookOpen className="w-6 h-6" />, title: "Lifelong Learning", desc: "The best writers are perpetual students. Always learning, always sharing.", color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
  { icon: <Award className="w-6 h-6" />, title: "Impact", desc: "Content that actually helps developers ship better products, faster.", color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/30" },
];

export function ValuesSection() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core <span className="text-gradient">Values</span></h2>
          <p className="text-muted max-w-xl mx-auto">The principles that guide every piece of content on this platform.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
              <Card className="glass-card border border-border/50 hover:border-primary-500/30 h-full transition-all">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-2xl ${v.bg} ${v.color} flex items-center justify-center mb-4`}>{v.icon}</div>
                  <h3 className="font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-muted text-sm">{v.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Sarah M.", role: "Frontend Developer", quote: "This blog completely changed how I approach React architecture. The depth and clarity of each post is unmatched.", avatar: "SM" },
  { name: "James K.", role: "Full-Stack Engineer", quote: "I've learned more from this blog in 3 months than from any bootcamp. Practical, honest, and always up to date.", avatar: "JK" },
  { name: "Priya R.", role: "UX Designer", quote: "The UI/UX articles here are a goldmine. Every piece has actionable insights I can apply immediately.", avatar: "PR" },
  { name: "Alex T.", role: "Indie Hacker", quote: "The SEO and content strategy guides helped me grow my own blog to 5K readers. Incredible resource.", avatar: "AT" },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="w-full py-24 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Readers <span className="text-gradient">Say</span></h2>
        </motion.div>
        <div className="relative min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 md:p-12 border border-border/50 text-center shadow-xl">
              <div className="w-14 h-14 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-lg mx-auto mb-4">
                {testimonials[active].avatar}
              </div>
              <p className="text-foreground text-lg md:text-xl italic mb-6 leading-relaxed">&ldquo;{testimonials[active].quote}&rdquo;</p>
              <p className="font-semibold">{testimonials[active].name}</p>
              <p className="text-muted text-sm">{testimonials[active].role}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === active ? "bg-primary-500 scale-125" : "bg-border"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="w-full py-24 bg-background relative overflow-hidden">
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary-500/15 blur-[100px] rounded-full -z-10"
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 4, repeat: Infinity }} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="glass-card rounded-3xl p-12 md:p-20 border border-primary-500/20 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ready to <span className="text-gradient">Explore?</span></h2>
          <p className="text-muted text-lg max-w-xl mx-auto mb-10">Dive into articles, tutorials, and insights that help you build, design, and grow.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog"><Button size="lg" className="rounded-full px-10">Read Articles <BookOpen className="ml-2 w-5 h-5" /></Button></Link>
            <Link href="/contact"><Button size="lg" variant="secondary" className="rounded-full px-10">Contact Me <ArrowRight className="ml-2 w-5 h-5" /></Button></Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
