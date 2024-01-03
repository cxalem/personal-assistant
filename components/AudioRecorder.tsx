"use client";

import { useState, useRef, useEffect } from "react";
import { speechToText } from "@/lib/speech-to-text";
import Lottie from "lottie-react";
import animationData from "../assets/animated-mic.json";
import { useAccount } from "wagmi";
import type { Transcription } from "openai/resources/audio/transcriptions";

export const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | undefined>();
  const [response, setResponse] = useState<string>("");
  const [text, setText] = useState<Transcription | undefined>();
  const lottieRef = useRef<any | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const { isConnected } = useAccount();

  const startRecording = async () => {
    audioChunks.current = []; // reset audio chunks
    lottieRef.current?.play();
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
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = async () => {
    mediaRecorderRef.current?.stop();
    lottieRef.current?.stop();
    setIsRecording(false);
  };

  const handleSpeechToText = async () => {
    if (!audioBlob) return;
    console.log("speech to text");
    const convertedText = await speechToText(
      new File([audioBlob], "user-speech.m4a")
    );
    setText(convertedText);
  };

  const handleTextToChatGPT = async () => {
    if (!text) return;
    try {
      const response = await fetch("/api/text-to-chatgpt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: text }),
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

  if (!isConnected) {
    return (
      <p className="mt-32 text-2xl font-medium max-w-md text-center mx-auto">
        Looks like you&apos;re not connected, please connect your wallet to
        continue!
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-10">
      <button onClick={isRecording ? stopRecording : startRecording}>
        <Lottie
          autoplay={false}
          lottieRef={lottieRef}
          animationData={animationData}
        />
      </button>
      <div>{response}</div>
    </div>
  );
};
