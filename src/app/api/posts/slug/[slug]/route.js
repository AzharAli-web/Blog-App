import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User"; // Ensure User is loaded
import Comment from "@/models/Comment"; // Ensure Comment is loaded

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ message: "Slug is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Fetch the post by slug, populate author and likes
    const post = await Post.findOne({ slug, isPublished: true })
      .populate("author", "name avatar")
      .populate("likes", "name avatar");

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    // Increment views (optional, but good for blog)
    post.views = (post.views || 0) + 1;
    await post.save();

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Fetch single post error:", error);
    return NextResponse.json({ message: "Failed to fetch post" }, { status: 500 });
  }
}
