import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function POST(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const userId = session.user.id;
    const hasLiked = post.likes.includes(userId);

    if (hasLiked) {
      
      post.likes = post.likes.filter((likeId) => likeId.toString() !== userId.toString());
    } else {
      
      post.likes.push(userId);
    }

    await post.save();

    return NextResponse.json({ message: "Success", likes: post.likes }, { status: 200 });
  } catch (error) {
    console.error("Like post error:", error);
    return NextResponse.json({ message: "Server error during like" }, { status: 500 });
  }
}
