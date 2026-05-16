import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";

export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    let resolvedParams = params;
    if (params instanceof Promise) {
      resolvedParams = await params;
    }
    const id = resolvedParams.id;

    await connectToDatabase();
    
    const post = await Post.findOne({ _id: id, author: session.user.id });
    if (!post) {
       return NextResponse.json({ message: "Not found or not authorized" }, { status: 404 });
    }

    await Post.findByIdAndDelete(id);

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete post error:", error);
    return NextResponse.json({ message: "Server error during deletion" }, { status: 500 });
  }
}
