// app/api/comment/route.ts
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN, // The private token you just made
  useCdn: false, // We need fresh data for writes
});

export async function POST(req: Request) {
  const { _id, name, email, message } = await req.json();

  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id, // The ID of the blog post being commented on
      },
      name,
      email,
      message,
      approved: false, // Default to false so you can moderate them
    });

    return NextResponse.json({ message: "Comment submitted" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error submitting comment", error: err },
      { status: 500 }
    );
  }
}
