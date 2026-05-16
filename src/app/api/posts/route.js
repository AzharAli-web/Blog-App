import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { CATEGORIES } from "@/lib/categories";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Fetch all published posts
    const posts = await Post.find({ isPublished: true })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Fetch posts error:", error);
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { title, content, excerpt, featuredImage, tags, categories, featured } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Create a base slug
    let slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    // Check if slug exists
    const existingSlug = await Post.findOne({ slug });
    if (existingSlug) {
      slug = `${slug}-${Date.now()}`;
    }

    // Validate categories
    const validCategories = Array.isArray(categories) 
      ? categories.filter(c => CATEGORIES.includes(c))
      : [];

    const newPost = await Post.create({
      title,
      slug,
      content,
      excerpt,
      featuredImage: featuredImage || { url: '', public_id: '' },
      author: session.user.id,
      tags: tags || [],
      categories: validCategories,
      featured: featured === true || featured === "true",
    });

    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      { message: "Server error during post creation" },
      { status: 500 }
    );
  }
}
