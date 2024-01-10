"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Message } from "./Message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Question = {
  question: string;
  answer: string;
  answered?: boolean;
};

const DEFAULT_QUESTIONS: Question[] = [
  {
    question: "Tell me more about Alejandro!",
    answer:
      "Alejandro is passionate about building, likes to learn new things and share that knowledge! He has been working as a Software Engineer for more than a year at ConsenSys, a blockchain company. There he works being part of the RAD Team, a team dedicated to build sample apps using ConsenSys technologies and to create content about these apps!",
    answered: false,
  },
  {
    question: "Where is Alejandro based?",
    answer:
      "Alejandro is based in Lima, Perú, a country located in South America full of delicious food!",
    answered: false,
  },
  {
    question: "What is Ale working on right now?",
    answer:
      "Well, Alejandro is building me right now, this is a public version of me, but there is another version where you can talk to me and I'll answer using GPT-4. it's still under development, but you can check it out on Ale's GitHub!",
    answered: false,
  },
  {
    question: "How can I get in touch with Alejandro?",
    answer:
      "You can reach out to him on Twitter @_cxalem, or I can schedule a meeting if you want to talk to him!",
    answered: false,
  },
];

export const Chat = () => {
  const [questions, setQuestions] = useState<Question[]>(DEFAULT_QUESTIONS);
  const [answering, setAnswering] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // This function will move the selected question to the end of the array
  const handleArrayElement = (arr: Question[], question: Question) => {
    const fromIndex = arr.indexOf(question);
    const toIndex = arr.length - 1;
    const element = arr.splice(fromIndex, 1)[0];
    arr.splice(toIndex, 0, element);
  };

  const handleQuestionClick = useCallback((selectedQuestion: Question) => {
    setQuestions((prevQuestions) => {
      handleArrayElement(prevQuestions, selectedQuestion);
      return prevQuestions.map((question) => {
        return question.question === selectedQuestion.question
          ? { ...question, answered: true }
          : question;
      });
    });
    setAnswering(true);
    handleTextToSpeech(selectedQuestion.answer);
  }, []);

  const handleTextToSpeech = async (text: string) => {
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
      chatRef.current?.scrollTo({
        top: chatRef.current.scrollHeight,
        behavior: "smooth",
      });
      audio.play();
      audio.onended = () => {
        setAnswering(false);
      };
    } catch (err) {
      console.error("Error getting the audio:", err);
      setAnswering(false);
    }
  };

  const questionButtons = useMemo(() => {
    return questions.map((question) => (
      <button
        onClick={() => handleQuestionClick(question)}
        key={question.question}
        disabled={question.answered || answering}
        className={`border text-start ${
          question.answered || answering
            ? "opacity-50 cursor-not-allowed"
            : "hover:shadow-lg hover:shadow-gray-100 cursor-pointer"
        } duration-150 transition bg-gray-50 px-6 py-4 rounded-md max-w-md`}
      >
        {question.question}
      </button>
    ));
  }, [questions, handleQuestionClick, answering]);

  return (
    <div
      ref={chatRef}
      className="relative bg-orange-50/70 shadow-md flex flex-col gap-4 shadow-gray-100 rounded-xl w-[90vw] overflow-scroll h-[50vh] md:w-[50vw] mx-auto"
    >
      <div className="sticky top-0 z-10 md:px-10 md:py-3 flex gap-4 bg-white shadow-lg shadow-neutral-400/10 items-center">
        <Avatar>
          <AvatarImage
            src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Ff4b39258-8c2f-46b2-bf6e-5ed2bbe98d93%2F902166bb-984f-4be9-925f-0deed31d69c1%2FIcono_Dev.svg?table=block&id=7baf963b-cdab-4cb8-a1d4-f878776a2a66&spaceId=f4b39258-8c2f-46b2-bf6e-5ed2bbe98d93&userId=b5d9e56c-d386-48d8-bfda-deb6eaf84065&cache=v2"
            alt="@_cxalem"
          />
          <AvatarFallback>TR</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-lg font-medium">Travis</span>
          <span className="text-sm opacity-30">Online</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 flex-1 md:px-10 ">
        {questions.map(({ question, answer, answered }) => {
          if (!answered) return null;
          return (
            <div key={question} className="flex flex-col gap-4">
              <Message message={question} type="user" />
              <Message message={answer} type="system" />
            </div>
          );
        })}
      </div>

      <div className="sticky bg-white border-t border-gray-100 md:py-4 md:px-10 rounded-b-xl h-full max-h-[164px] z-10 bottom-0 grid grid-cols-2 w-full gap-4">
        {questionButtons}
      </div>
    </div>
  );
};
