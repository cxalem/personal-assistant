import OpenAI from "openai";
import { toFile } from "openai/uploads";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const speechToText = async (audio_file: Buffer) => {
  try {
    const audioFile = await toFile(audio_file);
    const result = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: audioFile,
      response_format: "text",
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};
