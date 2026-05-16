"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, BookOpen, Sparkles, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { StatsSection, SkillsSection, TimelineSection, ValuesSection, TestimonialsSection, CTASection } from "@/components/about/AboutSections";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" } }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const topics = [
  "Web Development", "React & Next.js", "UI/UX Design", "Career Growth",
  "AI & Productivity", "Open Source", "Performance", "SEO",
];

const socials = [
  { icon: <Github className="w-5 h-5" />, href: "https://github.com/AzharAli-web", label: "GitHub" },
  { icon: <Twitter className="w-5 h-5" />, href: "https://wa.me/923705516525", label: "Twitter" },
  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/azhar-ali-62734432a", label: "LinkedIn" },
  { icon: <Mail className="w-5 h-5" />, href: "/contact", label: "Email" },
];

export default function AboutPage() {
  const [email, setEmail] = useState("");
  const [nlStatus, setNlStatus] = useState("idle");

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) { setNlStatus("error"); return; }
    setNlStatus("loading");
    await new Promise(r => setTimeout(r, 1200));
    setNlStatus("success");
    setEmail("");
    setTimeout(() => setNlStatus("idle"), 4000);
  };

  return (
    <div className="flex flex-col items-center w-full">


      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 overflow-hidden text-center">
        <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] bg-primary-500/20 blur-[120px] rounded-full -z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }} />
        <motion.div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-500/15 blur-[90px] rounded-full -z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.3 }} />
        <motion.div className="absolute bottom-10 left-0 w-[280px] h-[280px] bg-blue-500/10 blur-[80px] rounded-full -z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 0.6 }} />


        {[...Array(4)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-primary-500/10 border border-primary-500/20 -z-10"
            style={{ width: 40 + i * 20, height: 40 + i * 20, top: `${15 + i * 18}%`, left: i % 2 === 0 ? `${5 + i * 3}%` : undefined, right: i % 2 !== 0 ? `${5 + i * 3}%` : undefined }}
            animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }} />
        ))}

        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary-500/30 text-sm font-medium text-primary-600 dark:text-primary-400">
            <Sparkles className="w-4 h-4" /> About BlogApp
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tight">
            Passion for <span className="text-gradient">Ideas</span>,<br />Built for <span className="text-gradient">Developers</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            A premium platform where deep technical knowledge meets elegant storytelling.
            Real tutorials, honest opinions, and practical insights for modern developers.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/blog">
              <Button size="lg" className="rounded-full px-10">Read Articles <BookOpen className="ml-2 w-5 h-5" /></Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="rounded-full px-10">Get in Touch <ArrowRight className="ml-2 w-5 h-5" /></Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>


      <StatsSection />


      <section className="w-full py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="text-xs font-bold uppercase tracking-widest text-primary-500 mb-4 block">Our Mission</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-snug">
                Making <span className="text-gradient">Complex Ideas</span> Simple and Actionable
              </h2>
              <p className="text-muted mb-6 leading-relaxed">
                BlogApp was born out of frustration with shallow tutorials and documentation that only scratches the surface.
                We dig deep, explain the why, and show the how — with real-world examples you can ship today.
              </p>
              <p className="text-muted leading-relaxed">
                Whether you&apos;re a junior developer finding your footing or a senior engineer exploring new paradigms,
                every article is crafted to give you genuine value within the first five minutes of reading.
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {topics.map((t, i) => (
                  <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ scale: 1.06 }}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold glass-card border border-border text-foreground hover:border-primary-500/50 hover:text-primary-600 transition-all cursor-default">
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="space-y-4">
              {[
                { title: "Deep Technical Dives", desc: "Not surface-level overviews — real implementation guides with code, trade-offs, and context." },
                { title: "Honest & Opinionated", desc: "We tell you what works, what doesn't, and why — without sugarcoating or sponsored bias." },
                { title: "Always Up to Date", desc: "Articles are reviewed and refreshed regularly to keep pace with the fast-moving web ecosystem." },
              ].map((item, i) => (
                <motion.div key={i} custom={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }} whileHover={{ y: -4 }}>
                  <Card className="glass-card border border-border/50 hover:border-primary-500/30 transition-all">
                    <CardContent className="p-6 flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted text-sm">{item.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      <section className="w-full py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the <span className="text-gradient">Author</span></h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="glass-card rounded-3xl border border-border/50 p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              <motion.div className="shrink-0" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                <div className="relative">
                  <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
                    A
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-green-500 border-2 border-surface flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                </div>
              </motion.div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-1">Azhar Ali</h3>
                <p className="text-primary-500 font-medium mb-4">Full-Stack Developer & Wordpress developer.</p>
                <p className="text-muted leading-relaxed mb-6">
                  Hey! I&apos;m Azhar ali — a developer with having best experience in building web apps and an equal passion for teaching others.
                  I created BlogApp because I believe great documentation and honest tutorials can shortcut years of painful trial and error.
                  When I&apos;m not writing, I&apos;m contributing to open-source or building side projects that inevitably become blog posts.
                </p>
                <div className="flex gap-3 justify-center md:justify-start">
                  {socials.map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label}
                      className="w-10 h-10 rounded-full glass-card border border-border flex items-center justify-center text-muted hover:text-primary-600 hover:border-primary-500/50 hover:scale-110 transition-all">
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      <SkillsSection />

      <TimelineSection />

      <ValuesSection />

      <TestimonialsSection />

      <section className="w-full py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="glass-card rounded-3xl p-10 md:p-16 border border-primary-500/20 shadow-2xl bg-background/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <Mail className="w-12 h-12 text-primary-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Join the Newsletter</h2>
            <p className="text-muted text-lg max-w-xl mx-auto mb-10">Get the latest articles delivered to your inbox every week. No spam, ever.</p>
            <form onSubmit={handleNewsletter} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input type="email" placeholder="Enter your email" value={email}
                  onChange={e => { setEmail(e.target.value); if (nlStatus === "error") setNlStatus("idle"); }}
                  className={`h-12 rounded-full px-6 ${nlStatus === "error" ? "border-red-500" : ""}`}
                  disabled={nlStatus === "loading" || nlStatus === "success"} />
                <Button type="submit" className="h-12 rounded-full px-8 shrink-0 w-full sm:w-auto"
                  disabled={nlStatus === "loading" || nlStatus === "success"} isLoading={nlStatus === "loading"}>
                  {nlStatus === "success" ? <><CheckCircle className="w-4 h-4 mr-2" />Subscribed!</> : "Subscribe"}
                </Button>
              </div>
              <AnimatePresence>
                {nlStatus === "error" && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-sm mt-3">
                    Please enter a valid email address.
                  </motion.p>
                )}
                {nlStatus === "success" && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-500 font-medium text-sm mt-3">
                    🎉 Welcome aboard! Check your inbox.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>

      <CTASection />

    </div>
  );
}
