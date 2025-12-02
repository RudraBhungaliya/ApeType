import React, { useState, useEffect } from "react";

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

export default function Window() {
  const [allLines, setAllLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState([]);
  const [userInput, setUserInput] = useState("");

  const activeLine = 0;

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
    } catch (e) {
      setText([["could", "not", "fetch", "data", "error"]]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTyping = (e) => {
    const val = e.target.value;
    setUserInput(val);
    if (!text.length) return;

    const target = text[0].join(" ");
    const targetLength = target.length;

    if (val.length === targetLength) {
      const nextLineIndex = lineIndex + 1;
      const newLine = allLines[nextLineIndex + 2];
      if (!newLine) return;

      setLineIndex(nextLineIndex);
      setText([text[1], text[2], newLine]);
      setUserInput("");
      return;
    }

    if (val.length > targetLength) {
      setUserInput(val.slice(0, targetLength));
    }
  };

  const colorWord = (word, wIndex, isLastWord) => {
    const typed = userInput;
    const out = [];

    let charIndex = 0;
    for (let i = 0; i < wIndex; i++) {
      charIndex += text[0][i].length + 1;
    }

    const letters = word.split("");

    for (let i = 0; i < letters.length; i++) {
      const absoluteIndex = charIndex + i;

      if (absoluteIndex === typed.length) out.push({ caret: true });

      if (absoluteIndex < typed.length) {
        out.push({
          letter: letters[i],
          color: typed[absoluteIndex] === letters[i] ? "white" : "red",
        });
      } else {
        out.push({ letter: letters[i], color: "#A7A7A7" });
      }
    }

    const endIndex = charIndex + word.length;
    if (isLastWord && endIndex === typed.length) out.push({ caret: true });

    if (!isLastWord) {
      const spaceIndex = endIndex;
      if (spaceIndex === typed.length) out.push({ caret: true });

      const typedSpace = spaceIndex < typed.length;
      const correctSpace = typed[spaceIndex] === " ";

      out.push({
        letter: "\u00A0",
        color: typedSpace ? (correctSpace ? "white" : "red") : "#A7A7A7",
      });
    }

    return out;
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "2rem",
        paddingBottom: "1rem",
        fontSize: "36px",
        fontFamily: "monospace",
        backgroundColor: "#2c2f33",
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
          key={lineIndex + "-" + i}
          style={{
            display: "block",
            marginBottom: "25px",
            opacity: i === 0 ? 1 : 0.35,
            whiteSpace: "normal",

            textAlign: "center",
          }}
        >
          {line.map((word, j) => {
            const isLast = j === line.length - 1;
            const chars =
              i === activeLine
                ? colorWord(word, j, isLast)
                : word.split("").map((c) => ({ letter: c, color: "#A7A7A7" }));

            return (
              <span key={`word-${i}-${j}`} className="word">
                {chars.map((obj, k) =>
                  obj.caret ? (
                    <span key={`caret-${i}-${j}-${k}`} className="caret"></span>
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
