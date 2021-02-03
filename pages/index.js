import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import db from "../db.json";

import Button from "../src/components/Button";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import Input from "../src/components/Input";
import Link from '../src/components/Link';
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/QuizContainer";
import QuizLogo from "../src/components/QuizLogo";
import Widget from "../src/components/Widget";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizLogo />
      <QuizContainer>
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5 }}
          variants={{
            show: { opacity: 0.8},
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>{db.title}</h1>
          </Widget.Header>
          <Widget.Content>
            <form
              onSubmit={function (infoEvent) {
                infoEvent.preventDefault();
                router.push(`/quiz?name=${name}`);
              }}
            >
              <Input
                name="nomeDoUsuario"
                placeholder="Diz aí seu nome ;)"
                value={name}
                onChange={(infoEvent) => setName(infoEvent.target.value)}
              />
              <Button type="submit" disabled={name.length === 0}>
                Vamos jogar!
              </Button>
            </form>
          </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 0.8},
            hidden: { opacity: 0 },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Quizes da Galera</h1>
          </Widget.Header>
          <Widget.Content>
           <ul>
             {db.external.map((externalLink) => {
               const [projectName, githubUser] = externalLink
               .replace(/\//g, '')
               .replace('https:', '')
               .replace('.vercel.app', '')
               .split('.');

               return(
                 <li key={externalLink}>
                   <Widget.Topic
                   as={Link}
                   href={`/quiz/${projectName}___${githubUser}`}>
                      {`${githubUser}/${projectName}`}
                   </Widget.Topic>
                 </li>
               );
             })}
           </ul>
          </Widget.Content>
        </Widget>
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gsmenezes" />
      <Footer as={motion.footer}
        transition={{ delay: 1, duration: 0.5 }}
        variants={{
          show: { opacity: 0.8 },
          hidden: { opacity: 0 },
        }}
        initial="hidden"
        animate="show"

      />
    </QuizBackground>
  );
}
