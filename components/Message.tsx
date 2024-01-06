import { useCallback, useEffect, useState } from "react";

export const Message = ({
  message,
  type,
}: {
  message: string;
  type: "user" | "system";
}) => {
  const [answering, setAnswering] = useState(true);

  const handleTextToSpeech = useCallback(async (text: string) => {
    try {
      const res = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
      setAnswering(false);
    } catch (err) {
      console.error("Error getting the audio:", err);
      setAnswering(false);
    }
  }, []);

  useEffect(() => {
    if (type === "system") handleTextToSpeech(message);
  }, [message, type, handleTextToSpeech]);

  return (
    <>
      {type === "user" ? (
        <div className="bg-lime-100 w-fit pl-5 pr-12 py-4 rounded-lg ml-auto">
          <h3 className="font-bold text-gray-600">Best user in the world:</h3>
          <p className="text-gray-600">{message}</p>
        </div>
      ) : (
        <>
          {answering ? (
            <div>Answering...</div>
          ) : (
            <div className="bg-orange-100 pl-5 pr-12 py-4 rounded-lg max-w-lg">
              <h3 className="font-bold text-gray-600">TRAVIS:</h3>
              <p className="text-gray-600">{message}</p>
            </div>
          )}
        </>
      )}
    </>
  );
};
