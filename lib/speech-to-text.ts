import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const speechToText = async (audio_file: File | Buffer) => {
  if (audio_file instanceof Buffer) {
    try {
      const audioFile = new File([audio_file], "tempSpeech.m4a", {
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
  } else {
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
  }
};
