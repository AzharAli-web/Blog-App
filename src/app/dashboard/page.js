"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit3, Trash2, Eye, FileText, CheckCircle, BarChart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts/user");
      const data = await res.json();
      if (res.ok) {
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    
    try {
      const res = await fetch(`/api/posts/${postId}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter((p) => p._id !== postId));
      }
    } catch (error) {
       console.error(error);
    }
  };

  if (loading) {
    return <div className="h-40 flex items-center justify-center text-muted">Loading posts...</div>;
  }

  const totalPosts = posts.length;
  const publishedPosts = posts.filter(p => p.isPublished).length;
  const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-muted">Welcome back. Here's what's happening with your content today.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total Stories</p>
              <h3 className="text-3xl font-bold text-foreground">{totalPosts}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Published</p>
              <h3 className="text-3xl font-bold text-foreground">{publishedPosts}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
              <BarChart size={24} />
            </div>
            <div>
              <p className="text-sm text-muted font-medium">Total Views</p>
              <h3 className="text-3xl font-bold text-foreground">{totalViews}</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between pt-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Recent Stories</h2>
          <p className="text-muted text-sm">Manage your published and draft stories.</p>
        </div>
        <Link href="/dashboard/create">
          <Button>
            <Plus className="w-5 h-5 mr-2" /> New Story
          </Button>
        </Link>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden border border-border/50">
        {posts.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center text-primary-500 mb-4">
              <Plus size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">No stories yet</h3>
            <p className="text-muted mb-6">You haven't written any stories. Start one today!</p>
            <Link href="/dashboard/create">
              <Button variant="secondary">Write your first story</Button>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-surface/50">
                  <th className="px-6 py-4 font-medium text-sm text-muted">Title</th>
                  <th className="px-6 py-4 font-medium text-sm text-muted">Status</th>
                  <th className="px-6 py-4 font-medium text-sm text-muted">Views</th>
                  <th className="px-6 py-4 font-medium text-sm text-muted">Date</th>
                  <th className="px-6 py-4 font-medium text-sm text-muted text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post._id} className="border-b last:border-0 border-border/50 hover:bg-surface/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground line-clamp-1">{post.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${post.isPublished ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                        {post.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted">
                      {post.views || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted whitespace-nowrap">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <button className="p-2 text-muted hover:text-primary-500 transition-colors">
                            <Eye size={18} />
                          </button>
                        </Link>
                        <button className="p-2 text-muted hover:text-red-500 transition-colors" onClick={() => handleDelete(post._id)}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
