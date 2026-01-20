import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

// 1. Initialize Sanity Client with WRITE permissions
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-01-17",
  token: process.env.SANITY_API_WRITE_TOKEN, // CRITICAL: Must be a Write token
  useCdn: false, // Always false for write operations
});

// 2. Initialize ElevenLabs
const elevenLabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

// Helper: Convert Portable Text Blocks to Plain String
function blocksToText(blocks: any[] = []) {
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return "";
      return block.children.map((child: any) => child.text).join("");
    })
    .join("\n\n");
}

export async function POST(req: NextRequest) {
  try {
    const { postId, body } = await req.json();

    if (!postId || !body) {
      return NextResponse.json(
        { message: "Missing postId or body" },
        { status: 400 },
      );
    }

    // A. Prepare Text
    const textToSpeak = blocksToText(body);

    // Safety check to save money
    if (textToSpeak.length < 50) {
      return NextResponse.json(
        { message: "Text too short to generate audio" },
        { status: 400 },
      );
    }

    // B. Call ElevenLabs API
    // "Rachel" Voice ID: 21m00Tcm4TlvDq8ikWAM (Standard English Voice)
    const audioStream = await elevenLabs.textToSpeech.convert(
      "21m00Tcm4TlvDq8ikWAM",
      {
        text: textToSpeak,
        modelId: "eleven_turbo_v2",
        outputFormat: "mp3_44100_128",
      },
    );

    // C. Convert Stream to Buffer (Node.js/Next.js requirement for upload)
    const chunks = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }
    const audioBuffer = Buffer.concat(chunks);

    // D. Upload to Sanity
    // This stores the actual file in Sanity's CDN
    const asset = await sanityClient.assets.upload("file", audioBuffer, {
      filename: `narration-${postId}.mp3`,
      contentType: "audio/mpeg",
    });

    // E. Link the Asset to the Post
    // We patch the post document to point to the new file asset
    await sanityClient
      .patch(postId)
      .set({
        audio: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
      })
      .commit();

    return NextResponse.json({
      success: true,
      message: "Audio generated and saved",
    });
  } catch (error: any) {
    console.error("Audio Gen Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
