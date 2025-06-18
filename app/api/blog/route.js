import { writeFile } from "fs/promises";
import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { NextResponse } from "next/server";

const LoadDB = async () => {
  await ConnectDB();
};
LoadDB();

export async function POST(request) {
  try {
    console.log(" Receiving form data...");
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const category = formData.get("category");
    const author = formData.get("author");
    const authorImg = formData.get("authorImg");
    const image = formData.get("image");

    console.log(" Form Data Extracted:");
    console.log({ title, description, category, author, authorImg, image });

    if (!image || typeof image.arrayBuffer !== "function") {
      throw new Error(" Invalid image file received");
    }

    const timestamp = Date.now();
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const fileName = `${timestamp}_${image.name}`;
    const path = `./public/${fileName}`;

    console.log(" Writing file to:", path);
    await writeFile(path, buffer);
    console.log(" File saved");

    const imageUrl = `/${fileName}`;
    const blogData = {
      title,
      description,
      category,
      author,
      image: imageUrl,
      authorImg: authorImg,
    };

    console.log("Saving to DB:", blogData);
    await BlogModel.create(blogData);
    console.log("Blog saved");

    return NextResponse.json({ success: true, msg: "Blog added" });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, msg: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
