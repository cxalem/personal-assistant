import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true,
});

export const speechToText = async (audio_file: File) => {
  try {
    const result = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: audio_file,
      response_format: "text",
    });
    return result;
  } catch (e) {
    console.error(e);
  }
};
