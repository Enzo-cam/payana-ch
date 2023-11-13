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
  isReadOnly,
}:
  | {
      value: Answer["valoracion"];
      onChange: (value: number) => void;
      isReadOnly?: never;
    }
  | {
      value: Answer["valoracion"];
      onChange?: never;
      isReadOnly: boolean;
    }) {

  const [hoverValue, setHoverValue] = useState<Answer["valoracion"]>(value); // Inicializado con el valor actual

  return (
    <div className="text-2xl text-yellow-500" onMouseLeave={() => setHoverValue(value)}> {/* Actualizado para resetear a value */}
      {"★"
        .repeat(hoverValue || value)
        .padEnd(5, "☆")
        .split("")
        .map((elem, index) => (
          <span
            className={!isReadOnly ? 'cursor-pointer' : ''}
            onClick={() => !isReadOnly && onChange?.((index + 1) as Answer["valoracion"])}
            onMouseOver={() =>
              !isReadOnly && setHoverValue((index + 1) as Answer["valoracion"])
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
      <ul className="border rounded-md">
        {answers.map((answer) => (
          <li className="flex items-center justify-between p-6 gap-1" key={answer.texto}>
            {answer.texto} <Rating isReadOnly value={answer.valoracion}/>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="text-center">
      <h1 className="text-xl">{currentQuestion.texto}</h1>
      <Rating value={1} onChange={handleRate} />
    </div>
  );
}
