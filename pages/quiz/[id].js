import React from "react";
import { ThemeProvider } from "styled-components";
import QuizScreen from "../../src/Screens/Quiz";

export default function QuizDaGaleraPage({ dbExterno }) {
  return (
    <ThemeProvider theme={dbExterno.theme}>
      <QuizScreen
        externalQuestion={dbExterno.questions}
        externalBg={dbExterno.bg}
      />
    </ThemeProvider>
  );
}

export async function getServerSideProps(context) {
  const [projectName, githubUser] = context.query.id.split("___");

  try {
    const dbExterno = await fetch(
      `https://${projectName}.${githubUser}.vercel.app/api/db`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Falha em pegar os dados!");
      })
      .then((convertResponseObj) => convertResponseObj);

    return {
      props: {
        dbExterno,
      },
    };
  } catch (err) {
    throw new Error(err);
  }
}
