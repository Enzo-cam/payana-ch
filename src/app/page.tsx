"use client";
import { ChangeEvent, useState } from "react";
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
function Rating({value, onChange} : {value: Answer["valoracion"]; onChange:(value: number) => void}, ) {
  
  function handleRate(event: ChangeEvent<HTMLSelectElement>) {
    onChange(Number(event.target.value) as Answer["valoracion"])
  }

  return (
    <select value={value} onChange={handleRate}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
  );
}

export default function Home() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const currentQuestion = questions[answers.length];

  function handleRate(rating: number){
    setAnswers(answers => answers.concat({
      ...currentQuestion,
      valoracion: rating as Answer['valoracion']
    }))
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
      <Rating 
        value={1}
        onChange={handleRate}
      />
    </main>
  );
}
