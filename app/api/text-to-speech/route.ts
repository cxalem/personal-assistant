// import OpenAI from "openai";
import { textToSpeech } from "@/lib/text-to-speech";
import fs from "fs";
import path from "path";

const speechFile = path.resolve("./speech.mp3");
export const runtime = "edge";

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    await textToSpeech(text);
    const buffer = fs.readFileSync(speechFile);
    const base64 = buffer.toString("base64");
    return Response.json({ message: "ok", audio: base64 });
  } catch (error) {
    return Response.json({ message: "error", error });
  }
}
