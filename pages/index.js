import React, { useState } from 'react';
import { useRouter } from 'next/router';
import db from "../db.json";

import Button from '../src/components/Button';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import Input from '../src/components/Input';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuizLogo from '../src/components/QuizLogo';
import Widget from "../src/components/Widget";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget>
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={ function (infoEvent) {
              infoEvent.preventDefault();
              router.push(`/quiz?name=${name}`);
            }}>
              <Input
              name="nomeDoUsuario"
              placeholder="Diz aí seu nome ;)"
              value={name}
              onChange={(infoEvent) => setName(infoEvent.target.value)}/>
              <Button type="submit" disabled={name.length === 0}>Vamos jogar!</Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget>
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
            <a href="https://naruto-quiz.llofyy.vercel.app/" target="_blank" rel="noreferrer"> <p>Naruto Quiz</p> </a>
            <a href="https://historyquiz.vercel.app/" target="_blank" rel="noreferrer"><p>History Quiz</p></a>
            <a href="https://hogwarts-quiz.juliocarvalhos.vercel.app/" target="_blank" rel="noreferrer"><p>Hogwarts Quiz</p></a>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gsmenezes"/>
    </QuizBackground>
  );
}
