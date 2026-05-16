"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

// Components
import BlogHero from "@/components/blog/BlogHero";
import BlogContent from "@/components/blog/BlogContent";
import BlogSidebar from "@/components/blog/BlogSidebar";
import BlogComments from "@/components/blog/BlogComments";
import RelatedPosts from "@/components/blog/RelatedPosts";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ScrollToTop from "@/components/blog/ScrollToTop";
import BlogSkeleton from "@/components/blog/BlogSkeleton";

export default function SinglePost() {
  const params = useParams();
  const slug = params.slug;
  const { data: session } = useSession();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    async function fetchPostData() {
      if (!slug) return;
      try {
        setLoading(true);
        const res = await fetch(`/api/posts/slug/${slug}`);
        if (!res.ok) throw new Error("Post not found");
        const postData = await res.json();
        setPost(postData);

        setLikesCount(postData.likes?.length || 0);
        if (session?.user?.id && postData.likes?.some(like => like._id === session.user.id || like === session.user.id)) {
          setHasLiked(true);
        }

        const [commentsRes, relatedRes] = await Promise.all([
          fetch(`/api/posts/${postData._id}/comments`),
          fetch(`/api/posts?category=${postData.categories?.[0] || ""}`)
        ]);

        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }

        if (relatedRes.ok) {
          const relatedData = await relatedRes.json();
          setRelatedPosts(relatedData.filter(p => p._id !== postData._id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPostData();
  }, [slug, session]);

  const handleLike = async () => {
    if (!session) return alert("Please sign in to like this post.");
    try {
      const newHasLiked = !hasLiked;
      setHasLiked(newHasLiked);
      setLikesCount(prev => newHasLiked ? prev + 1 : prev - 1);
      const res = await fetch(`/api/posts/${post._id}/like`, { method: "POST" });
      if (!res.ok) {
        setHasLiked(hasLiked);
        setLikesCount(prev => hasLiked ? prev + 1 : prev - 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    setSubmittingComment(true);
    try {
      const res = await fetch(`/api/posts/${post._id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: commentContent }),
      });
      if (res.ok) {
        const data = await res.json();
        setComments([data.comment, ...comments]);
        setCommentContent("");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingComment(false);
    }
  };

  if (loading) return <BlogSkeleton />;
  if (!post) return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6 p-4 text-center">
      <h2 className="text-7xl font-black text-primary-500/20">404</h2>
      <p className="text-muted text-xl font-medium max-w-md">The article you're looking for doesn't exist or has been moved.</p>
      <Link href="/blog">
        <Button size="lg" className="rounded-full px-10">Back to Library</Button>
      </Link>
    </div>
  );

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="w-full bg-background min-h-screen overflow-x-hidden">
      <ReadingProgress />
      <ScrollToTop />

      {/* Floating Back Button for all screen sizes */}
      <div className="fixed top-24 left-4 lg:left-8 z-50">
        <Link href="/blog">
          <Button variant="ghost" className="h-12 w-12 lg:w-auto lg:px-6 rounded-full bg-surface/50 backdrop-blur-xl border border-border shadow-2xl hover:bg-surface transition-all group">
            <ArrowLeft className="w-5 h-5 lg:mr-2 group-hover:-translate-x-1 transition-transform" /> 
            <span className="hidden lg:inline font-bold">Back</span>
          </Button>
        </Link>
      </div>

      <article className="relative">
        <BlogHero post={post} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-30">
          {/* Main Article Grid */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
            
            {/* Main Content Column - Using professional reading width constraints */}
            <div className="w-full lg:flex-1 max-w-[850px] mx-auto lg:mx-0">
              <BlogContent content={post.content} />
              
              <div className="mt-12">
                <BlogComments 
                  comments={comments}
                  session={session}
                  commentContent={commentContent}
                  setCommentContent={setCommentContent}
                  handleCommentSubmit={handleCommentSubmit}
                  submittingComment={submittingComment}
                />
              </div>
            </div>

            {/* Sidebar Column - Fixed width and sticky */}
            <div className="w-full lg:w-[350px] flex-shrink-0">
              <BlogSidebar 
                post={post}
                likesCount={likesCount}
                hasLiked={hasLiked}
                handleLike={handleLike}
                commentsCount={comments.length}
                shareUrl={shareUrl}
              />
            </div>

          </div>
        </div>
      </article>

      <RelatedPosts posts={relatedPosts} />
    </div>
  );
}
