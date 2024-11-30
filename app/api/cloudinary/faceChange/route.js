// app/api/facechange/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    console.log("API Key:", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
    console.log("API Secret:", process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET);
    // Search for all images in the faceChange folder
    const results = await cloudinary.search
      .expression("resource_type:image AND folder:faceChange/*")
      .sort_by("created_at", "desc")
      .max_results(100)
      .with_field("context")
      .with_field("tags")
      .execute();

    return NextResponse.json(results.resources);
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return NextResponse.json(
      { error: "Error fetching images" },
      { status: 500 }
    );
  }
}
