import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Create a new Prisma Client
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    // Fetch all videos from the database
    const videos = await prisma.video.findMany({
      // Order the videos by the creation date
      orderBy: {
        createdAt: "desc",
      },
    });
    // Return the videos as a JSON response
    return NextResponse.json(videos);
  } catch (error) {
    // If an error occurs, return an error response
    return NextResponse.json(
      { error: "Error Fetching Videos" },
      { status: 500 }
    );
  } finally {
    // Disconnect the Prisma Client
    await prisma.$disconnect();
  }
}
