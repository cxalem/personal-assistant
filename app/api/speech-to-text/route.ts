import { speechToText } from "@/lib/speech-to-text";

export async function POST(req: Response) {
  const { audio } = await req.json();
  const audioBuffer = Buffer.from(audio, "base64");
  const audioFile = new File([audioBuffer], "tempSpeech.m4a", {
    type: "audio/m4a",
  });

  console.log(audioFile);
  // fs.writeFileSync(tempFilePath, audioBuffer);

  try {
    const result = await speechToText(audioFile);
    // fs.unlinkSync(tempFilePath); // Limpiar el archivo temporal después de su uso
    return Response.json({ message: "ok", result });
  } catch (error) {
    return Response.json({ message: "error", error });
  }
}
