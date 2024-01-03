import { speechToText } from "@/lib/speech-to-text";

export async function POST(req: Request) {
  const audioBlob = await req.blob();
  const audioFile = new File([audioBlob], "tempSpeech.m4a", {
    type: "audio/m4a",
  });

  try {
    const result = await speechToText(audioFile);
    return Response.json({ message: "ok", result });
  } catch (error) {
    return Response.json({ message: "error", error });
  }
}
