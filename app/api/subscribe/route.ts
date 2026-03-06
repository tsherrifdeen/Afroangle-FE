import { NextResponse } from "next/server";
import { BrevoClient } from "@getbrevo/brevo";

const client = new BrevoClient({
  apiKey: process.env.BREVO_API_KEY || "",
});

export async function POST(req: Request) {
  try {
    const { email, fullName } = await req.json();
    // Basic validation
    if (!email || !fullName) {
      return NextResponse.json(
        { error: "Email and Full Name are required" },
        { status: 400 },
      );
    }
    // Split name for Brevo attributes (FNAME/LNAME are standard defaults)
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Prepare contact data for Brevo
    const createContact = {
      email: email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
      },
      listIds: [parseInt(process.env.BREVO_LIST_ID || "0")],
    };

    // Call Brevo API to create contact
    await client.contacts.createContact(createContact);

    return NextResponse.json(
      { message: "User successfully added to Brevo list" },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Brevo API Error:", error.response?.body || error.message);

    return NextResponse.json(
      { error: error.response?.body?.message || "Failed to add user to list" },
      { status: error.response?.status || 500 },
    );
  }
}
