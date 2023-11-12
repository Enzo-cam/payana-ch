'use client'
import { useState } from 'react';
import {preguntas} from '../data.json'

interface Question {
  id:    number;
  texto: string;
}

interface Answer extends Question{
  valoracion: 1 | 2 | 3 | 4 | 5
}


const questions: Question[] = preguntas;

export default function Home() {
  
  const [answers, setAnswers] = useState<Answer[]>([])

  return (
    <main >
      <h1>{questions[0].texto}</h1>
    </main>
  )
}
