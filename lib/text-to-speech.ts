import path from "path";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const speechFile = path.resolve("./speech.mp3");

export const textToSpeech = async (input: string) => {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "alloy",
      input,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
  };
  