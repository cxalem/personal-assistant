import { speechToText } from "@/lib/speech-to-text";

export async function POST(req: Request) {
  const audioBlob = await req.blob();
  const audioBuffer = Buffer.from(await audioBlob.arrayBuffer());
  

  try {
    const result = await speechToText(audioBuffer);
    return Response.json({ message: "ok", result });
  } catch (error) {
    return Response.json({ message: "error", error });
  }
}
