import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import Head from "next/head";
import { Inter } from "next/font/google";
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { LOCALES, ToWords } from "to-words";

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

  const [localeCode, setLocaleCode] = useState("en-US");
  const [toWords, setToWords] = useState(new ToWords({ localeCode }));

  useEffect(() => {
    setToWords(new ToWords({ localeCode }));
  }, [localeCode]);

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
    [answer, guess],
  );

  const [settingsOpen, setSettingsOpen] = useState(false);
  const toggleSettings = useCallback(() => {
    setSettingsOpen(!settingsOpen);
  }, [settingsOpen]);

  return (
    <main
      className={`flex flex-col h-screen items-center justify-between ${inter.className} ${classNameOfAnimation(animation)} ${settingsOpen ? "bg-cerulean p-16" : ""}`}
    >
      <Head>
        <title>Numeros · Practice Your Numbers!</title>
      </Head>
      <button
        onClick={toggleSettings}
        className="absolute top-0 right-0 m-4 sm:m-12"
      >
        <Cog8ToothIcon
          className={`size-12 ${settingsOpen ? "text-non-photo-blue hover:text-celeste" : "text-cerulean hover:text-indigo-dye"}`}
        />
      </button>

      {settingsOpen ? (
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-non-photo-blue px-3 py-2 text-sm text-indigo-dye shadow-sm ring-1 ring-inset ring-cerulean hover:bg-celeste">
              Language ({localeCode})
              <ChevronDownIcon
                aria-hidden="true"
                className="-mr-1 h-5 w-5 text-gray-400"
              />
            </MenuButton>
          </div>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-non-photo-blue shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              {Object.keys(LOCALES).map((localeCode, i) => {
                return (
                  <MenuItem key={i}>
                    <a
                      href="#"
                      onClick={() => setLocaleCode(localeCode)}
                      className="block px-4 py-1 text-sm text-indigo-dye hover:bg-celeste"
                    >
                      {localeCode}
                    </a>
                  </MenuItem>
                );
              })}
            </div>
          </MenuItems>
        </Menu>
      ) : (
        <>
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
        </>
      )}
    </main>
  );
}
