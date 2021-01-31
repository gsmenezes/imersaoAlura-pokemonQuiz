import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import db from '../db.json';
import AlternativesForm from '../src/components/Alternatives';
import Button from '../src/components/Button';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';

function ResultWidget({ results }) {
  return (
    <Widget as={motion.section}
    transition={{ delay: 0.5, duration: 0.5}}
    variants={{
      show: {opacity: 0.8},
      hidden: {opacity: 0},
    }}
    initial="hidden"
    animate="show">
      <Widget.Header>
        Tela de Resultado:
      </Widget.Header>
      <Widget.Content>
        <p>
          Você acertou{" "}
          {results.filter((x) => x).length}{" "} de 10 perguntas!
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              •{" "}
              {index + 1}
              {" "}Resultado:
              {result === true ? ' Acertou' : ' Errou'}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}

function LoadingWidget() {
  return (
    <Widget as={motion.section}
    transition={{ delay: 0.5, duration: 0.5}}
    variants={{
      show: {opacity: 0.8},
      hidden: {opacity: 0},
    }}
    initial="hidden"
    animate="show">
      <Widget.Header>
        Desafio....
      </Widget.Header>
    </Widget>
  );
}


function QuestionWidget({question, questionIndex, totalQuestions, onSubmit, addResult}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget as={motion.section}
    transition={{ delay: 0.5, duration: 0.5}}
    variants={{
      show: {opacity: 0.8},
      hidden: {opacity: 0},
    }}
    initial="hidden"
    animate="show">
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img alt="Descrição" style={{ width: '100%', height: '150px', objectFit: 'cover',}} src={question.image} />

<Widget.Content>
  <h2>{question.title}</h2>
  <p>{question.description}</p>

<AlternativesForm
onSubmit={(infoEvent) => {
  infoEvent.preventDefault();
  setIsQuestionSubmited(true);
  setTimeout(() => {
    addResult(isCorrect);
    onSubmit();
    setIsQuestionSubmited(false);
    setSelectedAlternative(undefined);
  }, 1 * 1500);
}} >
  {question.alternatives.map((alternative, alternativeIndex) => {
    const alternativeId = `alternative__${alternativeIndex}`;
    const selectedAlternativeStatus = isCorrect ? 'SUCCESS': 'ERROR';
    const isSelected = selectedAlternative === alternativeIndex;
    return (
      <Widget.Topic
      as="label"
      key={alternativeId}
      htmlFor={alternativeId}
      data-selected={isSelected}
      data-status={isQuestionSubmited && selectedAlternativeStatus} >
        <input style={{ display: 'none'}} id={alternativeId} name={questionId} onChange={() => setSelectedAlternative(alternativeIndex)} type="radio" /> {alternative}
      </Widget.Topic>
    );
  })}

  <Button type="submit" disabled={!hasAlternativeSelected}>Confirmar</Button>
  {isQuestionSubmited && isCorrect && <p> Parabéns! Você acertou ;) .. </p>}
  {isQuestionSubmited && !isCorrect && <p> Poxa.. não foi dessa vez =/ </p>}
</AlternativesForm>
</Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT'
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([
      ...results,
      result,
    ]);
  }

  useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1500);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
          question={question}
          questionIndex={questionIndex}
          totalQuestions={totalQuestions}
          onSubmit={handleSubmitQuiz}
          addResult={addResult} />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
      </QuizContainer>
    </QuizBackground>
  );
}
