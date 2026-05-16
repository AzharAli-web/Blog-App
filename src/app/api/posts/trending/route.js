import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Post from "@/models/Post";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    // Aggregation pipeline to calculate trending score and sort
    const trendingPosts = await Post.aggregate([
      {
        $match: { isPublished: true }
      },
      {
        $addFields: {
          trendingScore: {
            $add: [
              { $multiply: [{ $ifNull: ["$likesCount", 0] }, 3] },
              { $multiply: [{ $ifNull: ["$commentsCount", 0] }, 5] },
              { $ifNull: ["$views", 0] }
            ]
          }
        }
      },
      {
        $sort: { trendingScore: -1, createdAt: -1 }
      },
      {
        $limit: 6
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorDetails"
        }
      },
      {
        $addFields: {
          author: { $arrayElemAt: ["$authorDetails", 0] }
        }
      },
      {
        $project: {
          authorDetails: 0,
          "author.password": 0,
          "author.email": 0
        }
      }
    ]);

    return NextResponse.json(trendingPosts, { status: 200 });
  } catch (error) {
    console.error("Fetch trending posts error:", error);
    return NextResponse.json({ message: "Failed to fetch trending posts" }, { status: 500 });
  }
}
