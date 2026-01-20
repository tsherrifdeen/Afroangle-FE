// app/api/comment/route.ts
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

/* ===========================
   Sanity client
=========================== */
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
});

const RATE_LIMIT = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const windowMs = 60_000; // 1 minute
  const limit = 5;

  const requests = RATE_LIMIT.get(ip) || [];
  const recent = requests.filter((t) => now - t < windowMs);

  recent.push(now);
  RATE_LIMIT.set(ip, recent);

  return recent.length > limit;
}

export async function POST(req: Request) {
  const body = await req.json();

  const {
    _id,
    name,
    email,
    message,
    website, // honeypot
    startedAt, // timestamp
  } = body;

  /* ===========================
     1. Honeypot check
  ============================ */
  if (website) {
    return NextResponse.json({ message: "Bot detected" }, { status: 400 });
  }

  /* ===========================
     2. Too-fast submission check
  ============================ */
  if (startedAt && Date.now() - startedAt < 3000) {
    return NextResponse.json({ message: "Bot detected" }, { status: 400 });
  }

  /* ===========================
     3. Basic validation
  ============================ */
  if (
    !_id ||
    !name ||
    !email ||
    !message ||
    message.length < 5 ||
    message.length > 1000
  ) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  /* ===========================
     4. Rate limiting
  ============================ */
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ message: "Too many requests" }, { status: 429 });
  }

  /* ===========================
     5. Save comment to Sanity
  ============================ */
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: _id,
      },
      name,
      email,
      message,
      approved: true,
    });

    return NextResponse.json({ message: "Comment submitted" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error submitting comment" },
      { status: 500 },
    );
  }
}
