import OpenAI, { toFile } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const speechToText = async (audio_file: Buffer) => {
  try {
    const audioFile = await toFile(audio_file, "tempSpeech.m4a", {
      type: "audio/m4a",
    });
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
