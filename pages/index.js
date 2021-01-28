import React, { useState } from 'react';
import styled from "styled-components";
import { useRouter } from 'next/router';
import db from "../db.json";

import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizBackground from '../src/components/QuizBackground';
import QuizLogo from '../src/components/QuizLogo';
import Widget from "../src/components/Widget";


const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');

  return (
    <QuizBackground backgroundImage={db.img}>
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
              <input placeholder="Diz aí seu nome ;)" onChange={function (infoEvent){
                console.log(infoEvent.target.value);
                setName(infoEvent.target.value);
              }}/>
              <button type="submit" disabled={name.length === 0}>Vamos jogar!</button>
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
