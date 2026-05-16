"use client";

// CSS must be imported statically at the top level — Turbopack/webpack cannot
// dynamically import CSS inside an async factory function.
import "react-quill-new/dist/quill.snow.css";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Image as ImageIcon, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";


const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] flex items-center justify-center bg-surface/50 rounded-xl border border-border text-muted">
      Loading editor...
    </div>
  ),
});

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "code-block"],
    ["clean"],
  ],
};

export default function CreatePostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    tags: "",
    categories: [],
    featured: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    // Fetch categories
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setAvailableCategories(data))
      .catch(err => console.error("Failed to load categories:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === "checkbox" ? checked : value 
    });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const toggleCategory = (cat) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let featuredImage = { url: "", public_id: "" };

   
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadResult = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error(uploadResult.message || "Image upload failed");
        }

        featuredImage = {
          url: uploadResult.url,
          public_id: uploadResult.public_id,
        };
      }


      const tagsArray = formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      
      const categoriesArray = formData.categories;

      const postRes = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          tags: tagsArray,
          categories: categoriesArray,
          featuredImage,
          featured: formData.featured,
        }),
      });

      const postData = await postRes.json();

      if (!postRes.ok) {
        throw new Error(postData.message || "Failed to create post");
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  const isContentEmpty =
    !formData.content ||
    formData.content === "<p><br></p>" ||
    formData.content.trim() === "";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Story</h1>
        <p className="text-muted">Draft your thoughts and share them with the world.</p>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="glass-card p-6 md:p-8 rounded-2xl space-y-6">

          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title..."
              className="text-lg py-6"
              required
            />
          </div>

   
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Featured Image</label>

            {imagePreview ? (
              <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden group">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={removeImage}
                    className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors transform hover:scale-110"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-xl cursor-pointer bg-surface/30 hover:bg-surface/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-500 flex items-center justify-center mb-4">
                    <ImageIcon size={24} />
                  </div>
                  <p className="mb-2 text-sm text-muted">
                    <span className="font-semibold text-primary-600 dark:text-primary-400">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-muted/70">PNG, JPG or WEBP (MAX. 5MB)</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

    
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">
              Content <span className="text-red-500">*</span>
            </label>
            <div className="bg-background rounded-xl border border-border overflow-hidden [&_.ql-toolbar]:border-none [&_.ql-toolbar]:bg-surface/50 [&_.ql-container]:border-none [&_.ql-container]:text-base [&_.ql-editor]:min-h-[400px] [&_.ql-editor]:text-foreground">
              {isMounted ? (
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={handleContentChange}
                  placeholder="Write your story here..."
                  modules={quillModules}
                />
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-surface/50">
                  <p className="text-muted">Loading editor...</p>
                </div>
              )}
            </div>
          </div>

  
          <div className="space-y-2">
            <label className="text-sm font-medium ml-1">Excerpt (Optional)</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="A brief summary of your post..."
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition-all focus:border-primary-500 focus:ring-1 focus:ring-primary-500 resize-none h-24"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Tags</label>
              <Input
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="tech, web, design (comma separated)"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Categories</label>
              <div className="flex flex-wrap gap-2 p-4 rounded-xl bg-surface border border-border">
                {availableCategories.length === 0 ? (
                  <span className="text-muted text-sm">Loading categories...</span>
                ) : (
                  availableCategories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                        ${formData.categories.includes(cat) 
                          ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30' 
                          : 'bg-background text-foreground border border-border hover:bg-primary-50 dark:hover:bg-primary-900/20'
                        }`}
                    >
                      {cat}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-primary-500/5 border border-primary-500/10">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-5 h-5 rounded border-border text-primary-600 focus:ring-primary-500 transition-all cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm font-medium cursor-pointer select-none">
              Mark as Featured Post <span className="text-muted font-normal ml-1">(Will appear in the homepage featured section)</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !formData.title || isContentEmpty}
          >
            {loading ? "Publishing..." : "Publish Story"}{" "}
            <Send className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
