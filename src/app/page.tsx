'use client'
import { ChangeEvent, useState } from 'react';
import data from '../data.json'

interface Question {
  id:    number;
  texto: string;
}

interface Answer extends Question{
  valoracion: 1 | 2 | 3 | 4 | 5
}


const questions: Question[] =  data.preguntas;

export default function Home() {
  
  const [answers, setAnswers] = useState<Answer[]>([])
  const currentQuestion = questions[answers.length];

  function handleRate(event: ChangeEvent<HTMLSelectElement>){
    setAnswers(answers => answers.concat({
      ...currentQuestion,
      valoracion: Number(event.target.value) as Answer['valoracion']
    }))
  } 

  return (
    <main >
      <h1>{currentQuestion.texto}</h1>
      <select onChange={handleRate}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </main>
  )
}
