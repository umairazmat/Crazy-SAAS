import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

// Interact with Cloudinary
interface CloudinaryUploadResult {
  public_id: string;
  [key: string]: any;
}

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  // Handle the file upload
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
          { folder: "nextjs-file-uploads-crazy-saas" }, // Add your folder here
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
    // Return the public ID of the uploaded image
    return NextResponse.json({ publicId: result.public_id }, { status: 200 }); // Proper response
  } catch (error) {
    // If there is an error, log it and return an error response
    console.error("Uploading Image is Failed", error);
    return NextResponse.json(
      { error: "Uploading Image is Failed" },
      { status: 500 }
    );
  }
}
