import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Comment from "@/models/Comment";
import User from "@/models/User"; // Ensure User is loaded

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    await connectToDatabase();

    const comments = await Comment.find({ post: id })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Fetch comments error:", error);
    return NextResponse.json({ message: "Failed to fetch comments" }, { status: 500 });
  }
}

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

    const { content } = await request.json();

    if (!content || content.trim() === "") {
      return NextResponse.json({ message: "Comment content is required" }, { status: 400 });
    }

    await connectToDatabase();

    const newComment = await Comment.create({
      content,
      author: session.user.id,
      post: id,
    });

    const populatedComment = await Comment.findById(newComment._id).populate("author", "name avatar");

    return NextResponse.json({ message: "Comment added successfully", comment: populatedComment }, { status: 201 });
  } catch (error) {
    console.error("Create comment error:", error);
    return NextResponse.json({ message: "Server error during comment creation" }, { status: 500 });
  }
}
