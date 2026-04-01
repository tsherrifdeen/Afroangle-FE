import { NextRequest, NextResponse } from "next/server";
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import { sanityUploadClient } from "@/lib/SanityUploadClient";
import { blocksToText } from "@/lib/blocksToText";

// Initialize ElevenLabs
const elevenLabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { postId, body, title, author } = await req.json();

    if (!postId || !body) {
      return NextResponse.json(
        { message: "Missing postId or body" },
        { status: 400 },
      );
    }

    const bodyText = blocksToText(body);
    // A. Prepare Text'
    const textToSpeak = `${title || ""}. ${author ? `Written by ${author.name}.` : ""} \n\n${bodyText}`;

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
      "neMPCpWtBwWZhxEC8qpe",
      {
        text: textToSpeak,
        modelId: "eleven_flash_v2_5",
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
    const asset = await sanityUploadClient.assets.upload("file", audioBuffer, {
      filename: `audio-${title}.mp3`,
      contentType: "audio/mpeg",
    });

    // E. Link the Asset to the Post
    // We patch the post document to point to the new file asset
    await sanityUploadClient
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
    // console.error("Audio Gen Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
