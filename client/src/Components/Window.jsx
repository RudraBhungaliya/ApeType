import React, { useState, useEffect, useRef } from "react";

const furbish = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const formatAllLines = (cleanWords) => {
  const lines = [];
  for (let i = 0; i < cleanWords.length; i += 6) {
    lines.push(cleanWords.slice(i, i + 6));
  }
  return lines;
};

export default function Window({ selectedTime, onTypingStart, onFinish, onTimeUpdate }) {
  const [allLines, setAllLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [correctChars, setCorrectChars] = useState(0);
  const [baseCorrect, setBaseCorrect] = useState(0);
  const [baseTyped, setBaseTyped] = useState(0);
  const [currentTyped, setCurrentTyped] = useState(0);

  const [timerStart, setTimerStart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(selectedTime);

  const inputRef = useRef(null);

  const activeLine = lineIndex === 0 ? 0 : 1;

  const fetchData = async () => {
    try {
      const API = await fetch(
        "https://baconipsum.com/api/?type=all-meat&paras=50"
      );
      const data = await API.json();
      const cleanWords = furbish(data.join(" ")).split(" ");
      const formatted = formatAllLines(cleanWords);

      setAllLines(formatted);
      setText([formatted[0], formatted[1], formatted[2]]);
      setLineIndex(0);
    } catch (e) {
      const errorLine = ["could", "not", "fetch", "data", "error"];
      setAllLines([errorLine]);
      setText([errorLine, errorLine, errorLine]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!timerStart || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStart, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && timerStart) {
      setTimerStart(false);
      console.log("Time Up!\n");

      const totalCorrect = baseCorrect + correctChars;
      const totalTyped = baseTyped + currentTyped;

      const wpm =
        totalTyped === 0
          ? 0
          : Math.round(totalCorrect / 5 / (selectedTime / 60));

      const accuracy =
        totalTyped === 0 ? 0 : Math.round((totalCorrect / totalTyped) * 100);

      onFinish({
        wpm,
        accuracy,
        correctChars: totalCorrect,
        time: selectedTime,
      });
    }
  }, [
    timeLeft,
    timerStart,
    baseCorrect,
    baseTyped,
    correctChars,
    currentTyped,
    selectedTime,
    onFinish,
  ]);

  useEffect(() => {
    if (allLines.length === 0) return;

    console.log("Resetting for time:", selectedTime);

    setTimeLeft(selectedTime);
    setUserInput("");
    setCorrectChars(0);
    setBaseCorrect(0);
    setBaseTyped(0);
    setCurrentTyped(0);
    setLineIndex(0);
    setTimerStart(false);
    setText([allLines[0], allLines[1], allLines[2]]);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  }, [selectedTime, allLines]);

  const handleTyping = (e) => {
    const val = e.target.value;
    setUserInput(val);

    if (!text[activeLine] || text[activeLine].length === 0) {
      console.log("No active line available");
      return;
    }

    if (!timerStart && val.length > 0) {
      setTimerStart(true);
      onTypingStart();
    }

    const target = text[activeLine].join(" ");
    const targetLength = target.length;

    let correct = 0;
    const limit = Math.min(val.length, targetLength);

    for (let i = 0; i < limit; ++i) {
      if (val[i] === target[i]) ++correct;
    }

    setCorrectChars(correct);
    setCurrentTyped(limit);

    if (val.length > targetLength) {
      setUserInput(val.slice(0, targetLength));
    }

    if (limit === targetLength && val.length >= targetLength) {
      const nextLineIndex = lineIndex + 1;
      const newLine = allLines[nextLineIndex + 2];
      if (!newLine) return;

      setBaseCorrect((prev) => prev + correct);
      setBaseTyped((prev) => prev + targetLength);
      setCurrentTyped(0);
      setCorrectChars(0);

      setLineIndex(nextLineIndex);

      if (lineIndex === 0) {
        setText([text[0], text[1], text[2]]);
      } else {
        setText([text[1], text[2], newLine]);
      }

      setUserInput("");
      return;
    }
  };

  const boundaries = [];
  let cursor = 0;

  if (text[activeLine]) {
    text[activeLine].forEach((w) => {
      boundaries.push({
        start: cursor,
        end: cursor + w.length,
      });
      cursor += w.length + 1;
    });
  }

  useEffect(() => {
    if (timerStart) {
      onTimeUpdate(timeLeft);
    }
  }, [timeLeft, timerStart, onTimeUpdate]);


  const colorWord = (word, wIndex, isLastWord, boundaries, typed) => {
    const out = [];

    if (!boundaries[wIndex]) return out;

    const { start, end } = boundaries[wIndex];

    for (let i = 0; i < word.length; i++) {
      const absoluteIndex = start + i;

      if (absoluteIndex === typed.length) out.push({ caret: true });

      if (absoluteIndex < typed.length) {
        out.push({
          letter: word[i],
          color: typed[absoluteIndex] === word[i] ? "white" : "red",
        });
      } else {
        out.push({ letter: word[i], color: "#A7A7A7" });
      }
    }

    if (!isLastWord) {
      const spaceIndex = end;

      if (spaceIndex === typed.length) out.push({ caret: true });

      out.push({
        letter: "\u00A0",
        color:
          spaceIndex < typed.length
            ? typed[spaceIndex] === " "
              ? "white"
              : "red"
            : "#A7A7A7",
      });
    }

    return out;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        padding: "2rem 1rem",
        fontSize: "clamp(20px, 4vw, 36px)",
        fontFamily: "monospace",
        backgroundColor: "#2c2f33",
        boxSizing: "border-box",
        overflowX: "hidden",
        textAlign: "center",
      }}
    >
      <style>
        {`
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

          .caret {
              display: inline-block;
              width: 2px;
              height: 1.1em;
              background-color: #ffb86c;
              animation: blink 1s step-end infinite;
              margin-right: 1px;
              position: relative;
              top: 5px;
          }

          .word {
            display: inline-block;
            margin-right: 1rem;
          }

          body {
            margin: 0;
            padding: 5px;
            background: #1e1e1e;
          }
        `}
      </style>

      <input
        ref={inputRef}
        value={userInput}
        onChange={handleTyping}
        autoFocus
        style={{
          position: "fixed",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
        }}
      />

      {text.map((line, i) => (
        <div
          key={`line-${i}`}
          style={{
            display: "block",
            marginBottom: "25px",
            opacity: i === activeLine ? 1 : 0.35,
            whiteSpace: "normal",
            textAlign: "center",
          }}
        >
          {line &&
            line.map((word, j) => {
              const isLast = j === line.length - 1;
              const chars =
                i === activeLine
                  ? colorWord(word, j, isLast, boundaries, userInput)
                  : word
                      .split("")
                      .map((c) => ({ letter: c, color: "#A7A7A7" }));

              return (
                <span key={`word-${i}-${j}`} className="word">
                  {chars.map((obj, k) =>
                    obj.caret ? (
                      <span
                        key={`caret-${i}-${j}-${k}`}
                        className="caret"
                      ></span>
                    ) : (
                      <span
                        key={`char-${i}-${j}-${k}`}
                        style={{ color: obj.color }}
                      >
                        {obj.letter}
                      </span>
                    )
                  )}
                </span>
              );
            })}
        </div>
      ))}
    </div>
  );
}
