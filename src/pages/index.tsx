import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { ToWords } from "to-words";

const inter = Inter({ subsets: ["latin"] });

function random(min: number, max: number): number {
  return Math.floor(Math.random() * max + min);
}

export default function Home() {
  const min = 0;
  const max = 100;

  const toWords = new ToWords({
    localeCode: "en-US",
  });

  const [answer, setAnswer] = useState(random(min, max));
  const [guess, setGuess] = useState("");

  useEffect(() => {
    function handleKeyUp(e: KeyboardEvent) {
      if (48 <= e.keyCode && e.keyCode <= 57) {
        setAnim(1);
        setGuess(`${guess}${e.key}`);
      } else if (e.keyCode === 8) {
        setGuess(guess.slice(0, guess.length - 1));
      } else if (e.keyCode === 13) {
        if (guess === answer.toString()) {
          setAnswer(random(min, max));
        }

        setGuess("");
      }
    }

    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [guess]);

  const [anim, setAnim] = useState(0);

  useEffect(() => {
    if (anim === 1) {
      setAnim(2);
    } else if (anim === 2) {
      const timer = setTimeout(() => {
        setAnim(0);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [anim]);

  return (
    <main
      className={`flex flex-col h-screen items-center justify-between ${inter.className} ${anim === 0 ? "" : anim === 1 ? "bg-green" : "duration-1000 transition-colors"}`}
    >
      <div className="flex grow items-center">
        <p className="drop-shadow-md hyphens-auto text-4xl text-center text-rose-red">
          {toWords.convert(answer)}
        </p>
      </div>
      <div className="flex grow items-center">
        <p
          className={`drop-shadow-md text-4xl text-cerulean ${guess ? "" : "font-thin opacity-50"}`}
        >
          {guess || "Type the digits here!"}
        </p>
      </div>
    </main>
  );
}
