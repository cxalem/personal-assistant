"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { speechToText } from "@/lib/speech-to-text";
import { Transcription } from "openai/resources/audio/transcriptions.mjs";

const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");
  const [text, setText] = useState<Transcription | undefined>();

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const startRecording = async () => {
    audioChunks.current = []; // reset audio chunks
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, {
          type: "audio/m4a",
        });
        setAudioBlob(audioBlob);
        setAudioUrl(URL.createObjectURL(audioBlob));
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = async () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const handleSpeechToText = async () => {
    if (!audioBlob) return;
    const text = await speechToText(new File([audioBlob], "speech.m4a"));
    setText(text);
  };

  const handleTextToChatGPT = async () => {
    console.log(text);
    if (!text) return;
    try {
      const response = await fetch("/api/text-to-chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      if (!response.ok || response.body == null)
        throw new Error(response.statusText);
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        const chunk = decoder.decode(value);
        setResponse((prev: string) => prev + chunk);
        if (done) break;
      }
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  useEffect(() => {
    handleSpeechToText();
  }, [audioBlob]);

  useEffect(() => {
    handleTextToChatGPT();
  }, [text]);

  return (
    <div className="flex flex-col gap-4">
      <Button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioUrl && <audio src={audioUrl} controls />}
      <Button>Speech to Text</Button>
      <div>{response}</div>
    </div>
  );
};
