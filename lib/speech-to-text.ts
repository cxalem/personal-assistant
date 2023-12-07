import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
  dangerouslyAllowBrowser: true,
});

export const speechToText = async (audio: File) => {
  try {
    const result = await openai.audio.transcriptions.create({
      model: "whisper-1",
      file: audio,
      response_format: "text",
    });
    console.log(result);
    return result;
  } catch (e) {
    console.error(e);
  }
};
