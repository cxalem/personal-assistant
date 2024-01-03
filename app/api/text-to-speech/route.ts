import { textToSpeech } from "@/lib/text-to-speech";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const blob = await textToSpeech(text);
    return new NextResponse(blob, {
      status: 200,
      headers: {
        "Content-Type": "audio/mp3",
        "Content-Disposition": "attachment; filename=speech.mp3",
      },
    })
  } catch (error) {
    return Response.json({ message: "error", error });
  }
}
