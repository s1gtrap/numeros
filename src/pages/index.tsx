import { Inter } from "next/font/google";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
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

  const onGuessChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setGuess(e.target.value),
    [],
  );

  const onGuessKeyUp = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        if (guess === answer.toString()) {
          setAnswer(random(min, max));
          setAnimation({
            kind: "flashClass",
            className: "bg-green/50",
          });
        } else {
          setAnimation({
            kind: "flashClass",
            className: "bg-red/50",
          });
        }

        setGuess("");
      }
    },
    [guess],
  );

  return (
    <main
      className={`flex flex-col h-dvh items-center justify-between ${inter.className} ${classNameOfAnimation(animation)}`}
    >
      <div className="flex grow items-center">
        <p className="drop-shadow-md hyphens-auto text-4xl text-center text-rose-red">
          {toWords.convert(answer)}
        </p>
      </div>
      <div className="flex grow w-full">
        <input
          className={`ppearance-none bg-striped focus:outline-none h-full placeholder-cerulean placeholder:font-thin placeholder:opacity-50 text-4xl text-center text-rose-red w-full`}
          onChange={onGuessChange}
          onKeyUp={onGuessKeyUp}
          placeholder="Type the digits here!"
          tabIndex={0}
          type="number"
          value={guess}
          required={false}
        />
      </div>
    </main>
  );
}
