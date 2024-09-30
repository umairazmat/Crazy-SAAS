import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";

// Create a new Prisma Client
const prisma = new PrismaClient();

// Interact with Cloudinary
interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
  bytes: number;
  duration?: number;
}

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  // Handle the Video upload
  try {
    // Check if the user is authenticated
    const { userId } = auth();

    // If the user is not authenticated, return an error
    if (!userId) {
      return NextResponse.json(new Error("Unauthorized"), { status: 401 });
    }

    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(new Error("Cloudinary keys not found"), {
        status: 500,
      });
    }

    // Parse the incoming form data
    const formData = await request.formData();
    // Get the file from the form data
    const file = formData.get("file") as File | null;
    // Get the title and description from the form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    // Get the original size from the form data
    const originalSize = formData.get("originalSize") as string;

    // If no file is found, return an error
    if (!file) {
      return NextResponse.json(new Error("No file found"), { status: 400 });
    }

    // Read the file as a buffer
    const bytes = await file.arrayBuffer();
    // Convert the buffer to a buffer
    const buffer = Buffer.from(bytes);

    // Upload the file to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        // Upload the buffer to Cloudinary
        const uploadStream = cloudinary.uploader.upload_stream(
          // Use the folder name to organize the images
          {
            resource_type: "video",
            folder: "nextjs-video-uploads-crazy-saas",
            transformation: [{ quality: "auto", fetch_format: "mp4" }],
          }, // Add your folder here
          (error, result) => {
            // Handle the result of the upload
            if (error) reject(error);
            // If there is no error, resolve the result
            else resolve(result as CloudinaryUploadResult);
          }
        );
        // End the stream with the buffer
        uploadStream.end(buffer); // Correct way to close the stream
      }
    );
    // Create a new video in the database
    const video = await prisma.video.create({
      // Create a new video with the title, description, and public ID
      data: {
        title,
        description,
        publicId: result.public_id,
        originalSize: originalSize,
        compressedSize: String(result.bytes),
        duration: result.duration || 0,
      },
    });
    return NextResponse.json(video, { status: 200 });
  } catch (error) {
    // If there is an error, log it and return an error response
    console.error("Uploading Video is Failed", error);
    return NextResponse.json(
      { error: "Uploading Video is Failed" },
      { status: 500 }
    );
  }
}
