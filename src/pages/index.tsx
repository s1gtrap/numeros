import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import { ToWords } from "to-words";

const inter = Inter({ subsets: ["latin"] });

function random(min: number, max: number): number {
  return Math.floor(Math.random() * max + min);
}

type Animation =
  | {
      kind: "flashClass";
      className: string;
    }
  | {
      kind: "flashFadeOut";
    };

function classNameOfAnimation(a: Animation | null): string {
  if (a?.kind === "flashClass") {
    return a.className;
  } else if (a?.kind == "flashFadeOut") {
    return "duration-700 transition-colors";
  } else {
    return "";
  }
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
        setGuess(`${guess}${e.key}`);
      } else if (e.keyCode === 8) {
        setGuess(guess.slice(0, guess.length - 1));
      } else if (e.keyCode === 13) {
        if (guess === answer.toString()) {
          setAnswer(random(min, max));
          setAnimation({
            kind: "flashClass",
            className: "bg-green",
          });
        } else {
          setAnimation({
            kind: "flashClass",
            className: "bg-red",
          });
        }

        setGuess("");
      }
    }

    document.body.addEventListener("keyup", handleKeyUp);

    return () => {
      document.body.removeEventListener("keyup", handleKeyUp);
    };
  }, [guess]);

  const [animation, setAnimation] = useState<Animation | null>(null);

  useEffect(() => {
    if (animation?.kind === "flashClass") {
      setAnimation({
        kind: "flashFadeOut",
      });
    } else if (animation?.kind === "flashFadeOut") {
      const timer = setTimeout(() => {
        setAnimation(null);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [animation]);

  return (
    <main
      className={`flex flex-col h-screen items-center justify-between ${inter.className} ${classNameOfAnimation(animation)}`}
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
