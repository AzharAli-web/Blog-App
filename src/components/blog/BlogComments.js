"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Heart,
  Reply,
  MoreHorizontal,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function BlogComments({
  comments,
  session,
  commentContent,
  setCommentContent,
  handleCommentSubmit,
  submittingComment,
}) {
  return (
    <section className="mt-16 w-full max-w-[850px]">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <MessageSquare size={24} className="font-black" />
          </div>

          <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
            Discussions
            <span className="ml-3 text-sm font-black bg-muted text-muted-foreground px-4 py-1 rounded-full tracking-widest">
              {comments.length}
            </span>
          </h3>
        </div>
      </div>

      <div className="space-y-12">
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background/80 backdrop-blur-xl shadow-xl p-6 md:p-8">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

          {!session ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground font-semibold mb-6">
                Want to join the conversation?
              </p>

              <Link href="/login">
                <Button
                  size="lg"
                  className="rounded-full px-10 font-black tracking-widest text-xs uppercase shadow-lg"
                >
                  Sign in to Comment
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleCommentSubmit} className="relative z-10">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-12 h-12 rounded-2xl bg-primary flex-shrink-0 overflow-hidden ring-4 ring-primary/20">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-black text-primary-foreground text-lg">
                      {session.user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    placeholder="Share your perspective..."
                    className="w-full bg-transparent border-none outline-none focus:ring-0 text-base md:text-lg text-foreground placeholder:text-muted-foreground min-h-[140px] resize-none leading-relaxed"
                    required
                  />

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="text-xs text-muted-foreground font-bold tracking-widest uppercase">
                      Formatting:
                      <span className="opacity-70 ml-1">
                        Markdown supported
                      </span>
                    </div>

                    <Button
                      type="submit"
                      disabled={
                        submittingComment || !commentContent.trim()
                      }
                      className="rounded-xl px-8 h-12 font-black gap-2 transition-all shadow-lg"
                    >
                      {submittingComment ? (
                        "Syncing..."
                      ) : (
                        <>
                          Post <Send size={16} />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <AnimatePresence mode="popLayout">
            {comments.length > 0 ? (
              comments.map((comment, idx) => (
                <motion.div
                  key={comment._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative group"
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Avatar + Line */}
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-card border border-border flex-shrink-0 overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                        {comment.author?.avatar ? (
                          <img
                            src={comment.author.avatar}
                            alt={comment.author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-black text-primary text-lg uppercase bg-primary/10">
                            {comment.author?.name?.charAt(0) || "U"}
                          </div>
                        )}
                      </div>

                      {idx < comments.length - 1 && (
                        <div className="w-0.5 flex-1 bg-border my-4 rounded-full opacity-50" />
                      )}
                    </div>

                    {/* Comment Card */}
                    <div className="flex-1 min-w-0">
                      <div className="rounded-3xl p-5 md:p-7 border border-border bg-card/70 backdrop-blur-sm transition-all hover:bg-card hover:border-primary/20 hover:shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="min-w-0">
                            <h4 className="font-black text-foreground text-sm flex items-center gap-2 truncate">
                              {comment.author?.name || "Anonymous"}

                              {comment.author?.isAuthor && (
                                <span className="text-[9px] bg-primary text-primary-foreground px-2 py-0.5 rounded-md uppercase font-black tracking-widest shadow-sm">
                                  AUTHOR
                                </span>
                              )}
                            </h4>

                            <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                              {new Date(
                                comment.createdAt
                              ).toLocaleDateString(undefined, {
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>

                          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-xl">
                            <MoreHorizontal size={18} />
                          </button>
                        </div>

                        <p className="text-foreground leading-[1.8] text-base md:text-lg break-words">
                          {comment.content}
                        </p>

                        <div className="flex items-center gap-6 mt-8 pt-6 border-t border-border">
                          <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-red-500 transition-colors group/like">
                            <Heart
                              size={16}
                              className="group-hover/like:scale-125 transition-transform"
                            />
                            24
                          </button>

                          <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors group/reply">
                            <Reply
                              size={16}
                              className="group-hover/reply:scale-125 transition-transform"
                            />
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-24 border-2 border-dashed border-border rounded-[3rem] bg-muted/20">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="text-primary/40 w-10 h-10" />
                </div>

                <p className="text-foreground text-xl font-black tracking-tight">
                  Quiet in here...
                </p>

                <p className="text-muted-foreground mt-2 font-medium">
                  Be the first to spark a conversation!
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}