import {
  sendAuthorConfirmation,
  sendEmailNotification,
} from "@/lib/brevoHelper";
import { sanityUploadClient } from "@/lib/SanityUploadClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const file = formData.get("file") as File;

    if (!name || !email || !file) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 1. Upload file to Sanity Assets
    const asset = await sanityUploadClient.assets.upload("file", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // 2. Create the document
    const result = await sanityUploadClient.create({
      _type: "opinionPiece",
      name,
      email,
      fileUpload: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      },
    });

    // 3. Trigger Brevo Email Notifications
    try {
      await Promise.all([
        sendEmailNotification(name, email, file.name),
        sendAuthorConfirmation(name, email),
      ]);
    } catch (emailErr) {
      console.error("Brevo Email Error:", emailErr);
      // We don't stop the process if the email fails, as the document is already in Sanity
    }

    return NextResponse.json({ id: result._id }, { status: 200 });
  } catch (err: any) {
    console.error("Sanity Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
