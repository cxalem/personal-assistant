import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const textToSpeech = async (input: string) => {
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    const blob = new Blob([buffer], { type: "audio/mp3" });
    return blob;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
