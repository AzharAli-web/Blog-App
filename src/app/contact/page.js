"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Phone, MapPin, Send, CheckCircle, AlertCircle,
  Github, Twitter, Linkedin, ChevronDown, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";



const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};


const faqs = [
  {
    q: "How quickly do you respond to messages?",
    a: "We typically respond within 24 hours on business days. For urgent enquiries feel free to call us directly.",
  },
  {
    q: "Can I contribute a guest post?",
    a: "Absolutely! Send us your pitch via the contact form with the subject 'Guest Post' and our editorial team will get back to you.",
  },
  {
    q: "How do I report a bug or technical issue?",
    a: "Use the contact form and select 'Technical Support' as the subject. Please include your browser and device details so we can reproduce the issue.",
  },
  {
    q: "Do you offer advertising or sponsorship opportunities?",
    a: "Yes. Select 'Partnership / Sponsorship' in the subject line and we'll share our media kit and rates with you.",
  },
  {
    q: "Is my data safe when I submit the form?",
    a: "Yes. We only use submitted information to respond to your enquiry and never share it with third parties. See our Privacy Policy for details.",
  },
];


const infoCards = [
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email Us",
    lines: ["khanma16101@email.com", "support@blogapp.com"],
    color: "from-blue-500/20 to-primary-500/20",
    iconBg: "bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Call Us",
    lines: ["+92 370-5516525", "Mon – Fri, 9 am – 5 pm EST"],
    color: "from-green-500/20 to-emerald-500/20",
    iconBg: "bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Find Us",
    lines: ["charsadda road", "mardan, Pakistan"],
    color: "from-purple-500/20 to-pink-500/20",
    iconBg: "bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400",
  },
];

const socials = [
  { icon: <Github className="w-5 h-5" />, href: "https://github.com/AzharAli-web", label: "GitHub" },
  { icon: <Twitter className="w-5 h-5" />, href: "https://wa.me/923705516525", label: "Twitter" },
  { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/azhar-ali-62734432a", label: "LinkedIn" },
];


function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      className="border border-border rounded-xl overflow-hidden glass-card"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-surface/60 transition-colors"
      >
        <span className="font-medium text-foreground pr-4">{item.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-muted"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-muted text-sm leading-relaxed">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState("idle");

  const [nlEmail, setNlEmail] = useState("");
  const [nlStatus, setNlStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email is required.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (!form.message.trim() || form.message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitStatus("loading");
    await new Promise((r) => setTimeout(r, 1500));
    setSubmitStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitStatus("idle"), 5000);
  };

  const handleNlSubmit = async (e) => {
    e.preventDefault();
    if (!nlEmail || !/^\S+@\S+\.\S+$/.test(nlEmail)) { setNlStatus("error"); return; }
    setNlStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setNlStatus("success");
    setNlEmail("");
    setTimeout(() => setNlStatus("idle"), 4000);
  };

  const field = (key) => ({
    value: form[key],
    onChange: (e) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
    },
  });

  return (
    <div className="flex flex-col items-center w-full">

      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 overflow-hidden text-center">

        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-primary-500/20 blur-[110px] rounded-full -z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/15 blur-[90px] rounded-full -z-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.4 }}
        />

        <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary-500/30 text-sm font-medium text-primary-600 dark:text-primary-400"
          >
            <Mail className="w-4 h-4" /> Get in Touch
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-bold tracking-tight text-foreground"
          >
            Let&apos;s <span className="text-gradient">Talk</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            Have a question, an idea, or just want to say hello? We&apos;d love to hear from you.
            Drop us a message and we&apos;ll get back to you as soon as possible.
          </motion.p>

          <motion.div variants={fadeUp}>
            <a href="#contact-form">
              <Button size="lg" className="rounded-full px-10">
                Send a Message <Send className="ml-2 w-5 h-5" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </section>


      <section className="w-full bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {infoCards.map((card, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className={`glass-card border border-border/50 overflow-hidden`}>
                  <div className={`h-1.5 bg-gradient-to-r ${card.color}`} />
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}>
                      {card.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{card.title}</h3>
                      {card.lines.map((l, j) => (
                        <p key={j} className="text-muted text-sm">{l}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-10"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-11 h-11 rounded-full glass-card border border-border flex items-center justify-center text-muted hover:text-primary-600 hover:border-primary-500/50 hover:scale-110 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </section>


      <section id="contact-form" className="w-full py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Send Us a Message</h2>
            <p className="text-muted">Fill in the form below and we&apos;ll respond within 24 hours.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-border/50 shadow-xl"
          >
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center text-green-600">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted max-w-sm">Thanks for reaching out. We&apos;ll get back to you shortly.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6" noValidate>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                      <Input placeholder="John Doe" {...field("name")} className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""} />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                      <Input type="email" placeholder="you@example.com" {...field("email")} className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""} />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                    <Input placeholder="How can we help?" {...field("subject")} className={errors.subject ? "border-red-500 focus-visible:ring-red-500" : ""} />
                    {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea
                      rows={6}
                      placeholder="Tell us more about your enquiry..."
                      value={form.message}
                      onChange={(e) => { setForm((f) => ({ ...f, message: e.target.value })); if (errors.message) setErrors((er) => ({ ...er, message: "" })); }}
                      className={`w-full rounded-lg border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 transition-colors ${errors.message ? "border-red-500 focus-visible:ring-red-500" : "border-border"}`}
                    />
                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                  </div>

                  {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" /> Something went wrong. Please try again.
                    </div>
                  )}

                  <Button type="submit" size="lg" className="w-full rounded-xl" isLoading={submitStatus === "loading"} disabled={submitStatus === "loading"}>
                    {submitStatus === "loading" ? "Sending…" : <><Send className="w-4 h-4 mr-2" /> Send Message</>}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>


      <section className="w-full py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Find Us</h2>
            <p className="text-muted">Charsadda Road, Mardan, Pakistan</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden border border-border/50 shadow-xl h-80 md:h-[450px]"
          >
            <iframe
              title="BlogApp Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(20%) contrast(1.05)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>


      <section className="w-full py-24 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked <span className="text-gradient">Questions</span></h2>
            <p className="text-muted">Can&apos;t find an answer? Use the contact form above.</p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-3"
          >
            {faqs.map((item, i) => <FAQItem key={i} item={item} index={i} />)}
          </motion.div>
        </div>
      </section>


      <section className="w-full py-24 bg-surface relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-purple-500/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="glass-card rounded-3xl p-10 md:p-16 border border-primary-500/20 shadow-2xl bg-background/50 dark:bg-surface/50 backdrop-blur-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

            <Mail className="w-12 h-12 text-primary-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Stay in the Loop</h2>
            <p className="text-muted text-lg max-w-xl mx-auto mb-10">
              Get the latest articles and insights delivered straight to your inbox. No spam, unsubscribe anytime.
            </p>

            <form onSubmit={handleNlSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={nlEmail}
                  onChange={(e) => { setNlEmail(e.target.value); if (nlStatus === "error") setNlStatus("idle"); }}
                  className={`h-12 rounded-full px-6 ${nlStatus === "error" ? "border-red-500" : ""}`}
                  disabled={nlStatus === "loading" || nlStatus === "success"}
                />
                <Button
                  type="submit"
                  className="h-12 rounded-full px-8 w-full sm:w-auto shrink-0"
                  disabled={nlStatus === "loading" || nlStatus === "success"}
                  isLoading={nlStatus === "loading"}
                >
                  {nlStatus === "success" ? <><CheckCircle className="w-4 h-4 mr-2" /> Subscribed!</> : "Subscribe"}
                </Button>
              </div>
              <AnimatePresence>
                {nlStatus === "error" && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-sm mt-3">
                    Please enter a valid email address.
                  </motion.p>
                )}
                {nlStatus === "success" && (
                  <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-green-600 dark:text-green-400 font-medium text-sm mt-3">
                    🎉 Thank you for subscribing!
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
