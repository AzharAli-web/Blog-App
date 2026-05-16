import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Sparkles, ChevronRight, Search } from "lucide-react";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";
import { CATEGORIES } from "@/lib/categories";

// Generate static params for categories
export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.toLowerCase(),
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${categoryName} Articles - BlogApp`,
    description: `Read our latest articles and insights about ${categoryName}.`,
  };
}

const getMockReadingTime = (text) => Math.max(2, Math.ceil((text?.length || 1000) / 1000));

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  await connectToDatabase();
  

  const posts = await Post.find({
    isPublished: true,
    categories: { $regex: new RegExp(`^${categoryName}$`, "i") }
  })
    .populate("author", "name avatar")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Category: <span className="text-primary-600 dark:text-primary-400">{categoryName}</span>
        </h1>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Explore all our articles and insights related to {categoryName}.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 bg-surface border border-dashed border-border/60 rounded-3xl">
          <Search className="w-12 h-12 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-bold text-foreground">No posts found</h3>
          <p className="text-muted">There are currently no posts published in the {categoryName} category.</p>
          <Link href="/blog">
             <button className="mt-6 px-6 py-2 rounded-full border border-border bg-background hover:bg-surface transition-colors">
               View All Articles
             </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link key={post._id.toString()} href={`/blog/${post.slug}`} className="block h-full group">
              <Card className="h-full flex flex-col bg-surface border-border/50 hover:border-primary-500/40 transition-all duration-300 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl dark:bg-surface/30">
                <div className="w-full h-56 relative overflow-hidden">
                  <img
                    src={post.featuredImage?.url || 'https://source.unsplash.com/random/800x600?nature'}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {post.featured && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-black/70 text-white text-xs backdrop-blur-md">
                      <Sparkles className="w-3 h-3" /> Featured
                    </div>
                  )}
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
                        {post.author?.avatar ? (
                          <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary-700 text-xs font-bold">
                            {post.author?.name?.charAt(0) || 'U'}
                          </div>
                        )}
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
          ))}
        </div>
      )}
    </div>
  );
}
