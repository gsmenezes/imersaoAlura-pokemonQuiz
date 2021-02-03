import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Lottie } from "@crello/react-lottie";
import Link from "next/link";

import db from "../../../db.json";
import AlternativesForm from "../../components/Alternatives";
import BackLinkArrow from "../../components/BackLinkArrow";
import Button from "../../components/Button";
import QuizBackground from "../../components/QuizBackground";
import QuizContainer from "../../components/QuizContainer";
import Widget from "../../components/Widget";

import loadingAnimation from "./animations/loading.json";

function ResultWidget({ results, totally }) {
  return (
    <Widget.Result
      as={motion.section}
      transition={{ delay: 0.5, duration: 0.5 }}
      variants={{
        show: { opacity: 0.8 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>Resultado do Quiz:</Widget.Header>
      <Widget.Content>
        <h4>
          Você acertou {(totally = results.filter((x) => x).length)} de 11
          perguntas!
        </h4>
        <h4>
          {totally < 6
            ? "Que pena.. acho que você precisa estudar um pouquinho mais sobre os Vikings!"
            : totally >= 6 && totally <= 10
            ? "Legal!! Você sabe quase tudo sobre os Vikings."
            : totally >= 11
            ? "Uauuuu!! Você sabe tudo sobre os Vikings.. Assiste as séries ou prestou atenção nas aulas de história? ;) Nunca saberemos.. haha Parabéns."
            : "Deu bug aqui =/"}
        </h4>
      </Widget.Content>
      <Widget.Footer>
        <Button>
          <a href="/">Voltar para a Home</a>
        </Button>
      </Widget.Footer>
    </Widget.Result>
  );
}
function LoadingWidget() {
  return (
    <Lottie
      className="lottie-container basic"
      config={{ animationData: loadingAnimation, loop: true, autoplay: true }}
      style={{
        width: "400px",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        margin: "0 -10%",
      }}
    />
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAlternative, setSelectedAlternative] = useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer;
  const hasAlternativeSelected = selectedAlternative !== undefined;

  return (
    <Widget.Quiz
      as={motion.section}
      transition={{ delay: 0.5, duration: 0.5 }}
      variants={{
        show: { opacity: 0.8 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      animate="show"
    >
      <Widget.Header>
        <BackLinkArrow href="/" />
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

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
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const selectedAlternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAlternative === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && selectedAlternativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  id={alternativeId}
                  name={questionId}
                  onChange={() => setSelectedAlternative(alternativeIndex)}
                  type="radio"
                />{" "}
                {alternative}
              </Widget.Topic>
            );
          })}

          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>
          {isQuestionSubmited && isCorrect && (
            <p> Parabéns! Você acertou ;) .. </p>
          )}
          {isQuestionSubmited && !isCorrect && (
            <p> Poxa.. não foi dessa vez =/ </p>
          )}
        </AlternativesForm>
      </Widget.Content>
    </Widget.Quiz>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};

export default function QuizPage() {
  const [screenState, setScreenState] = useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result) {
    setResults([...results, result]);
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
    <QuizBackground backgroundImage={db.bg2}>
      <QuizContainer>
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={results} />
        )}
      </QuizContainer>
    </QuizBackground>
  );
}
