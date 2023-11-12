"use client";
import { MouseEvent, useState } from "react";
import data from "../data.json";

interface Question {
  id: number;
  texto: string;
}
interface Answer extends Question {
  valoracion: 1 | 2 | 3 | 4 | 5;
}

const questions: Question[] = data.preguntas;

// Los componentes de tipo INPUT suelen recibir siempre un onChange y un value
function Rating({
  value,
  onChange,
}: {
  value: Answer["valoracion"];
  onChange: (value: number) => void;
}) {
  const [hoverValue, setHoverValue] = useState<Answer["valoracion"]>(1);

  return (
    <div className="text-2xl" onMouseLeave={() => setHoverValue(1)}>
      {"★"
        .repeat(hoverValue || value)
        .padEnd(5, "☆")
        .split("")
        .map((elem, index) => (
          <span
            className="cursor-pointer"
            onClick={() => onChange((index + 1) as Answer["valoracion"])}
            onMouseOver={() =>
              setHoverValue((index + 1) as Answer["valoracion"])
            }
            key={index}
          >
            {elem}
          </span>
        ))}
    </div>
  );
}

export default function Home() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentQuestion = questions[answers.length];

  function handleRate(rating: number) {
    setAnswers((answers) =>
      answers.concat({
        ...currentQuestion,
        valoracion: rating as Answer["valoracion"],
      })
    );
  }

  // Mostrar las preguntas y sus valoraciones en caso de haber terminado
  if (!currentQuestion) {
    return (
      <ul>
        {answers.map((answer) => (
          <li key={answer.texto}>
            {answer.texto} - {answer.valoracion}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <main>
      <h1>{currentQuestion.texto}</h1>
      <Rating value={1} onChange={handleRate} />
    </main>
  );
}
